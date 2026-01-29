import { useState } from "react";

export default function PasteForm({ onSubmit, loading }) {
  const [ttlValue, setTtlValue] = useState("");
  const [ttlUnit, setTtlUnit] = useState("seconds");

  const handleSubmit = (e) => {
    e.preventDefault();
    const f = e.target;

    let ttlSeconds = null;
    if (ttlValue) {
      const value = Number(ttlValue);
      if (ttlUnit === "minutes") ttlSeconds = value * 60;
      else if (ttlUnit === "hours") ttlSeconds = value * 3600;
      else ttlSeconds = value;
    }

    onSubmit({
      content: f.content.value,
      ttlSeconds,
      maxViews: f.views.value ? Number(f.views.value) : null
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up">

  
      <textarea
        name="content"
        placeholder="Paste your text here..."
        className="w-full h-80 p-6 rounded-xl
                   bg-slate-900 text-slate-100
                   font-mono text-sm leading-relaxed
                   border border-slate-700
                   focus:ring-2 focus:ring-indigo-500
                   outline-none resize-none"
        required
      />

      {/* Options Row (same layout style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* TTL with unit */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Expire after
          </label>

          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              placeholder="Time"
              value={ttlValue}
              onChange={(e) => setTtlValue(e.target.value)}
              className="w-2/3 p-3 rounded-lg
                         bg-slate-900 border border-slate-700
                         focus:ring-2 focus:ring-indigo-500
                         outline-none"
            />

            <select
              value={ttlUnit}
              onChange={(e) => setTtlUnit(e.target.value)}
              className="w-1/3 p-3 rounded-lg
                         bg-slate-900 border border-slate-700
                         focus:ring-2 focus:ring-indigo-500
                         outline-none"
            >
              <option value="seconds">Seconds</option>
              <option value="minutes">Minutes</option>
              <option value="hours">Hours</option>
            </select>
          </div>
        </div>

        {/* Max Views */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Maximum views
          </label>
          <input
            name="views"
            type="number"
            min="1"
            placeholder="Optional"
            className="w-full p-3 rounded-lg
                       bg-slate-900 border border-slate-700
                       focus:ring-2 focus:ring-indigo-500
                       outline-none"
          />
        </div>

      </div>

      {/* Submit Button (unchanged behavior) */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-xl font-semibold transition
          ${loading
            ? "bg-slate-600 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
      >
        {loading ? "Creating..." : "Create Paste"}
      </button>
    </form>
  );
}
