import { useEffect, useRef, useState } from "react";
import Modal from "@/components/Modal";
import { RygStage } from "@/pages/Index";

interface RygModalsProps {
  rygStage: RygStage | null;
  setRygStage: (s: RygStage | null) => void;
  boostSecondsLeft: number;
}

export default function RygModals({ rygStage, setRygStage, boostSecondsLeft }: RygModalsProps) {
  const [brightness, setBrightness] = useState(0);
  const brightnessRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (rygStage === "boost_reveal") {
      setBrightness(0);
      brightnessRef.current = setInterval(() => {
        setBrightness((prev) => {
          if (prev >= 100) {
            clearInterval(brightnessRef.current!);
            return 100;
          }
          return prev + 2;
        });
      }, 60);
      return () => { if (brightnessRef.current) clearInterval(brightnessRef.current); };
    }
  }, [rygStage]);

  function formatCountdown(seconds: number) {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${d}д ${String(h).padStart(2, "0")}ч ${String(m).padStart(2, "0")}м ${String(s).padStart(2, "0")}с`;
  }

  return (
    <>
      {/* Тест на рыга */}
      {rygStage === "ryg_question" && (
        <Modal onClose={() => setRygStage(null)}>
          <p className="font-pixel text-[var(--pixel-amber)] glow-amber text-[10px] leading-loose mb-6">
            Вы рыг?
          </p>
          <div className="flex gap-3 justify-center">
            <button
              className="pixel-btn text-[8px]"
              style={{ background: "var(--pixel-amber)", color: "black" }}
              onClick={() => setRygStage("ryg_loves_nuls")}
            >
              ДА
            </button>
            <button
              className="pixel-btn-outline text-[8px]"
              onClick={() => setRygStage("ryg_ok")}
            >
              НЕТ
            </button>
          </div>
        </Modal>
      )}

      {/* Рыг — ок */}
      {rygStage === "ryg_ok" && (
        <Modal onClose={() => setRygStage(null)}>
          <p className="font-pixel text-[var(--pixel-dim)] text-[12px] leading-loose">
            ок
          </p>
        </Modal>
      )}

      {/* Вы любите нулс бравл? */}
      {rygStage === "ryg_loves_nuls" && (
        <Modal onClose={() => setRygStage(null)}>
          <p className="font-pixel text-[var(--pixel-cyan)] glow-cyan text-[10px] leading-loose mb-6">
            Вы любите нулс бравл?
          </p>
          <div className="flex gap-3 justify-center">
            <button
              className="pixel-btn text-[8px]"
              style={{ background: "var(--pixel-cyan)", color: "black" }}
              onClick={() => {
                localStorage.setItem("ryg_done", "true");
                window.close();
              }}
            >
              ДА
            </button>
            <button
              className="pixel-btn-outline text-[8px]"
              onClick={() => setRygStage(null)}
            >
              НЕТ
            </button>
          </div>
        </Modal>
      )}

      {/* ??? — Буст окно (темнеющее→светлеющее) */}
      {rygStage === "boost_reveal" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0"
            style={{ background: `rgba(0,0,0,${1 - brightness / 100})` }}
          />
          <div
            className="relative pixel-border p-6 max-w-sm w-full mx-4 text-center transition-all"
            style={{
              background: `rgba(0,0,0,${0.95 - brightness * 0.007})`,
              opacity: brightness / 100,
            }}
          >
            <div className="font-pixel text-[var(--pixel-dim)] text-[6px] mb-4 text-left">
              ┌─ SYSTEM MESSAGE ─────────────────┐
            </div>
            <p className="font-pixel text-[var(--pixel-green)] glow-green text-[9px] leading-loose mb-6">
              🚀 Новый буст!<br />
              Большие порции нулса<br />
              на 3 дня вперёд.<br />
              <br />
              Активировать?
            </p>
            <div className="flex gap-3 justify-center">
              <button
                className="pixel-btn text-[8px]"
                style={{ background: "var(--pixel-green)", color: "black" }}
                onClick={() => {
                  const until = Date.now() + 3 * 24 * 60 * 60 * 1000;
                  localStorage.setItem("boost_until", String(until));
                  window.close();
                }}
              >
                ДА
              </button>
              <button
                className="pixel-btn-outline text-[8px]"
                onClick={() => window.close()}
              >
                НЕТ
              </button>
            </div>
            <div className="font-pixel text-[var(--pixel-dim)] text-[6px] mt-4 text-right">
              └───────────────────────────────────┘
            </div>
          </div>
        </div>
      )}

      {/* Обратный отсчёт буста */}
      {rygStage === "boost_active" && (
        <Modal onClose={() => setRygStage(null)}>
          <p className="font-pixel text-[var(--pixel-green)] glow-green text-[9px] leading-loose mb-4">
            🚀 БУСТ АКТИВЕН
          </p>
          <p className="font-pixel text-[var(--pixel-cyan)] glow-cyan text-[10px] leading-loose">
            {formatCountdown(boostSecondsLeft)}
          </p>
        </Modal>
      )}
    </>
  );
}
