import { Plus, Trash2 } from "lucide-react";

export default function DynamicOptions({ options, onAdd, onUpdate, onDelete }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800">Dynamic Feedback Options</h3>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={16} />
          Add Option
        </button>
      </div>

      <div className="space-y-3">
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              value={option}
              onChange={(e) => onUpdate(index, e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => onDelete(index)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:text-red-600"
              aria-label="Delete option"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}