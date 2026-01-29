import { useState } from "react";
import { createPaste } from "../api/pasteApi";
import ErrorMessage from "../components/ErrorMessage";
import Layout from "../components/Layout";
import PasteForm from "../components/PasteForm";
import PasteResult from "../components/PasteResult";

export default function CreatePaste() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  
  const handleCreate = async (payload) => {
    try {
      setLoading(true);
      setError("");
      setUrl("");

      const res = await createPaste(payload);
      setUrl(res.url);

    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-8 animate-fade-up">

        {/* LEFT – Paste Form */}
        <div className="md:col-span-3">
          <PasteForm onSubmit={handleCreate} loading={loading} />
        </div>

        {/* RIGHT – Info / Filler Content */}
        <div className="md:col-span-2 space-y-6">

          <div className="bg-slate-900/60 border border-slate-700
                          rounded-xl p-5">
            <h3 className="text-indigo-400 font-semibold mb-2">
              Why PasteBox?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Share text securely with automatic expiry and view limits.
              Perfect for code, notes, and temporary messages.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-700
                          rounded-xl p-5">
            <h3 className="text-emerald-400 font-semibold mb-2">
              Features
            </h3>
            <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
              <li>Time-based expiry</li>
              <li>View count limits</li>
              <li>Secure shareable links</li>
              <li>No login required</li>
            </ul>
          </div>

          <div className="bg-slate-900/60 border border-slate-700
                          rounded-xl p-5">
            <h3 className="text-violet-400 font-semibold mb-2">
              Tip 💡
            </h3>
            <p className="text-sm text-slate-300">
              Set both TTL and max views for extra privacy.
            </p>
          </div>

        </div>
      </div>

      {/* ERROR / RESULT */}
      <ErrorMessage message={error} />
      <PasteResult url={url} />

    </Layout>
  );
}
