import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import PostDetail from "./PostDetail";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface NewPost {
  title: string;
  body: string;
  userId: number;
}

interface UpdatePost {
  id: number;
  title: string;
  body: string;
}

async function updatePost(updatedPost: UpdatePost): Promise<Post> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

async function deletePost(postId: number): Promise<void> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    { method: "DELETE" }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}

async function createPost(newPost: NewPost): Promise<Post> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Step 1: Create the fetch function (outside component)
async function fetchPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.slice(0, 10);
}

function FetchPostsWithQuery() {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  // Step 2: Replace all useState and useEffect with ONE useQuery!
  const {
    data: posts,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 30 * 1000, // 30 seconds (for testing)
    gcTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: true, // Default, but let's be explicit
  });

  // Add mutation
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      console.log("Server returned:", newPost);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  // if post selected, show the detail view
  if (selectedPostId !== null) {
    return (
      <PostDetail
        postId={selectedPostId}
        onBack={() => setSelectedPostId(null)}
      />
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">
        Blog Posts (React Query)
        {isFetching && (
          <span className="text-blue-500 text-sm ml-2">🔄 Updating...</span>
        )}
      </h1>

      {/* post form */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h2 className="text-lg font-semibold mb-3">Create New Post</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const title = formData.get("title") as string;
            const body = formData.get("body") as string;

            createPostMutation.mutate({
              title,
              body,
              userId: 1,
            });

            e.currentTarget.reset(); // clear form
          }}
          className="space-y-3"
        >
          <input
            type="text"
            name="title"
            placeholder="Post title..."
            required
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
          />
          <textarea
            name="body"
            placeholder="Post content..."
            required
            rows={3}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
          ></textarea>
          <button
            type="submit"
            disabled={createPostMutation.isPending}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {createPostMutation.isPending ? "Creating..." : "Create Post"}
          </button>

          {createPostMutation.isError && (
            <p className="text-red-500 text-sm">
              Error: {createPostMutation.error.message}
            </p>
          )}

          {createPostMutation.isSuccess && (
            <p className="text-green-500 text-sm">
              ✅ Post created! (ID: {createPostMutation.data?.id})
            </p>
          )}
        </form>
      </div>
      {/* Loading state */}
      {isLoading && <p>Loading posts...</p>}

      {/* Error state */}
      {isError && (
        <p className="text-red-500">
          Error: {error instanceof Error ? error.message : "An error occurred"}
        </p>
      )}

      {/* Post lists */}
      <div className="space-y-4">
        {posts?.map((post) => (
          <div
            key={post.id}
            className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800"
          >
            <div className="flex items-start justify-between">
              <div
                onClick={() => setSelectedPostId(post.id)}
                className="flex-1 cursor-pointer hover:opacity-80"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {post.id}. {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                  {post.body}
                </p>
                <p className="text-blue-500 text-sm mt-2">
                  Click to read more →
                </p>
              </div>

              {/* NEW: Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Don't trigger post click
                  if (window.confirm(`Delete post "${post.title}"?`)) {
                    deletePostMutation.mutate(post.id);
                  }
                }}
                disabled={deletePostMutation.isPending}
                className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400 text-sm"
              >
                {deletePostMutation.isPending ? "..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FetchPostsWithQuery;
