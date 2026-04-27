export default function Modal({
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
