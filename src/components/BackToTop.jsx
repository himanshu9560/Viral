import { useEffect, useState } from "react";

const BackToTop = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      const maxScroll = scrollHeight - clientHeight;
      const percent =
        maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

      setProgress(Math.min(100, Math.max(0, percent)));
      setVisible(scrollTop > 200);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full
                 flex items-center justify-center
                 shadow-xl transition-all duration-300 hover:scale-110"
      style={{
        background: `conic-gradient(#f97316 ${progress}%, #262626 0)`,
      }}
      aria-label="Back to top"
    >
      {/* 🔥 INNER CIRCLE (KEY FIX) */}
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-orange-500 text-lg font-bold">
        ↑
      </span>
    </button>
  );
};

export default BackToTop;
