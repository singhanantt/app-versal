export default function ColorPicker({
  label,
  value,
  onChange,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <label className="text-sm font-medium text-slate-700">
          {label}
        </label>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">
            {value}
          </span>

          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 w-12 cursor-pointer rounded border border-slate-300"
          />
        </div>
      </div>
    </div>
  );
}