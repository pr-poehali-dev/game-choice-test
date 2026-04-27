import { useState, useEffect } from "react";

type ModalStep =
  | "none"
  | "game_choice"
  | "download_first"
  | "test_confirm"
  | "nuls_confirm"
  | "real_no"
  | "vsplash_question"
  | "closing";

export default function Index() {
  const [step, setStep] = useState<ModalStep>("none");
  const [countdown, setCountdown] = useState(10);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (step === "closing") {
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
    if (shake) {
      const t = setTimeout(() => setShake(false), 600);
      return () => clearTimeout(t);
    }
  }, [shake]);

  const triggerShake = () => {
    setShake(false);
    setTimeout(() => setShake(true), 10);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      {/* Header */}
      <div className="text-center mb-12 fade-in-pixel">
        <div className="font-pixel text-[var(--pixel-amber)] glow-amber text-xs mb-2 blink">
          ▶ GAME SELECT v1.0 ◀
        </div>
        <h1 className="font-pixel text-[var(--pixel-green)] glow-green text-sm md:text-xl leading-loose glitch">
          GAME STATION
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
        </div>

        <div className="mt-6 font-pixel text-[var(--pixel-dim)] text-[7px]">
          ВЫБЕРИ ВАРИАНТ ВЫШЕ ▲
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 font-pixel text-[6px] text-[var(--pixel-dim)] flicker">
        © 2024 GAME STATION | INSERT COIN
      </div>

      {/* ======= MODALS ======= */}

      {/* MODAL: Сначала скачай */}
      {step === "download_first" && (
        <Modal onClose={() => setStep("none")}>
          <p className="font-pixel text-[var(--pixel-amber)] glow-amber text-[10px] leading-loose mb-6">
            Сначала скачай,<br />потом будем играть lol
          </p>
          <div className="flex flex-col gap-3">
            <button
              className="pixel-btn text-[8px]"
              onClick={() => setStep("test_confirm")}
            >
              📝 ПРОЙТИ ТЕСТ НА ВСПЫША
            </button>
            <button
              className="pixel-btn-outline text-[8px]"
              onClick={() => setStep("none")}
            >
              ✖ ЗАКРЫТЬ
            </button>
          </div>
        </Modal>
      )}

      {/* MODAL: Ты хотел пройти тест? */}
      {step === "test_confirm" && (
        <Modal onClose={() => setStep("none")}>
          <p className="font-pixel text-[var(--pixel-green)] glow-green text-[10px] leading-loose mb-6">
            Ты хотел пройти тест на вспыша?
          </p>
          <div className="flex gap-3 justify-center">
            <button
              className="pixel-btn text-[8px]"
              onClick={() => setStep("nuls_confirm")}
            >
              ДА
            </button>
            <button
              className="pixel-btn-outline text-[8px]"
              onClick={() => setStep("real_no")}
            >
              НЕТ
            </button>
          </div>
        </Modal>
      )}

      {/* MODAL: И хотел поиграть в нулс? */}
      {step === "nuls_confirm" && (
        <Modal onClose={() => setStep("none")}>
          <p
            className="font-pixel text-[var(--pixel-red)] glow-red text-[10px] leading-loose mb-6"
          >
            И хотел поиграть в нулс?
          </p>
          <div className="flex gap-3 justify-center">
            <button
              className="pixel-btn text-[8px]"
              onClick={() => {
                triggerShake();
              }}
              style={{ background: "var(--pixel-red)", color: "white" }}
            >
              ДА
            </button>
          </div>
          {shake && (
            <p className="font-pixel text-[var(--pixel-red)] glow-red text-[9px] mt-4 leading-loose shake">
              Я не буду играть в него.
            </p>
          )}
        </Modal>
      )}

      {/* MODAL: Ты РЕАЛЬНО не хочешь? */}
      {step === "real_no" && (
        <Modal onClose={() => setStep("none")}>
          <p className="font-pixel text-[var(--pixel-amber)] glow-amber text-[9px] leading-loose mb-6">
            Ты РЕАЛЬНО не хочешь<br />пройти этот сигма-сложный тест?
          </p>
          <div className="flex gap-3 justify-center">
            <button
              className="pixel-btn text-[8px]"
              onClick={() => {
                window.close();
              }}
              style={{ background: "var(--pixel-red)", color: "white" }}
            >
              ДА
            </button>
            <button
              className="pixel-btn-outline text-[8px]"
              onClick={() => setStep("vsplash_question")}
            >
              НЕТ
            </button>
          </div>
        </Modal>
      )}

      {/* MODAL: Вы вспыш? */}
      {step === "vsplash_question" && (
        <Modal onClose={() => setStep("none")}>
          <p className="font-pixel text-[var(--pixel-cyan)] glow-cyan text-[10px] leading-loose mb-6">
            Вы вспыш?
          </p>
          <div className="flex gap-3 justify-center">
            <button
              className="pixel-btn text-[8px]"
              onClick={() => setStep("closing")}
            >
              ДА
            </button>
            <button
              className="pixel-btn-outline text-[8px]"
              onClick={() => setStep("closing")}
            >
              НЕТ
            </button>
          </div>
        </Modal>
      )}

      {/* MODAL: Спасибо, закрытие */}
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
      <div
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />
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