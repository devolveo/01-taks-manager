import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

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

        <div className="space-y-4">
          {posts?.map((post) => (
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
