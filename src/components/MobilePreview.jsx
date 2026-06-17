import { useMemo, useState } from "react";
import InitialScreen from "./InitialScreen";
import FeedbackScreen from "./FeedbackScreen";
import ThankYouScreen from "./ThankYouScreen";

const tabs = [
  { key: "initial", label: "Initial" },
  { key: "feedback", label: "Feedback" },
  { key: "thankyou", label: "Thank You" },
];

export default function MobilePreview({ state }) {
  const [activeTab, setActiveTab] = useState("initial");

  const currentScreen = useMemo(() => {
    if (activeTab === "feedback") return "feedback";
    if (activeTab === "thankyou") return "thankyou";
    return "initial";
  }, [activeTab]);

  return (
    <div className="lg:sticky lg:top-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <div className="relative h-[812px] w-[375px] overflow-hidden rounded-[2.75rem] border-[10px] border-slate-900 bg-slate-900 shadow-2xl">
            <div className="absolute left-1/2 top-3 h-1.5 w-24 -translate-x-1/2 rounded-full bg-slate-700" />
            <div className="h-full w-full overflow-hidden bg-white">
              {currentScreen === "initial" && (
                <InitialScreen initialScreen={state.initialScreen} styles={state.styles} />
              )}
              {currentScreen === "feedback" && (
                <FeedbackScreen feedbackScreen={state.feedbackScreen} styles={state.styles} />
              )}
              {currentScreen === "thankyou" && (
                <ThankYouScreen thankYouScreen={state.thankYouScreen} styles={state.styles} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}