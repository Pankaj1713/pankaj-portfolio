export function AmbientBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[-10%] top-[-10%] h-[60%] w-[55%] rounded-full bg-cyan-500/15 blur-[120px]" />
      <div className="absolute bottom-[-5%] right-[-10%] h-[55%] w-[50%] rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute left-[30%] top-[40%] h-[35%] w-[40%] rounded-full bg-purple-600/10 blur-[120px]" />
      <div className="css-starfield absolute inset-0 opacity-60" />
    </div>
  );
}
