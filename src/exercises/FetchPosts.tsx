import { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function FetchPosts() {
  // State for posts data
  const [posts, setPosts] = useState<Post[]>([]);

  // state for loading
  const [loading, setLoading] = useState(true);

  // state for error
  const [error, setError] = useState<string | null>(null);

  async function fetchPosts() {
    try {
      setLoading(true);

      // make API call
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );

      // check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // parse JSON
      const data = await response.json();

      // update state with data (only 10 posts)
      setPosts(data.slice(0, 10));
      setError(null);
    } catch (err) {
      const errMessage =
        err instanceof Error ? err.message : "An error occored";
      setError(errMessage);
      console.error("Error fetching posts: ", err);
    } finally {
      setLoading(false);
    }
  }

  // call function–
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      <button
        onClick={fetchPosts}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors mb-4"
      >
        {loading ? "Loading..." : "Refresh"}
      </button>
      {loading && <p>Loading posts...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800"
          >
            <h2 className="text-xl font-semibold mb-2">
              {post.id}. {post.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FetchPosts;
