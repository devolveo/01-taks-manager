# React Router Session 1 - Foundations

## 1. Why React Router?

### The Problem Without React Router

Before React Router, navigating between pages had major issues:

- **Full page refresh** - Every navigation reloaded the entire page
- **Fetch from server** - Had to download the whole page from server again
- **White screen blink** - Users saw a white flash between pages
- **Poor user experience** - Felt slow and clunky

**The manual approach would require:**

- Managing URL changes with `window.location`
- Listening to browser history events
- Complex state management for current page
- Building routing logic from scratch

### What is SPA (Single Page Application)?

**SPA is an application that navigates through pages like it's the same page:**

- ✅ No blinking/white screen
- ✅ No refetching the whole page from server
- ✅ Smooth, instant transitions
- ✅ Feels like a native mobile app

**Traditional Website:**

```
Page 1 → [RELOAD] → Page 2 → [RELOAD] → Page 3
        (White flash)       (White flash)
```

**SPA with React Router:**

```
Page 1 → [Smooth] → Page 2 → [Smooth] → Page 3
       (No reload)        (No reload)
```

---

### Why SPA is Faster

**SPA already has everything it needs:**

- All JavaScript, CSS, React code loaded once
- Just **mounts and unmounts components** (swap content)
- No downloading the whole page from server
- React updates only what changed

**Traditional:** Download everything → Display → Download again → Display
**SPA:** Download once → Swap components → Swap components → Swap components

**Result:** Instant navigation! ⚡

---

## 2. Core Components

### BrowserRouter

**Purpose:** A component provided by react-router-dom library that enables routing in a React app.

**Where to use:** Wrap around your entire app (usually in `main.tsx`)

```typescript
import { BrowserRouter } from "react-router-dom";

<BrowserRouter>{/* Your entire app with routing goes here */}</BrowserRouter>;
```

**Key point:** BrowserRouter must be the parent of all routing components (Routes, Route, Link, NavLink).

---

### Routes and Route

**Routes:** Container that decides which route to display based on current URL

**Route:** Represents one single page or path in an app

**How they work together:**

```typescript
<Routes>
  <Route path="/" element={<HomePage />} /> // Route 1
  <Route path="/tasks" element={<TasksPage />} /> // Route 2
  <Route path="/about" element={<AboutPage />} /> // Route 3
</Routes>
```

**The flow:**

1. User navigates to URL (e.g., `/tasks`)
2. Routes looks at all Route components
3. Routes finds matching `path`
4. Routes displays that Route's `element`

**Only ONE Route displays at a time!**

---

### Link vs NavLink

**Both are for navigation**, but with different use cases:

#### Link

- **Use for:** Simple links inside text or basic navigation
- **Example:** "Read more about our [project](#)"
- **Features:** Just navigation, no active state

```typescript
<Link to="/tasks">Go to Tasks</Link>
```

#### NavLink

- **Use for:** Navigation bars and menus
- **Why:** Has active styling (knows when it's the current page)
- **Features:** Navigation + active state detection

```typescript
<NavLink
  to="/tasks"
  className={({ isActive }) => (isActive ? "active-style" : "normal-style")}
>
  Tasks
</NavLink>
```

**Rule of thumb:**

- Navigation menu → Use **NavLink**
- Link in paragraph → Use **Link**

---

## 3. Setup and Configuration

### Installation

**Command:**

```bash
pnpm add react-router-dom
```

**What we installed:** React Router v7 (react-router-dom package)

**Note:** If you get a pnpm warning about build scripts, it's safe to ignore - React Router will work fine!

---

### main.tsx Structure

**Correct nesting order (outside → inside):**

```typescript
<QueryClientProvider>
  <ErrorBoundary>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </ErrorBoundary>
  <ReactQueryDevtools /> // Outside router (for all pages)
</QueryClientProvider>
```

1. Outermost - Provides React Query
2. Catches errors from all routes
3. Enables routing
4. Contains route definitions

**Why this order matters:**

- QueryClientProvider must wrap everything (provides React Query to all components)
- BrowserRouter enables routing features
- ErrorBoundary catches errors from any page
- Routes contains individual route definitions

---

### Project Structure

**Folder organization:**

```
src/
├── components/           ← Regular reusable components
│   ├── Navigation.tsx
│   └── ErrorBoundary.tsx
├── pages/                ← Page components (one per route)
│   ├── HomePage.tsx     ← Route: /
│   ├── TasksPage.tsx    ← Route: /tasks
│   └── AboutPage.tsx    ← Route: /about
├── hooks/
├── exercises/
├── notes/
├── App.tsx              ← Task Manager component
└── main.tsx             ← Router configuration here
```

**Naming convention:**

- Pages: `HomePage.tsx`, `TasksPage.tsx` (always end with "Page")
- Components: `Navigation.tsx`, `Button.tsx` (functional names)

---

## 4. Navigation Component

### The isActive Property

**What it tells us:** If the current URL path is the same as the `to` attribute value

```typescript
// Current URL: /tasks

<NavLink to="/tasks">    // isActive = true ✅
<NavLink to="/about">    // isActive = false ❌
<NavLink to="/">         // isActive = false ❌
```

**How React Router determines it:**

- Compares `window.location.pathname` with NavLink's `to` prop
- Exact match → `isActive = true`
- No match → `isActive = false`

---

### Why className is a Function

**Purpose:** To style the link conditionally based on active state

```typescript
// ❌ Can't do this (static string):
<NavLink to="/tasks" className="text-gray-700" />

// ✅ Must do this (function):
<NavLink
  to="/tasks"
  className={({ isActive }) =>
    isActive ? "text-blue-600 font-bold" : "text-gray-700"
  }
/>
```

**The function receives:** `{ isActive, isPending, isTransitioning }`

**Returns:** String of CSS classes based on state

**Why it's powerful:**

- Dynamic styling without extra JavaScript
- Automatic updates when URL changes
- Clean, declarative code

---

### Active vs Inactive Styling

**Active link (current page):**

- **Blue color** - Visually highlighted (`text-blue-600`)
- **Bold font** - Stands out (`font-bold`)
- **Bottom border** - Underline effect (`border-b-2`)
- Purpose: Shows "You are here"

**Inactive link (other pages):**

- **Gray color** - More subtle (`text-gray-700`)
- **Normal weight** - Less prominent (`font-medium`)
- **No border** - Clean look
- **Hover effect** - Blue on hover to show it's clickable
- Purpose: Shows accessible but not current

```typescript
<NavLink
  to="/tasks"
  className={({ isActive }) =>
    isActive
      ? "text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600"
      : "text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium"
  }
>
  Tasks
</NavLink>
```

---

### Complete Navigation Pattern

```typescript
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-8 h-16 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-bold border-b-2"
                : "text-gray-700 hover:text-blue-600"
            }
          >
            Home
          </NavLink>
          {/* Repeat for other links */}
        </div>
      </div>
    </nav>
  );
}
```

---

## Section 5: Key Concepts Summary

This is a quick comparison section. Fill in this table in your words:

### Prompt (Fill the table):

**Compare Link vs NavLink:**

| Feature                | Link        | NavLink                |
| ---------------------- | ----------- | ---------------------- |
| Navigation             | Yes         | Yes                    |
| Page reload            | No          | No                     |
| Active state detection | No          | Yes                    |
| className function     | No          | Yes                    |
| Best use case          | a text link | navigation bar or menu |

## 5. Key Concepts Summary

### Link vs NavLink Comparison

| Feature                | Link        | NavLink                |
| ---------------------- | ----------- | ---------------------- |
| Navigation             | Yes         | Yes                    |
| Page reload            | No          | No                     |
| Active state detection | No          | Yes                    |
| className function     | No          | Yes                    |
| Best use case          | A text link | Navigation bar or menu |

---

### When to Use Each

#### Use Link when:

- Simple link inside text or content
- Don't need to show which page is active
- One-time navigation (buttons, cards, etc.)

**Example:**

```typescript
<p>
  Check out our <Link to="/about">about page</Link> for more info.
</p>
```

#### Use NavLink when:

- Navigation bar or menu
- Need active state styling
- Want to highlight current page
- Multiple navigation options

**Example:**

```typescript
<nav>
  <NavLink to="/">Home</NavLink>
  <NavLink to="/tasks">Tasks</NavLink>
  <NavLink to="/about">About</NavLink>
</nav>
```

---

### Other React Router Properties

**What NavLink's className function receives:**

```typescript
className={({ isActive, isPending, isTransitioning }) => {
  // isActive: Is this the current route? (most used!)
  // isPending: Is navigation to this route loading?
  // isTransitioning: Is route transitioning? (v7+)
}}
```

**Most commonly used:** `isActive` (we used this today!)

---

### SPA Navigation Flow

**What happens when you click a NavLink:**

```
1. User clicks NavLink
   ↓
2. React Router intercepts click (preventDefault)
   ↓
3. React Router updates URL (no server request!)
   ↓
4. Routes component sees URL changed
   ↓
5. Routes unmounts current page component
   ↓
6. Routes mounts new page component
   ↓
7. Browser history updated (back button works!)
   ↓
8. Page displays instantly ⚡
```

**All in milliseconds! No white flash!**

---

## 6. Code Snippets Library

### Pattern 1: Route Setup (main.tsx)

```typescript
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TasksPage from "./pages/TasksPage";
import AboutPage from "./pages/AboutPage";

<BrowserRouter>
  <ErrorBoundary>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  </ErrorBoundary>
</BrowserRouter>;
```

---

### Pattern 2: Navigation Component

```typescript
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-8 h-16 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-bold border-b-2"
                : "text-gray-700 hover:text-blue-600"
            }
          >
            Home
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
```

---

### Pattern 3: Page Component

```typescript
import Navigation from "../components/Navigation";

function HomePage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Page content here */}
        </div>
      </div>
    </>
  );
}

export default HomePage;
```

---

### Pattern 4: Simple Link in Content

```typescript
import { Link } from "react-router-dom";

<p className="text-gray-600">
  Want to see all tasks? Visit our{" "}
  <Link to="/tasks" className="text-blue-600 hover:underline">
    tasks page
  </Link>
  .
</p>;
```

---

## 7. Quick Reference

- Common patterns
- Tips and mistakes to avoid

```

```
