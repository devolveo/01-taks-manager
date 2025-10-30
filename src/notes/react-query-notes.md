# React Query - Week 4, Day 2 Notes

## 1. Why React Query?

### Problems it solves:

React Query solves three major problems:

1. **State Management** - No need for multiple useState/useEffect
2. **Caching** - Automatic data caching and reuse
3. **Data Synchronization** - Kepps app data in sync with the servers

### Server State vs Client State:

**Server State:**

- Data that lives on the server or external source
- Example: API data, database records, user lists, posts
- Changes outside our control
- Needs fetching and synchronization

**Client State:**

- Data that lives only in the app
- Example: dark mode, form inputs, UI toggles, selected tabs
- Fully controlled by the app
- No fetching needed

### The #1 Game Changer

React Query simplifies the synchronization mechanism - it keep the app data automatically in sync with the server data without manual management.

## 2. Core Concepts

### useQuery - Reading Data

**Basic Syntax:**

```typescript
const { data, isLoading, isError, error } = useQuery({
  queryKey: ["posts"],
  queryFn: fetchFn,
});
```

**Properties Explained:**
| Property | Description |
|----------|-------------|
| `data` | The return value from queryFn (the fetched data) |
| `isLoading` | True when fetching data for the first time (no cache) |
| `isError` | True when there is an error when fetching data |
| `error` | Contains the error object with error details |

### Query Keys

**Purpose:**

- **Unique identifier** - Each unique key creates a separate cache entry
- **Parameters** - Pass dynamic values like IDs or filters
- **Cache organization** - Works like a file path structure

**Examples:**

```typescript
["posts"][("posts", 1)][("posts", 2)][("users", 5, "posts")]; // All posts - one cache entry // Post #1 - separate cache entry // Post #2 - separate cache entry // User 5's posts - another cache entry
```

**Key Rule:** Different keys = Different cache entries!

---

## 3. Caching Lifecycle

### The Four States

```
[FRESH → STALE → INACTIVE → DELETED]
```

**State Transitions:**

1. **FRESH → STALE**

   - When: observers > 0 AND time since fetch > staleTime
   - Data is still shown, but will refetch on triggers

2. **STALE → INACTIVE**

   - When: observers = 0 (no components using it)
   - Data stays in cache but not actively used

3. **INACTIVE → DELETED**
   - When: Time since becoming inactive > gcTime
   - Data removed from memory (garbage collected)

### Configuration options

**staleTime**

- **Controls:** The validity of data (when data is recognized as old)
- **Default:** 0ms (instantly stale)
- **Example:** Stock data is always stale (refreshed every second)

```typescript
staleTime: 0; // Always refetch
```

**gcTime:**

- **Controls:** When to delete cache (countdown starts when observers = 0)
- **Default:** 5 minutes (300,000ms)
- **Example:** Stock data deleted 1 minute after no observers

```typescript
gcTime: 1 * 60 * 1000; // Delete after 1 min inactive
```

### Common Configurations

```typescript
// User Profile (rarely changes)
staleTime: 30 * 60 * 1000,  // Fresh for 30 minutes
gcTime: 60 * 60 * 1000      // Keep for 1 hour

// Real-time Data (always fresh)
staleTime: 0,               // Always stale
gcTime: 1 * 60 * 1000       // Delete quickly

// Blog Posts (moderate)
staleTime: 5 * 60 * 1000,   // Fresh for 5 minutes
gcTime: 10 * 60 * 1000      // Keep for 10 minutes
```

### Other Important Options

**refetchOnWindowFocus:**

- **Default:** `true`
- **Purpose:** Refetch stale data when user returns to browser tab
- **Use case:** Keep data fresh when user switches back

```typescript
refetchOnWindowFocus: true; // Auto-refresh on tab focus
```

**refetchOnMount:**

- **Default:** `true`
- **Purpose:** Refetch stale data when component mounts
- **Use case:** Ensure fresh data when navigating back to page

```typescript
refetchOnMount: true; // Refetch when component appears
```

**refetchOnReconnect:**

- **Default:** `true`
- **Purpose:** Refetch stale data when internet reconnects
- **Use case:** Update data after network issues

```typescript
refetchOnReconnect: true; // Refetch after internet back
```

**enabled:**

- **Default:** `true`
- **Purpose:** Conditionally enable/disable query
- **Use case:** Don't fetch until user is logged in

```typescript
enabled: !!userId; // Only fetch if userId exists
```

**retry:**

- **Default:** `3`
- **Purpose:** Number of retry attempts on failure
- **Use case:** Retry failed requests automatically

```typescript
  retry: 3,           // Retry 3 times
  retryDelay: 1000    // Wait 1 second between retries
```

**Complete Example:**

```typescript
const { data, isLoading } = useQuery({
  queryKey: ["posts"],
  queryFn: fetchPosts,
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
  refetchOnWindowFocus: true,
  refetchOnMount: true,
  retry: 3,
  enabled: isLoggedIn,
});
```

## 4. Mutations - Changing Data

### useQuery vs useMutation

| Feature      | useQuery                                                             | useMutation                                       |
| ------------ | -------------------------------------------------------------------- | ------------------------------------------------- |
| Purpose      | Used for fetching data from the server (GET)                         | Used for create, update and delete data on server |
| Runs         | Automatically when component mount or based on the option properties | Triggered manually                                |
| Caches data? | Automatically cached                                                 | No cache                                          |

### Why Mutations Don't Cache

Mutations are **actions**, not **data to display**:

- Creating a post → One-time action
- Updating a post → One-time action
- Deleting a post → One-time action

No need to cache actions!

### Basic Mutation Syntax

```typescript
const createPostMutation = useMutation({
  mutationFn: createPost,
  onSuccess: () => {
    // Invalidate to refetch latest data
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  },
});

// Trigger the mutation
createPostMutation.mutate({ title: "New Post", body: "Content" });
```

### Mutation Properties

```typescript
const mutation = useMutation({ ... });

// Properties available:
mutation.isPending   // Is mutation in progress?
mutation.isError     // Did mutation fail?
mutation.isSuccess   // Did mutation succeed?
mutation.error       // Error object (if failed)
mutation.data        // Response from server
mutation.mutate()    // Function to trigger mutation
```

### Query Invalidation Pattern

**Why invalidate?**
After mutating data on the server, we need to refetch to get the latest values.

```typescript
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ["posts"] });
};
```

**What happens:**

1. Mutation succeeds ✅
2. Mark `["posts"]` as STALE
3. Trigger automatic refetch
4. UI updates with latest server data

### Complete CRUD Example

```typescript
// CREATE
const createMutation = useMutation({
  mutationFn: createPost,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  },
});

// UPDATE
const updateMutation = useMutation({
  mutationFn: updatePost,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  },
});

// DELETE
const deleteMutation = useMutation({
  mutationFn: deletePost,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  },
});
```

**Pattern:** All mutations invalidate queries after success!

## 5. Code Snippets - Quick Reference

### Setup (main.tsx)

```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
```

### Basic Query

```typescript
const { data, isLoading, isError, error } = useQuery({
  queryKey: ["posts"],
  queryFn: fetchPosts,
});
```

### Query with Full Options

```typescript
const { data, isLoading, isFetching } = useQuery({
  queryKey: ["posts"],
  queryFn: fetchPosts,
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes
  refetchOnWindowFocus: true,
  refetchOnMount: true,
  retry: 3,
  enabled: true,
});
```

### Dynamic Query (with ID)

```typescript
const { data: post } = useQuery({
  queryKey: ["posts", postId],
  queryFn: () => fetchPost(postId),
  staleTime: 60 * 1000,
});
```

### Mutation with Invalidation

```typescript
const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: createPost,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  },
});

// Trigger mutation
mutation.mutate({ title: "New Post", body: "Content" });
```

### Complete Component Example

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function Posts() {
  const queryClient = useQueryClient();

  // Fetch posts
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 30 * 1000,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```
