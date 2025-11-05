import { useQuery } from "@tanstack/react-query";
import { useParams, Link, useNavigate } from "react-router-dom";

// type for single post
type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

// Fetch single post by id
async function fetchPostById(id: string): Promise<Post> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  return response.json();
}

function PostDetailPage() {
  // Step 1: Extract id from URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Step 2: Fetch post using that id
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id!),
  });

  // Step 3: Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-400">
          Loading post...
        </div>
      </div>
    );
  }

  // Step 4: Error state
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600 dark:text-red-400">
          Error loading post. Please try again later.
        </div>
      </div>
    );
  }

  // Step 5: Success - Display post details
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/posts"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
        >
          ← Back to Posts
        </Link>

        <button
          onClick={() => {
            if (confirm("Delete this post?")) {
              // alert("Post deleted! redirecting...");
              navigate("/posts", {
                state: { message: "Post deleted successfully" },
              });
            }
          }}
          className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Delete Post
        </button>
        {/* Post content */}
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {post?.title}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            {post?.body}
          </p>
        </article>
      </div>
    </div>
  );
}
export default PostDetailPage;
