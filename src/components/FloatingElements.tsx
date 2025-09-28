"use client";

export default function FloatingElements() {
  return (
    <>
      {/* Floating circles */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '8px',
          height: '8px',
          backgroundColor: 'var(--color-accent)',
          borderRadius: '50%',
          opacity: 0.6,
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: '12px',
          height: '12px',
          backgroundColor: 'var(--color-accent)',
          borderRadius: '50%',
          opacity: 0.4,
          animation: 'float 8s ease-in-out infinite 2s',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '30%',
          left: '20%',
          width: '6px',
          height: '6px',
          backgroundColor: 'var(--color-accent)',
          borderRadius: '50%',
          opacity: 0.5,
          animation: 'float 7s ease-in-out infinite 4s',
        }}
      />

      {/* Floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </>
  );
}
