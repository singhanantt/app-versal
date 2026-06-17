import React, { createContext, useContext, useMemo, useReducer } from "react";

const FormBuilderContext = createContext(null);

const initialState = {
  initialScreen: {
    title: "How was your experience?",
    subtitle: "We'd love to hear your feedback.",
  },
  feedbackScreen: {
    ratingType: "stars", // "stars" | "numbers"
    options: ["Service", "Support", "Delivery"],
    showComment: true,
    submitText: "Submit Feedback",
  },
  thankYouScreen: {
    media: null,
    title: "Thank You!",
    subtitle: "We appreciate your feedback.",
    buttonText: "Done",
  },
  styles: {
    backgroundColor: "#ffffff",
    titleColor: "#111827",
    subtitleColor: "#6b7280",
    buttonColor: "#2563eb",
    buttonTextColor: "#ffffff",
    selectedRatingColor: "#f59e0b",
    unselectedRatingColor: "#d1d5db",
    titleFontSize: 24,
    subtitleFontSize: 16,
    titleFontWeight: 700,
    subtitleFontWeight: 400,
    borderRadius: 12,
    buttonWidth: 200,
    buttonHeight: 48,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_INITIAL_SCREEN":
      return {
        ...state,
        initialScreen: {
          ...state.initialScreen,
          [action.field]: action.value,
        },
      };

    case "SET_FEEDBACK_SCREEN":
      return {
        ...state,
        feedbackScreen: {
          ...state.feedbackScreen,
          [action.field]: action.value,
        },
      };

    case "ADD_OPTION":
      return {
        ...state,
        feedbackScreen: {
          ...state.feedbackScreen,
          options: [...state.feedbackScreen.options, action.value || "New Option"],
        },
      };

    case "UPDATE_OPTION":
      return {
        ...state,
        feedbackScreen: {
          ...state.feedbackScreen,
          options: state.feedbackScreen.options.map((opt, index) =>
            index === action.index ? action.value : opt
          ),
        },
      };

    case "DELETE_OPTION":
      return {
        ...state,
        feedbackScreen: {
          ...state.feedbackScreen,
          options: state.feedbackScreen.options.filter((_, index) => index !== action.index),
        },
      };

    case "SET_THANKYOU_SCREEN":
      return {
        ...state,
        thankYouScreen: {
          ...state.thankYouScreen,
          [action.field]: action.value,
        },
      };

    case "SET_THANKYOU_MEDIA":
      return {
        ...state,
        thankYouScreen: {
          ...state.thankYouScreen,
          media: action.value,
        },
      };

    case "SET_STYLE":
      return {
        ...state,
        styles: {
          ...state.styles,
          [action.field]: action.value,
        },
      };

    case "RESET_ALL":
      return initialState;

    default:
      return state;
  }
}

export function FormBuilderProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <FormBuilderContext.Provider value={value}>{children}</FormBuilderContext.Provider>;
}

export function useFormBuilder() {
  const context = useContext(FormBuilderContext);
  if (!context) {
    throw new Error("useFormBuilder must be used inside FormBuilderProvider");
  }
  return context;
}