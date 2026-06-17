import Lottie from "lottie-react";

export default function ThankYouScreen({ thankYouScreen, styles }) {
  const { media } = thankYouScreen;

  return (
    <div
      className="flex h-full w-full items-center justify-center p-5 transition-all duration-300"
      style={{ backgroundColor: styles.backgroundColor }}
    >
      <div
        className="w-full max-w-sm rounded-3xl border border-slate-100 bg-white p-6 text-center shadow-sm"
        style={{ borderRadius: styles.borderRadius }}
      >
        <div className="mb-5 flex justify-center">
          {media ? (
            media.type === "image" ? (
              <img
                src={media.src}
                alt={media.fileName || "Uploaded media"}
                className="h-32 w-32 rounded-2xl object-cover"
                style={{ borderRadius: styles.borderRadius }}
              />
            ) : (
              <div className="h-40 w-40">
                <Lottie animationData={media.animationData} loop />
              </div>
            )
          ) : (
            <div
              className="flex h-32 w-32 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 text-xs text-slate-400"
              style={{ borderRadius: styles.borderRadius }}
            >
              Upload media
            </div>
          )}
        </div>

        <h2
          className="mb-3 leading-tight"
          style={{
            color: styles.titleColor,
            fontSize: `${styles.titleFontSize}px`,
            fontWeight: styles.titleFontWeight,
          }}
        >
          {thankYouScreen.title}
        </h2>

        <p
          className="mb-6"
          style={{
            color: styles.subtitleColor,
            fontSize: `${styles.subtitleFontSize}px`,
            fontWeight: styles.subtitleFontWeight,
          }}
        >
          {thankYouScreen.subtitle}
        </p>

        <button
          type="button"
          className="mx-auto block font-semibold shadow-sm transition-transform duration-150 hover:-translate-y-0.5"
          style={{
            backgroundColor: styles.buttonColor,
            color: styles.buttonTextColor,
            width: `${styles.buttonWidth}px`,
            height: `${styles.buttonHeight}px`,
            borderRadius: styles.borderRadius,
          }}
        >
          {thankYouScreen.buttonText}
        </button>
      </div>
    </div>
  );
}