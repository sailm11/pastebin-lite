import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "./Layout";

export default function ViewPaste() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const API_BASE = "http://localhost:8081";

  useEffect(() => {
    if (!id) {
      setError("No paste ID provided");
      setLoading(false);
      return;
    }

    fetch(`${API_BASE}/api/pastes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Paste not found or expired");
        return res.json();
      })
      .then((data) => {
        setContent(data.content || "");
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center text-slate-400 animate-fade-up">
          Loading paste...
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center text-red-400 animate-fade-up">
          {error}
        </div>
      </Layout>
    );
  }

  const lines = content.split("\n").length;
  const chars = content.length;

  return (
    <Layout>
      <div className="animate-fade-up space-y-4">

        {/* Header / Actions */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg text-slate-300">
            Paste Viewer
          </h2>

          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-lg
                         bg-indigo-600 hover:bg-indigo-700
                         text-white text-sm transition"
            >
              {copied ? "Copied!" : "Copy"}
            </button>

            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-lg
                         bg-slate-700 hover:bg-slate-600
                         text-slate-200 text-sm transition"
            >
              New Paste
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 text-sm text-slate-400">
          <span>{lines} lines</span>
          <span>{chars} characters</span>
        </div>

        {/* Paste Content */}
        <pre
          className="bg-slate-900 text-slate-200
                     p-6 rounded-xl
                     border border-slate-700
                     font-mono text-sm
                     leading-relaxed
                     whitespace-pre-wrap"
        >
          {content}
        </pre>

      </div>
    </Layout>
  );
}
