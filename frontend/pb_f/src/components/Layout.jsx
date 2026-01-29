export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col items-center">

      {/* Header */}
      <header className="w-full py-8 text-center animate-fade-up">
        <h1 className="text-4xl font-bold tracking-wide text-indigo-400">
          PasteBox
        </h1>
        <p className="text-slate-400 mt-2">
          Share text beautifully. Forget it automatically.
        </p>
      </header>

      {/* Content Card */}
      <main className="w-full flex justify-center px-4 animate-fade-up">
        <div className="w-full max-w-3xl bg-slate-800/80
                        backdrop-blur-md rounded-2xl
                        shadow-2xl p-8">
          {children}
        </div>
      </main>

    </div>
  );
}
