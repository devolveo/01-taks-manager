import { useQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostDetailProps {
  postId: number;
  onBack: () => void;
}

async function fetchPost(postId: number): Promise<Post> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

function PostDetail({ postId, onBack }: PostDetailProps) {
  const {
    data: post,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery<Post>({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId),
    staleTime: 60 * 1000,
  });

  return (
    <div className="p-8">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        ← Back to List
      </button>

      <h1 className="text-2xl font-bold mb-4">
        Post Details
        {isFetching && (
          <span className="text-blue-500 text-sm ml-2">🔄 Updating...</span>
        )}
      </h1>

      {isLoading && <p>Loading post...</p>}

      {isError && (
        <p className="text-red-500">
          Error: {error instanceof Error ? error.message : "An error occurred"}
        </p>
      )}

      {post && (
        <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4">{post.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{post.body}</p>
          <p className="text-sm text-gray-500">
            Post ID: {post.id} | User ID: {post.userId}
          </p>
        </div>
      )}
    </div>
  );
}

export default PostDetail;
