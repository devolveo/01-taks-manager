import React from "react";
import Navigation from "./Navigation";

function HomePage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to My Learning Platform!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            This is a multiple page React application built with React Router.
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              What's Inside:
            </h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Task Manager - Full CRUD app with dark mode</li>
              <li>Post Explorer - React Query + API integration</li>
              <li>About Page - Learn about this project</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
