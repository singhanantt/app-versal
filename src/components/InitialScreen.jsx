export default function InitialScreen({ initialScreen, styles }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center p-6 transition-all duration-300"
      style={{ backgroundColor: styles.backgroundColor }}
    >
      <div
        className="w-full max-w-xs rounded-3xl border border-slate-100 bg-white p-6 text-center shadow-sm"
        style={{ borderRadius: styles.borderRadius }}
      >
        <h2
          className="mb-3 leading-tight transition-all duration-300"
          style={{
            color: styles.titleColor,
            fontSize: `${styles.titleFontSize}px`,
            fontWeight: styles.titleFontWeight,
          }}
        >
          {initialScreen.title}
        </h2>
        <p
          className="leading-relaxed transition-all duration-300"
          style={{
            color: styles.subtitleColor,
            fontSize: `${styles.subtitleFontSize}px`,
            fontWeight: styles.subtitleFontWeight,
          }}
        >
          {initialScreen.subtitle}
        </p>
      </div>
    </div>
  );
}