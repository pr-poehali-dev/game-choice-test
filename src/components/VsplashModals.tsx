import { useState } from "react";
import Modal from "@/components/Modal";
import { ModalStep } from "@/pages/Index";

interface VsplashModalsProps {
  step: ModalStep;
  setStep: (s: ModalStep) => void;
  countdown: number;
}

export default function VsplashModals({ step, setStep, countdown }: VsplashModalsProps) {
  const [nulsClicked, setNulsClicked] = useState(false);

  return (
    <>
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
    </>
  );
}
