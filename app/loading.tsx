export default function Loading() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[999]"
      style={{ background: "#f7f3ee" }}
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-6">
        <p
          className="font-serif italic font-light text-[1.25rem] tracking-[0.02em]"
          style={{ color: "#7a6e63" }}
        >
          Anastasiia Monzon
        </p>
        <div
          className="w-16 h-px relative overflow-hidden"
          style={{ background: "#ede5dc" }}
        >
          <div
            className="absolute left-0 top-0 bottom-0"
            style={{
              background: "#d4a0a4",
              animation: "loading-bar 2.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>
      <style>{`
        @keyframes loading-bar {
          0%   { width: 0%;   left: 0;    }
          50%  { width: 100%; left: 0;    }
          100% { width: 0%;   left: 100%; }
        }
      `}</style>
    </div>
  );
}
