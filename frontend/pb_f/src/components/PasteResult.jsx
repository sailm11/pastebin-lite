export default function PasteResult({ url }) {
  if (!url) return null;

  return (
    <div className="mt-8 p-5 bg-indigo-50 border border-indigo-100 rounded-xl">
      <p className="text-slate-700 font-medium mb-2">
        Your paste is ready 🎉
      </p>
      <a
        href={url}
        target="_blank"
        className="text-indigo-600 underline break-all"
      >
        {url}
      </a>
    </div>
  );
}
