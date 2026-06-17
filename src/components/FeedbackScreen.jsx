import { useState } from "react";

function Star({ filled, styles, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="transition-transform duration-150 hover:scale-110"
      aria-label="rating star"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-9 w-9"
        fill={filled ? styles.selectedRatingColor : styles.unselectedRatingColor}
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    </button>
  );
}

export default function FeedbackScreen({ feedbackScreen, styles }) {
  const [rating, setRating] = useState(0);

  return (
    <div
      className="flex h-full w-full items-center justify-center p-5 transition-all duration-300"
      style={{ backgroundColor: styles.backgroundColor }}
    >
      <div
        className="w-full max-w-sm rounded-3xl border border-slate-100 bg-white p-5 shadow-sm"
        style={{ borderRadius: styles.borderRadius }}
      >
        <h2
          className="mb-2 text-center leading-tight"
          style={{
            color: styles.titleColor,
            fontSize: `${styles.titleFontSize}px`,
            fontWeight: styles.titleFontWeight,
          }}
        >
          Rate your experience
        </h2>

        <p
          className="mb-5 text-center"
          style={{
            color: styles.subtitleColor,
            fontSize: `${styles.subtitleFontSize}px`,
            fontWeight: styles.subtitleFontWeight,
          }}
        >
          Please choose one option below.
        </p>

        {feedbackScreen.ratingType === "stars" ? (
          <div className="mb-6 flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((num) => (
              <Star
                key={num}
                filled={num <= rating || (rating === 0 && num === 4)}
                styles={styles}
                onClick={() => setRating(num)}
              />
            ))}
          </div>
        ) : (
          <div className="mb-6 flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setRating(num)}
                className="h-11 w-11 rounded-full border text-sm font-semibold transition-transform duration-150 hover:scale-105"
                style={{
                  backgroundColor: rating === num ? styles.selectedRatingColor : "white",
                  color: rating === num ? "#ffffff" : styles.titleColor,
                  borderColor: rating === num ? styles.selectedRatingColor : styles.unselectedRatingColor,
                }}
              >
                {num}
              </button>
            ))}
          </div>
        )}

        <div className="mb-5 space-y-3">
          {feedbackScreen.options.map((option, index) => (
            <label
              key={index}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              style={{ borderRadius: styles.borderRadius }}
            >
              <input type="checkbox" className="h-4 w-4 accent-blue-600" />
              <span className="text-sm text-slate-700">{option}</span>
            </label>
          ))}
        </div>

        {feedbackScreen.showComment && (
          <textarea
            rows="3"
            placeholder="Add additional comments..."
            className="mb-5 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
            style={{ borderRadius: styles.borderRadius }}
          />
        )}

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
          {feedbackScreen.submitText}
        </button>
      </div>
    </div>
  );
}