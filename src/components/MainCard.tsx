import { ModalStep } from "@/pages/Index";

interface MainCardProps {
  nulsBrawlUnlocked: boolean;
  rygTestUnlocked: boolean;
  secretBtnUnlocked: boolean;
  onGameClick: (step: ModalStep) => void;
  onNulsBrawl: () => void;
  onRygTest: () => void;
  onSecretBtn: () => void;
}

export default function MainCard({
  nulsBrawlUnlocked,
  rygTestUnlocked,
  secretBtnUnlocked,
  onGameClick,
  onNulsBrawl,
  onRygTest,
  onSecretBtn,
}: MainCardProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="text-center mb-12 fade-in-pixel">
        <h1 className="font-pixel text-[var(--pixel-green)] glow-green text-sm md:text-xl leading-loose glitch">
          ВЫБОР ГОДА
        </h1>
        <div className="font-pixel text-[var(--pixel-cyan)] text-[8px] mt-3 glow-cyan">
          === ДОБРО ПОЖАЛОВАТЬ ===
        </div>
      </div>

      <div className="scanline-box pixel-border p-8 max-w-lg w-full text-center slide-up">
        <p className="font-pixel text-[var(--pixel-green)] text-[10px] leading-loose mb-8">
          ВО ЧТО МЫ БУДЕМ ИГРАТЬ?
        </p>

        <div className="flex flex-col gap-4">
          <button
            className="pixel-btn w-full text-[9px]"
            onClick={() => onGameClick("download_first")}
          >
            🔷 ГЕОМЕТРИ ДЕШ
          </button>
          <button
            className="pixel-btn w-full text-[9px]"
            onClick={() => onGameClick("download_first")}
            style={{ background: "var(--pixel-purple)", color: "white" }}
          >
            ❤ АНДЕРТЕЙЛ
          </button>
          <button
            className="pixel-btn-outline w-full text-[9px] mt-2"
            onClick={() => onGameClick("test_confirm")}
          >
            📝 ПРОЙТИ ТЕСТ НА ВСПЫША
          </button>
          {nulsBrawlUnlocked && (
            <button
              className="pixel-btn w-full text-[9px] mt-2"
              onClick={onNulsBrawl}
              style={{ background: "var(--pixel-cyan)", color: "black" }}
            >
              ⭐ НУЛС БРАВЛ
            </button>
          )}
          {rygTestUnlocked && (
            <button
              className="pixel-btn w-full text-[9px] mt-2"
              onClick={onRygTest}
              style={{ background: "var(--pixel-amber)", color: "black" }}
            >
              🧪 ТЕСТ НА РЫГА
            </button>
          )}
          {secretBtnUnlocked && (
            <button
              className="pixel-btn w-full text-[9px] mt-2"
              onClick={onSecretBtn}
              style={{ background: "#111", color: "var(--pixel-dim)", border: "2px solid var(--pixel-dim)" }}
            >
              ???
            </button>
          )}
        </div>

        <div className="mt-6 font-pixel text-[var(--pixel-dim)] text-[7px]">
          ВЫБЕРИ ВАРИАНТ ВЫШЕ ▲
        </div>
      </div>

      <div className="mt-8 font-pixel text-[6px] text-[var(--pixel-dim)] flicker">
        © 2026 ВЫБОР ГОДА
      </div>
    </div>
  );
}
