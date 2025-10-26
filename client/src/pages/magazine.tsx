import { useLanguage } from "@/contexts/LanguageContext";

// Temporary Magazine Placeholder - Original has duplicate TypeScript keys
// Will be fixed in Day 2
export default function Magazine() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.magazineTitle || "Breslov Magazine"}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {t.magazineSubtitle || "Coming Soon"}
          </p>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            The Magazine section is currently being updated with new content.
          </p>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            In the meantime, explore our other sections:
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/store"
              className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            >
              {t.store || "Store"}
            </a>
            <a
              href="/downloads"
              className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            >
              {t.downloads || "Downloads"}
            </a>
            <a
              href="/breslov-wisdom"
              className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            >
              {t.breslovWisdom || "Breslov Wisdom"}
            </a>
            <a
              href="/"
              className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {t.home || "Home"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
