import { useRef } from "react";
import { Upload } from "lucide-react";
import { useFormBuilder } from "../context/FormBuilderContext";
import ColorPicker from "../components/ColorPicker";
import SliderControl from "../components/SliderControl";
import DynamicOptions from "../components/DynamicOptions";
import MobilePreview from "../components/MobilePreview";

export default function Builder() {
  const { state, dispatch } = useFormBuilder();
  const fileInputRef = useRef(null);

  const handleMediaUpload = async (file) => {
    if (!file) return;

    const isImage = ["image/png", "image/jpeg", "image/jpg", "image/gif"].includes(file.type);
    const isJson =
      file.type === "application/json" || file.name.toLowerCase().endsWith(".json");

    if (isImage) {
      const src = URL.createObjectURL(file);
      dispatch({
        type: "SET_THANKYOU_MEDIA",
        value: {
          type: "image",
          src,
          fileName: file.name,
        },
      });
      return;
    }

    if (isJson) {
      const text = await file.text();
      try {
        const animationData = JSON.parse(text);
        dispatch({
          type: "SET_THANKYOU_MEDIA",
          value: {
            type: "lottie",
            animationData,
            fileName: file.name,
          },
        });
      } catch (error) {
        alert("Invalid Lottie JSON file.");
      }
      return;
    }

    alert("Please upload PNG, JPG, JPEG, GIF, or Lottie JSON.");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1600px] px-4 py-6 md:px-6">
        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Feedback Form Builder
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Customize content, styling, and live mobile preview in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[40%_60%]">
          {/* Left Panel */}
          <div className="space-y-6">
            {/* Content Settings */}
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">Content Settings</h2>

              <div className="space-y-5">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="mb-3 text-sm font-semibold text-slate-800">
                    Initial Feedback Screen
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Title
                      </label>
                      <input
                        value={state.initialScreen.title}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_INITIAL_SCREEN",
                            field: "title",
                            value: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Subtitle
                      </label>
                      <textarea
                        value={state.initialScreen.subtitle}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_INITIAL_SCREEN",
                            field: "subtitle",
                            value: e.target.value,
                          })
                        }
                        rows="3"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="mb-3 text-sm font-semibold text-slate-800">Feedback Screen</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Rating Type
                      </label>
                      <select
                        value={state.feedbackScreen.ratingType}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_FEEDBACK_SCREEN",
                            field: "ratingType",
                            value: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
                      >
                        <option value="stars">Stars (1-5)</option>
                        <option value="numbers">Numbers (1-5)</option>
                      </select>
                    </div>

                    <DynamicOptions
                      options={state.feedbackScreen.options}
                      onAdd={() => dispatch({ type: "ADD_OPTION", value: "New Option" })}
                      onUpdate={(index, value) =>
                        dispatch({ type: "UPDATE_OPTION", index, value })
                      }
                      onDelete={(index) => dispatch({ type: "DELETE_OPTION", index })}
                    />

                    <label className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <span className="text-sm font-medium text-slate-700">
                        Enable Additional Comment
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          dispatch({
                            type: "SET_FEEDBACK_SCREEN",
                            field: "showComment",
                            value: !state.feedbackScreen.showComment,
                          })
                        }
                        className={`relative h-7 w-12 rounded-full transition ${
                          state.feedbackScreen.showComment ? "bg-blue-600" : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                            state.feedbackScreen.showComment ? "left-6" : "left-1"
                          }`}
                        />
                      </button>
                    </label>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Submit Button Text
                      </label>
                      <input
                        value={state.feedbackScreen.submitText}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_FEEDBACK_SCREEN",
                            field: "submitText",
                            value: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="mb-3 text-sm font-semibold text-slate-800">Thank You Screen</h3>

                  <div className="space-y-3">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Upload Media
                      </label>
                      <div className="flex flex-wrap items-center gap-3">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/png,image/jpeg,image/jpg,image/gif,.json,application/json"
                          onChange={(e) => handleMediaUpload(e.target.files?.[0])}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                        >
                          <Upload size={16} />
                          Upload File
                        </button>

                        {state.thankYouScreen.media && (
                          <button
                            type="button"
                            onClick={() =>
                              dispatch({ type: "SET_THANKYOU_MEDIA", value: null })
                            }
                            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <p className="mt-2 text-xs text-slate-500">
                        Supported: PNG, JPG, JPEG, GIF, Lottie JSON
                      </p>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Thank You Title
                      </label>
                      <input
                        value={state.thankYouScreen.title}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_THANKYOU_SCREEN",
                            field: "title",
                            value: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Thank You Subtitle
                      </label>
                      <textarea
                        value={state.thankYouScreen.subtitle}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_THANKYOU_SCREEN",
                            field: "subtitle",
                            value: e.target.value,
                          })
                        }
                        rows="3"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Thank You Button Text
                      </label>
                      <input
                        value={state.thankYouScreen.buttonText}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_THANKYOU_SCREEN",
                            field: "buttonText",
                            value: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Style Settings */}
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">Style Settings</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <ColorPicker
                    label="Background Color"
                    value={state.styles.backgroundColor}
                    onChange={(value) =>
                      dispatch({ type: "SET_STYLE", field: "backgroundColor", value })
                    }
                  />
                  <ColorPicker
                    label="Title Color"
                    value={state.styles.titleColor}
                    onChange={(value) =>
                      dispatch({ type: "SET_STYLE", field: "titleColor", value })
                    }
                  />
                  <ColorPicker
                    label="Subtitle Color"
                    value={state.styles.subtitleColor}
                    onChange={(value) =>
                      dispatch({ type: "SET_STYLE", field: "subtitleColor", value })
                    }
                  />
                  <ColorPicker
                    label="Button Color"
                    value={state.styles.buttonColor}
                    onChange={(value) =>
                      dispatch({ type: "SET_STYLE", field: "buttonColor", value })
                    }
                  />
                  <ColorPicker
                    label="Button Text Color"
                    value={state.styles.buttonTextColor}
                    onChange={(value) =>
                      dispatch({ type: "SET_STYLE", field: "buttonTextColor", value })
                    }
                  />
                  <ColorPicker
                    label="Rating Selected Color"
                    value={state.styles.selectedRatingColor}
                    onChange={(value) =>
                      dispatch({ type: "SET_STYLE", field: "selectedRatingColor", value })
                    }
                  />
                  <ColorPicker
                    label="Rating Unselected Color"
                    value={state.styles.unselectedRatingColor}
                    onChange={(value) =>
                      dispatch({ type: "SET_STYLE", field: "unselectedRatingColor", value })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <h3 className="mb-4 text-sm font-semibold text-slate-800">Typography</h3>
                    <div className="space-y-4">
                      <SliderControl
                        label="Title Font Size"
                        value={state.styles.titleFontSize}
                        min={16}
                        max={40}
                        onChange={(value) =>
                          dispatch({ type: "SET_STYLE", field: "titleFontSize", value })
                        }
                        suffix="px"
                      />
                      <SliderControl
                        label="Subtitle Font Size"
                        value={state.styles.subtitleFontSize}
                        min={12}
                        max={24}
                        onChange={(value) =>
                          dispatch({ type: "SET_STYLE", field: "subtitleFontSize", value })
                        }
                        suffix="px"
                      />

                      <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                          Title Font Weight
                        </label>
                        <select
                          value={state.styles.titleFontWeight}
                          onChange={(e) =>
                            dispatch({
                              type: "SET_STYLE",
                              field: "titleFontWeight",
                              value: Number(e.target.value),
                            })
                          }
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
                        >
                          <option value={400}>400</option>
                          <option value={500}>500</option>
                          <option value={600}>600</option>
                          <option value={700}>700</option>
                          <option value={800}>800</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                          Subtitle Font Weight
                        </label>
                        <select
                          value={state.styles.subtitleFontWeight}
                          onChange={(e) =>
                            dispatch({
                              type: "SET_STYLE",
                              field: "subtitleFontWeight",
                              value: Number(e.target.value),
                            })
                          }
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
                        >
                          <option value={300}>300</option>
                          <option value={400}>400</option>
                          <option value={500}>500</option>
                          <option value={600}>600</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <h3 className="mb-4 text-sm font-semibold text-slate-800">Spacing & Shape</h3>
                    <div className="space-y-4">
                      <SliderControl
                        label="Border Radius"
                        value={state.styles.borderRadius}
                        min={0}
                        max={50}
                        onChange={(value) =>
                          dispatch({ type: "SET_STYLE", field: "borderRadius", value })
                        }
                        suffix="px"
                      />
                      <SliderControl
                        label="Button Width"
                        value={state.styles.buttonWidth}
                        min={120}
                        max={320}
                        onChange={(value) =>
                          dispatch({ type: "SET_STYLE", field: "buttonWidth", value })
                        }
                        suffix="px"
                      />
                      <SliderControl
                        label="Button Height"
                        value={state.styles.buttonHeight}
                        min={36}
                        max={64}
                        onChange={(value) =>
                          dispatch({ type: "SET_STYLE", field: "buttonHeight", value })
                        }
                        suffix="px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Panel */}
          <div>
            <MobilePreview state={state} />
          </div>
        </div>
      </div>
    </div>
  );
}