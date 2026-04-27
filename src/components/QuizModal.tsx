import { useState, useEffect } from 'react';

interface Answer {
  text: string;
  correct: boolean;
}

interface Question {
  id: number;
  question: string;
  answers: Answer[];
  explanation: string;
}

interface QuizModalProps {
  quiz: {
    title: string;
    questions: Question[];
  };
  onClose: () => void;
}

export default function QuizModal({ quiz, onClose }: QuizModalProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
  }, []);

  const question = quiz.questions[currentQ];
  const progress = ((currentQ) / quiz.questions.length) * 100;

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (question.answers[idx].correct) {
      setScore((s) => s + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQ + 1 >= quiz.questions.length) {
      setFinished(true);
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setFinished(false);
  };

  const getRating = () => {
    const pct = score / quiz.questions.length;
    if (pct === 1) return { label: 'PERFECT! 100%', color: 'var(--pixel-green)' };
    if (pct >= 0.7) return { label: 'ОТЛИЧНО!', color: 'var(--pixel-amber)' };
    if (pct >= 0.4) return { label: 'НЕПЛОХО', color: 'var(--pixel-cyan)' };
    return { label: 'GAME OVER', color: 'var(--pixel-red)' };
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-lg scanline-box"
        style={{
          border: '2px solid var(--pixel-green)',
          boxShadow: '0 0 40px rgba(0,255,65,0.3), inset 0 0 20px rgba(0,255,65,0.05)',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'scale(1)' : 'scale(0.9)',
          transition: 'all 0.2s ease-out',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            borderBottom: '2px solid var(--pixel-green)',
            backgroundColor: 'rgba(0,255,65,0.08)',
          }}
        >
          <span className="font-pixel text-[8px] glow-green" style={{ color: 'var(--pixel-green)' }}>
            {quiz.title}
          </span>
          <button
            onClick={onClose}
            className="font-pixel text-[8px] px-2 py-1 hover:bg-red-900 transition-colors"
            style={{ color: 'var(--pixel-red)', border: '1px solid var(--pixel-red)' }}
          >
            [X]
          </button>
        </div>

        {!finished ? (
          <div className="p-5">
            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex justify-between font-mono text-xs mb-1" style={{ color: 'var(--pixel-dim)' }}>
                <span>ВОПРОС {currentQ + 1}/{quiz.questions.length}</span>
                <span>СЧЁТ: {score}</span>
              </div>
              <div
                className="w-full h-3"
                style={{ backgroundColor: 'var(--pixel-dim)', border: '1px solid var(--pixel-green)' }}
              >
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: 'var(--pixel-green)',
                    boxShadow: '0 0 8px var(--pixel-green)',
                  }}
                />
              </div>
            </div>

            {/* Question */}
            <div
              className="p-4 mb-4 font-mono text-sm leading-relaxed"
              style={{
                color: 'var(--pixel-green)',
                border: '1px solid var(--pixel-dim)',
                backgroundColor: 'rgba(0,255,65,0.03)',
              }}
            >
              <span style={{ color: 'var(--pixel-amber)' }}>► </span>
              {question.question}
            </div>

            {/* Answers */}
            <div className="flex flex-col gap-2 mb-4">
              {question.answers.map((ans, idx) => {
                let borderColor = 'var(--pixel-dim)';
                let bgColor = 'transparent';
                let textColor = 'var(--pixel-green)';

                if (selected !== null) {
                  if (ans.correct) {
                    borderColor = 'var(--pixel-green)';
                    bgColor = 'rgba(0,255,65,0.15)';
                  } else if (idx === selected && !ans.correct) {
                    borderColor = 'var(--pixel-red)';
                    bgColor = 'rgba(255,34,51,0.15)';
                    textColor = 'var(--pixel-red)';
                  } else {
                    textColor = 'var(--pixel-dim)';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className="text-left p-3 font-mono text-xs transition-all duration-100"
                    style={{
                      border: `1px solid ${borderColor}`,
                      backgroundColor: bgColor,
                      color: textColor,
                      cursor: selected !== null ? 'default' : 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      if (selected === null) {
                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--pixel-green)';
                        (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(0,255,65,0.08)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selected === null) {
                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--pixel-dim)';
                        (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <span style={{ color: 'var(--pixel-amber)' }}>{String.fromCharCode(65 + idx)}. </span>
                    {ans.text}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showResult && (
              <div
                className="p-3 mb-4 font-mono text-xs animate-fade-in"
                style={{
                  border: '1px solid var(--pixel-amber)',
                  backgroundColor: 'rgba(255,176,0,0.08)',
                  color: 'var(--pixel-amber)',
                }}
              >
                <span className="font-pixel" style={{ fontSize: '7px' }}>INFO: </span>
                {question.explanation}
              </div>
            )}

            {showResult && (
              <button
                onClick={handleNext}
                className="w-full pixel-btn py-3"
                style={{ fontSize: '9px' }}
              >
                {currentQ + 1 >= quiz.questions.length ? '► ЗАВЕРШИТЬ' : '► СЛЕДУЮЩИЙ ВОПРОС'}
              </button>
            )}
          </div>
        ) : (
          /* Results screen */
          <div className="p-6 text-center">
            <div
              className="font-pixel mb-4 glow-green"
              style={{ color: 'var(--pixel-green)', fontSize: '10px', lineHeight: '2' }}
            >
              РЕЗУЛЬТАТЫ
            </div>

            <div
              className="font-pixel mb-2"
              style={{ fontSize: '28px', color: getRating().color, textShadow: `0 0 20px ${getRating().color}` }}
            >
              {score}/{quiz.questions.length}
            </div>

            <div
              className="font-pixel mb-6"
              style={{ fontSize: '9px', color: getRating().color }}
            >
              {getRating().label}
            </div>

            {/* Score bar */}
            <div
              className="w-full h-4 mb-6"
              style={{ backgroundColor: 'var(--pixel-dim)', border: '1px solid var(--pixel-green)' }}
            >
              <div
                className="h-full transition-all duration-1000"
                style={{
                  width: `${(score / quiz.questions.length) * 100}%`,
                  backgroundColor: getRating().color,
                  boxShadow: `0 0 10px ${getRating().color}`,
                }}
              />
            </div>

            <div className="flex gap-3">
              <button onClick={handleRestart} className="flex-1 pixel-btn-outline py-3 font-pixel" style={{ fontSize: '8px' }}>
                ↺ ЗАНОВО
              </button>
              <button onClick={onClose} className="flex-1 pixel-btn py-3 font-pixel" style={{ fontSize: '8px' }}>
                ✓ ВЫЙТИ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
