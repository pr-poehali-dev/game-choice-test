import { useState, useEffect, useRef } from "react";
import MainCard from "@/components/MainCard";
import VsplashModals from "@/components/VsplashModals";
import NulsBrawlModals from "@/components/NulsBrawlModals";
import RygModals from "@/components/RygModals";

export type ModalStep =
  | "none"
  | "game_choice"
  | "download_first"
  | "test_confirm"
  | "nuls_confirm"
  | "real_no"
  | "vsplash_question"
  | "closing";

export type NulsStage =
  | "cucumber_test"
  | "cucumber_closing"
  | "no_nuls"
  | "choose_task"
  | "math"
  | "math_wrong_closing"
  | "math_success"
  | "russian"
  | "russian_wrong_closing"
  | "russian_success"
  | "final_unlocked";

export type RygStage =
  | "ryg_question"
  | "ryg_ok"
  | "ryg_loves_nuls"
  | "boost_reveal"
  | "boost_active";

export default function Index() {
  const [step, setStep] = useState<ModalStep>("none");
  const [countdown, setCountdown] = useState(10);

  const [nulsBrawlUnlocked] = useState(() => localStorage.getItem("nuls_brawl_unlocked") === "true");
  const [cucumberDone] = useState(() => localStorage.getItem("cucumber_done") === "true");
  const [nulsFinalUnlocked] = useState(() => localStorage.getItem("nuls_final") === "true");

  // Тест на рыга появляется после двух заданий (math_success или russian_success → nuls_final)
  const [rygTestUnlocked] = useState(() => localStorage.getItem("nuls_final") === "true");
  const [rygDone] = useState(() => localStorage.getItem("ryg_done") === "true");

  // Кнопка ??? появляется после того как ответили ДА на "любите нулс бравл"
  const [secretBtnUnlocked] = useState(() => localStorage.getItem("ryg_done") === "true");

  const [nulsStage, setNulsStage] = useState<NulsStage | null>(null);
  const [cucumberCountdown, setCucumberCountdown] = useState(5);
  const [wrongCountdown, setWrongCountdown] = useState(3);

  const [rygStage, setRygStage] = useState<RygStage | null>(null);
  const [boostSecondsLeft, setBoostSecondsLeft] = useState(0);

  const cucumberTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wrongTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const boostTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Таймер Вспыша — closing
  useEffect(() => {
    if (step === "closing") {
      localStorage.setItem("nuls_brawl_unlocked", "true");
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) { clearInterval(interval); window.close(); return 0; }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step]);

  // Таймер огурчика
  useEffect(() => {
    if (nulsStage === "cucumber_closing") {
      setCucumberCountdown(5);
      cucumberTimerRef.current = setInterval(() => {
        setCucumberCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(cucumberTimerRef.current!);
            localStorage.setItem("cucumber_done", "true");
            window.close();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => { if (cucumberTimerRef.current) clearInterval(cucumberTimerRef.current); };
    }
  }, [nulsStage]);

  // Таймер неправильного ответа
  useEffect(() => {
    if (nulsStage === "math_wrong_closing" || nulsStage === "russian_wrong_closing") {
      setWrongCountdown(3);
      wrongTimerRef.current = setInterval(() => {
        setWrongCountdown((prev) => {
          if (prev <= 1) { clearInterval(wrongTimerRef.current!); window.close(); return 0; }
          return prev - 1;
        });
      }, 1000);
      return () => { if (wrongTimerRef.current) clearInterval(wrongTimerRef.current); };
    }
  }, [nulsStage]);

  // Таймер буста (обратный отсчёт 3 дней)
  useEffect(() => {
    const boostUntil = Number(localStorage.getItem("boost_until") || 0);
    if (boostUntil > Date.now()) {
      const tick = () => {
        const left = Math.max(0, Math.floor((boostUntil - Date.now()) / 1000));
        setBoostSecondsLeft(left);
        if (left <= 0 && boostTimerRef.current) clearInterval(boostTimerRef.current);
      };
      tick();
      boostTimerRef.current = setInterval(tick, 1000);
      return () => { if (boostTimerRef.current) clearInterval(boostTimerRef.current); };
    }
  }, []);

  function openNulsBrawl() {
    if (nulsFinalUnlocked) {
      setNulsStage("final_unlocked");
    } else if (cucumberDone) {
      setNulsStage("no_nuls");
    } else {
      setNulsStage("cucumber_test");
    }
  }

  function openSecretBtn() {
    const boostUntil = Number(localStorage.getItem("boost_until") || 0);
    if (boostUntil > Date.now()) {
      setRygStage("boost_active");
    } else {
      setRygStage("boost_reveal");
    }
  }

  return (
    <>
      <MainCard
        nulsBrawlUnlocked={nulsBrawlUnlocked}
        rygTestUnlocked={rygTestUnlocked}
        secretBtnUnlocked={secretBtnUnlocked}
        onGameClick={setStep}
        onNulsBrawl={openNulsBrawl}
        onRygTest={() => setRygStage("ryg_question")}
        onSecretBtn={openSecretBtn}
      />
      <VsplashModals step={step} setStep={setStep} countdown={countdown} />
      <NulsBrawlModals
        nulsStage={nulsStage}
        setNulsStage={setNulsStage}
        cucumberCountdown={cucumberCountdown}
        wrongCountdown={wrongCountdown}
      />
      <RygModals
        rygStage={rygStage}
        setRygStage={setRygStage}
        boostSecondsLeft={boostSecondsLeft}
      />
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-8px) rotate(-1deg); }
          30% { transform: translateX(8px) rotate(1deg); }
          45% { transform: translateX(-6px); }
          60% { transform: translateX(6px); }
          75% { transform: translateX(-4px); }
          90% { transform: translateX(4px); }
        }
      `}</style>
    </>
  );
}
