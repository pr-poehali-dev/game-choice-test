import { useState, useEffect, useRef } from "react";

type ModalStep =
  | "none"
  | "game_choice"
  | "download_first"
  | "test_confirm"
  | "nuls_confirm"
  | "real_no"
  | "vsplash_question"
  | "closing";

type NulsStage =
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

export default function Index() {
  const [step, setStep] = useState<ModalStep>("none");
  const [countdown, setCountdown] = useState(10);
  const [nulsClicked, setNulsClicked] = useState(false);

  const [nulsBrawlUnlocked] = useState(() => localStorage.getItem("nuls_brawl_unlocked") === "true");
  const [cucumberDone] = useState(() => localStorage.getItem("cucumber_done") === "true");
  const [nulsFinalUnlocked] = useState(() => localStorage.getItem("nuls_final") === "true");

  const [nulsStage, setNulsStage] = useState<NulsStage | null>(null);
  const [cucumberCountdown, setCucumberCountdown] = useState(5);
  const [wrongCountdown, setWrongCountdown] = useState(3);
  const [mathAnswer, setMathAnswer] = useState("");

  const [russianAnswers, setRussianAnswers] = useState<{[k: string]: string}>({});
  const [russianChecked, setRussianChecked] = useState(false);

  const cucumberTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wrongTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (step === "closing") {
      localStorage.setItem("nuls_brawl_unlocked", "true");
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            window.close();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step]);

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

  useEffect(() => {
    if (nulsStage === "math_wrong_closing" || nulsStage === "russian_wrong_closing") {
      setWrongCountdown(3);
      wrongTimerRef.current = setInterval(() => {
        setWrongCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(wrongTimerRef.current!);
            window.close();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => { if (wrongTimerRef.current) clearInterval(wrongTimerRef.current); };
    }
  }, [nulsStage]);

  function openNulsBrawl() {
    if (nulsFinalUnlocked) {
      setNulsStage("final_unlocked");
    } else if (cucumberDone) {
      setNulsStage("no_nuls");
    } else {
      setNulsStage("cucumber_test");
    }
  }

  function checkMath() {
    if (mathAnswer.trim() === "2056") {
      setNulsStage("math_success");
    } else {
      setNulsStage("math_wrong_closing");
    }
  }

  function checkRussian() {
    const correct: {[k: string]: string} = {
      "Сиять": "1",
      "Помыть": "1",
      "Смотреть": "2",
    };
    const allCorrect = Object.entries(correct).every(([verb, sp]) => russianAnswers[verb] === sp);
    setRussianChecked(true);
    if (allCorrect) {
      setNulsStage("russian_success");
    } else {
      setNulsStage("russian_wrong_closing");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      {/* Header */}
      <div className="text-center mb-12 fade-in-pixel">
        <h1 className="font-pixel text-[var(--pixel-green)] glow-green text-sm md:text-xl leading-loose glitch">
          ВЫБОР ГОДА
        </h1>
        <div className="font-pixel text-[var(--pixel-cyan)] text-[8px] mt-3 glow-cyan">
          === ДОБРО ПОЖАЛОВАТЬ ===
        </div>
      </div>

      {/* Main card */}
      <div className="scanline-box pixel-border p-8 max-w-lg w-full text-center slide-up">
        <p className="font-pixel text-[var(--pixel-green)] text-[10px] leading-loose mb-8">
          ВО ЧТО МЫ БУДЕМ ИГРАТЬ?
        </p>

        <div className="flex flex-col gap-4">
          <button
            className="pixel-btn w-full text-[9px]"
            onClick={() => setStep("download_first")}
          >
            🔷 ГЕОМЕТРИ ДЕШ
          </button>
          <button
            className="pixel-btn w-full text-[9px]"
            onClick={() => setStep("download_first")}
            style={{ background: "var(--pixel-purple)", color: "white" }}
          >
            ❤ АНДЕРТЕЙЛ
          </button>
          <button
            className="pixel-btn-outline w-full text-[9px] mt-2"
            onClick={() => setStep("test_confirm")}
          >
            📝 ПРОЙТИ ТЕСТ НА ВСПЫША
          </button>
          {nulsBrawlUnlocked && (
            <button
              className="pixel-btn w-full text-[9px] mt-2"
              onClick={openNulsBrawl}
              style={{ background: "var(--pixel-cyan)", color: "black" }}
            >
              ⭐ НУЛС БРАВЛ
            </button>
          )}
        </div>

        <div className="mt-6 font-pixel text-[var(--pixel-dim)] text-[7px]">
          ВЫБЕРИ ВАРИАНТ ВЫШЕ ▲
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 font-pixel text-[6px] text-[var(--pixel-dim)] flicker">
        © 2026 ВЫБОР ГОДА
      </div>

      {/* ======= MODALS ======= */}

      {step === "download_first" && (
        <Modal onClose={() => setStep("none")}>
          <p className="font-pixel text-[var(--pixel-amber)] glow-amber text-[10px] leading-loose mb-6">
            Сначала скачай,<br />потом будем играть lol
          </p>
          <div className="flex flex-col gap-3">
            <button className="pixel-btn text-[8px]" onClick={() => setStep("test_confirm")}>
              📝 ПРОЙТИ ТЕСТ НА ВСПЫША
            </button>
            <button className="pixel-btn-outline text-[8px]" onClick={() => setStep("none")}>
              ✖ ЗАКРЫТЬ
            </button>
          </div>
        </Modal>
      )}

      {step === "test_confirm" && (
        <Modal onClose={() => setStep("none")}>
          <p className="font-pixel text-[var(--pixel-green)] glow-green text-[10px] leading-loose mb-6">
            Ты хотел пройти тест на вспыша?
          </p>
          <div className="flex gap-3 justify-center">
            <button className="pixel-btn text-[8px]" onClick={() => setStep("nuls_confirm")}>
              ДА
            </button>
            <button className="pixel-btn-outline text-[8px]" onClick={() => setStep("real_no")}>
              НЕТ
            </button>
          </div>
        </Modal>
      )}

      {step === "nuls_confirm" && (
        <Modal onClose={() => { setStep("none"); setNulsClicked(false); }}>
          <p className="font-pixel text-[var(--pixel-red)] glow-red text-[10px] leading-loose mb-6">
            И хотел поиграть в нулс?
          </p>
          <div className="flex gap-3 justify-center">
            <button
              className="pixel-btn text-[8px]"
              onClick={() => setNulsClicked(true)}
              style={{ background: "var(--pixel-red)", color: "white" }}
            >
              ДА
            </button>
          </div>
          {nulsClicked && (
            <p className="font-pixel text-[var(--pixel-red)] glow-red text-[9px] mt-4 leading-loose shake-infinite">
              Я не буду играть в него.
            </p>
          )}
        </Modal>
      )}

      {step === "real_no" && (
        <Modal onClose={() => setStep("none")}>
          <p className="font-pixel text-[var(--pixel-amber)] glow-amber text-[9px] leading-loose mb-6">
            Ты РЕАЛЬНО не хочешь<br />пройти этот сигма-сложный тест?
          </p>
          <div className="flex gap-3 justify-center">
            <button
              className="pixel-btn text-[8px]"
              onClick={() => window.close()}
              style={{ background: "var(--pixel-red)", color: "white" }}
            >
              ДА
            </button>
            <button className="pixel-btn-outline text-[8px]" onClick={() => setStep("vsplash_question")}>
              НЕТ
            </button>
          </div>
        </Modal>
      )}

      {step === "vsplash_question" && (
        <Modal onClose={() => setStep("none")}>
          <p className="font-pixel text-[var(--pixel-cyan)] glow-cyan text-[10px] leading-loose mb-6">
            Вы вспыш?
          </p>
          <div className="flex gap-3 justify-center">
            <button className="pixel-btn text-[8px]" onClick={() => setStep("closing")}>
              ДА
            </button>
            <button className="pixel-btn-outline text-[8px]" onClick={() => setStep("closing")}>
              НЕТ
            </button>
          </div>
        </Modal>
      )}

      {step === "closing" && (
        <Modal onClose={() => {}}>
          <p className="font-pixel text-[var(--pixel-green)] glow-green text-[10px] leading-loose mb-4">
            Спасибо за ваш ответ.
          </p>
          <p className="font-pixel text-[var(--pixel-amber)] glow-amber text-[9px] leading-loose">
            Сайт закроется через{" "}
            <span className="text-[var(--pixel-red)] glow-red">{countdown}</span>{" "}
            сек.
          </p>
        </Modal>
      )}

      {/* ======= НУЛС БРАВЛ MODALS ======= */}

      {/* Тест на огурчика */}
      {nulsStage === "cucumber_test" && (
        <Modal onClose={() => setNulsStage(null)}>
          <p className="font-pixel text-[var(--pixel-green)] glow-green text-[10px] leading-loose mb-6">
            🥒 ТЕСТ НА ОГУРЧИКА<br />
            <span className="text-[8px] text-[var(--pixel-dim)]">Вопрос №1</span>
          </p>
          <p className="font-pixel text-[var(--pixel-cyan)] text-[10px] leading-loose mb-6">
            Вы огурчик?
          </p>
          <div className="flex gap-3 justify-center">
            <button
              className="pixel-btn text-[8px]"
              style={{ background: "var(--pixel-green)", color: "black" }}
              onClick={() => setNulsStage("cucumber_closing")}
            >
              ДА
            </button>
            <button
              className="pixel-btn-outline text-[8px]"
              onClick={() => setNulsStage("cucumber_closing")}
            >
              НЕТ
            </button>
          </div>
        </Modal>
      )}

      {/* Огурчик — закрытие */}
      {nulsStage === "cucumber_closing" && (
        <Modal onClose={() => {}}>
          <p className="font-pixel text-[var(--pixel-green)] glow-green text-[10px] leading-loose mb-4">
            🥒 Поздравляю!<br />Вы огурчик.
          </p>
          <p className="font-pixel text-[var(--pixel-amber)] glow-amber text-[9px] leading-loose">
            Сайт закроется через{" "}
            <span className="text-[var(--pixel-red)] glow-red">{cucumberCountdown}</span>{" "}
            сек.
          </p>
        </Modal>
      )}

      {/* Никакого Нулса — выбор задания */}
      {nulsStage === "no_nuls" && (
        <Modal onClose={() => setNulsStage(null)}>
          <p className="font-pixel text-[var(--pixel-red)] glow-red text-[11px] leading-loose mb-6">
            НИКАКОГО НУЛСА
          </p>
          <div className="flex flex-col gap-3">
            <button
              className="pixel-btn text-[8px]"
              onClick={() => { setMathAnswer(""); setNulsStage("math"); }}
            >
              🔢 РЕШИТЬ ПРИМЕР ПО МАТЕМАТИКЕ
            </button>
            <button
              className="pixel-btn-outline text-[8px]"
              onClick={() => { setRussianAnswers({}); setRussianChecked(false); setNulsStage("russian"); }}
            >
              📚 ОПРЕДЕЛИТЬ СПРЯЖЕНИЕ ГЛАГОЛОВ
            </button>
          </div>
        </Modal>
      )}

      {/* Математика */}
      {nulsStage === "math" && (
        <Modal onClose={() => setNulsStage("no_nuls")}>
          <p className="font-pixel text-[var(--pixel-cyan)] glow-cyan text-[9px] leading-loose mb-4">
            🔢 РЕШИ ПРИМЕР:
          </p>
          <p className="font-pixel text-[var(--pixel-green)] text-[10px] leading-loose mb-4">
            (634100 − 17300) ÷ 300 =
          </p>
          <input
            type="number"
            value={mathAnswer}
            onChange={(e) => setMathAnswer(e.target.value)}
            placeholder="Ответ"
            className="w-full bg-black border-2 border-[var(--pixel-green)] text-[var(--pixel-green)] font-pixel text-[10px] px-3 py-2 text-center mb-4 outline-none"
          />
          <button
            className="pixel-btn text-[8px] w-full"
            onClick={checkMath}
          >
            ✔ ПРОВЕРИТЬ
          </button>
        </Modal>
      )}

      {/* Математика — неправильно */}
      {nulsStage === "math_wrong_closing" && (
        <Modal onClose={() => {}}>
          <p className="font-pixel text-[var(--pixel-red)] glow-red text-[9px] leading-loose mb-4">
            🥒 Неправильно!<br />Ты тупорылый огурчик.
          </p>
          <p className="font-pixel text-[var(--pixel-amber)] glow-amber text-[9px] leading-loose">
            Сайт закроется через{" "}
            <span className="text-[var(--pixel-red)] glow-red">{wrongCountdown}</span>{" "}
            сек.
          </p>
        </Modal>
      )}

      {/* Математика — правильно */}
      {nulsStage === "math_success" && (
        <Modal onClose={() => setNulsStage(null)}>
          <p className="font-pixel text-[var(--pixel-green)] glow-green text-[10px] leading-loose mb-6">
            ✅ Правильно!
          </p>
          <button
            className="pixel-btn text-[8px] w-full"
            style={{ background: "var(--pixel-cyan)", color: "black" }}
            onClick={() => {
              localStorage.setItem("nuls_final", "true");
              window.close();
            }}
          >
            ⭐ НУЛС БРАВЛ?..
          </button>
        </Modal>
      )}

      {/* Русский язык */}
      {nulsStage === "russian" && (
        <Modal onClose={() => setNulsStage("no_nuls")}>
          <p className="font-pixel text-[var(--pixel-cyan)] glow-cyan text-[9px] leading-loose mb-4">
            📚 ОПРЕДЕЛИ СПРЯЖЕНИЕ:
          </p>
          <div className="flex flex-col gap-3 mb-4">
            {["Сиять", "Помыть", "Смотреть"].map((verb) => (
              <div key={verb} className="flex items-center justify-between gap-2">
                <span className="font-pixel text-[var(--pixel-green)] text-[9px]">{verb}</span>
                <div className="flex gap-2">
                  <button
                    className={`text-[8px] px-3 py-1 border-2 font-pixel transition-all ${russianAnswers[verb] === "1" ? "bg-[var(--pixel-green)] text-black border-[var(--pixel-green)]" : "bg-transparent text-[var(--pixel-green)] border-[var(--pixel-green)]"}`}
                    onClick={() => setRussianAnswers((a) => ({ ...a, [verb]: "1" }))}
                  >
                    I
                  </button>
                  <button
                    className={`text-[8px] px-3 py-1 border-2 font-pixel transition-all ${russianAnswers[verb] === "2" ? "bg-[var(--pixel-red)] text-white border-[var(--pixel-red)]" : "bg-transparent text-[var(--pixel-red)] border-[var(--pixel-red)]"}`}
                    onClick={() => setRussianAnswers((a) => ({ ...a, [verb]: "2" }))}
                  >
                    II
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            className="pixel-btn text-[8px] w-full"
            onClick={checkRussian}
            disabled={Object.keys(russianAnswers).length < 3}
          >
            ✔ ПРОВЕРИТЬ
          </button>
        </Modal>
      )}

      {/* Русский — неправильно */}
      {nulsStage === "russian_wrong_closing" && (
        <Modal onClose={() => {}}>
          <p className="font-pixel text-[var(--pixel-red)] glow-red text-[9px] leading-loose mb-4">
            🥒 Неправильно!<br />Ты тупорылый огурчик.
          </p>
          <p className="font-pixel text-[var(--pixel-amber)] glow-amber text-[9px] leading-loose">
            Сайт закроется через{" "}
            <span className="text-[var(--pixel-red)] glow-red">{wrongCountdown}</span>{" "}
            сек.
          </p>
        </Modal>
      )}

      {/* Русский — правильно */}
      {nulsStage === "russian_success" && (
        <Modal onClose={() => setNulsStage(null)}>
          <p className="font-pixel text-[var(--pixel-green)] glow-green text-[10px] leading-loose mb-6">
            ✅ Правильно!
          </p>
          <button
            className="pixel-btn text-[8px] w-full"
            style={{ background: "var(--pixel-cyan)", color: "black" }}
            onClick={() => {
              localStorage.setItem("nuls_final", "true");
              window.close();
            }}
          >
            ⭐ НУЛС БРАВЛ?..
          </button>
        </Modal>
      )}

      {/* Финальный экран — заходи */}
      {nulsStage === "final_unlocked" && (
        <Modal onClose={() => setNulsStage(null)}>
          <p className="font-pixel text-[var(--pixel-green)] glow-green text-[14px] leading-loose">
            Заходи.
          </p>
        </Modal>
      )}

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
    </div>
  );
}

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative scanline-box pixel-border p-6 max-w-sm w-full mx-4 text-center slide-up">
        <div className="font-pixel text-[var(--pixel-dim)] text-[6px] mb-4 text-left">
          ┌─ SYSTEM MESSAGE ─────────────────┐
        </div>
        {children}
        <div className="font-pixel text-[var(--pixel-dim)] text-[6px] mt-4 text-right">
          └───────────────────────────────────┘
        </div>
      </div>
    </div>
  );
}
