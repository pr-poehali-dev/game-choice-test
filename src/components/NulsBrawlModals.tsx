import { useState } from "react";
import Modal from "@/components/Modal";
import { NulsStage } from "@/pages/Index";

interface NulsBrawlModalsProps {
  nulsStage: NulsStage | null;
  setNulsStage: (s: NulsStage | null) => void;
  cucumberCountdown: number;
  wrongCountdown: number;
}

export default function NulsBrawlModals({
  nulsStage,
  setNulsStage,
  cucumberCountdown,
  wrongCountdown,
}: NulsBrawlModalsProps) {
  const [mathAnswer, setMathAnswer] = useState("");
  const [russianAnswers, setRussianAnswers] = useState<{ [k: string]: string }>({});

  function checkMath() {
    if (mathAnswer.trim() === "2056") {
      setNulsStage("math_success");
    } else {
      setNulsStage("math_wrong_closing");
    }
  }

  function checkRussian() {
    const correct: { [k: string]: string } = {
      "Сиять": "1",
      "Помыть": "1",
      "Смотреть": "2",
    };
    const allCorrect = Object.entries(correct).every(([verb, sp]) => russianAnswers[verb] === sp);
    if (allCorrect) {
      setNulsStage("russian_success");
    } else {
      setNulsStage("russian_wrong_closing");
    }
  }

  return (
    <>
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
              onClick={() => { setRussianAnswers({}); setNulsStage("russian"); }}
            >
              📚 ОПРЕДЕЛИТЬ СПРЯЖЕНИЕ ГЛАГОЛОВ
            </button>
          </div>
        </Modal>
      )}

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
          <button className="pixel-btn text-[8px] w-full" onClick={checkMath}>
            ✔ ПРОВЕРИТЬ
          </button>
        </Modal>
      )}

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

      {nulsStage === "final_unlocked" && (
        <Modal onClose={() => setNulsStage(null)}>
          <p className="font-pixel text-[var(--pixel-green)] glow-green text-[14px] leading-loose">
            Заходи.
          </p>
        </Modal>
      )}
    </>
  );
}
