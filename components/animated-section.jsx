export function AnimatedSection({ id, className = "", children }) {
  return (
    <section id={id} className={`relative overflow-x-clip ${className}`}>
      <div className="container relative z-10 mx-auto px-4 md:px-6">{children}</div>
    </section>
  );
}
