import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

// Type for a post
type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

// fetch function for all posts
async function fetchPosts(): Promise<Post[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}

function PostsPage() {
  // Fetch the posts with React Query
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const debouncedSearch = useDebounce(searchTerm, 300);
  const message = location.state?.message;

  // Update URL only when debounced value differs from current URL
  useEffect(() => {
    const currentUrlSearch = searchParams.get("search") || "";

    if (debouncedSearch !== currentUrlSearch) {
      if (debouncedSearch) {
        setSearchParams({ search: debouncedSearch });
      } else {
        setSearchParams({});
      }
    }
  }, [debouncedSearch, setSearchParams, searchParams]);

  // Sync searchTerm when URL changes (back/forward navigation)
  useEffect(() => {
    const search = searchParams.get("search") || "";
    setSearchTerm(search);
  }, [searchParams]);

  const filteredPosts = posts?.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-400">
          Loading posts...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600 dark:text-red-400">
          Error loading posts. Please try again later.
        </div>
      </div>
    );
  }

  // success state
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          All Posts
        </h1>

        {message && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-green-800 dark:text-green-200">✓ {message}</p>
          </div>
        )}

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search post by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchTerm && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Found {filteredPosts?.length} posts matching "{searchTerm}"
            </p>
          )}
        </div>
        <div className="space-y-4">
          {filteredPosts?.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {post.body}
              </p>

              {/* Dynamic link - will navigate to /posts/1, /posts/2, etc. */}
              <Link
                to={`/posts/${post.id}`}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Read more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostsPage;
