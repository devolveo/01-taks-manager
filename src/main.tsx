import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PostsPage from "./pages/PostsPages.tsx";
import PostDetailPage from "./pages/PostDetailPage.tsx";

// import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import pages
import HomePage from "./pages/HomePage";
import TasksPage from "./pages/TasksPage";
import AboutPage from "./pages/AboutPage";
import Layout from "./components/Layout.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/posts" element={<PostsPage />} />
              <Route path="/posts/:id" element={<PostDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
