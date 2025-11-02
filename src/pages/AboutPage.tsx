function AboutPage() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About This Project
          </h1>
          <p className="text-lg dark:text-gray-300 mb-6">
            This is my learning journey to become a full-stack developer!
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Tech Stack:
            </h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>⚛️ React 19 with TypeScript</li>
              <li>🎨 Tailwind CSS</li>
              <li>🔄 TanStack Query (React Query)</li>
              <li>🧭 React Router v7</li>
              <li>⚡ Vite</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <p className="text-gray-700 dark:text-gray-300">
              📚 Currently in Week 4 of my full-stack roadmap, learning React
              Router!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
