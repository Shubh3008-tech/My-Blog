import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from './components/index.js'
import { ThemeProvider } from './contexts/ThemeContext.js'

// Import Pages
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import Profile from './pages/Profile.jsx'

// Define the router
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, // <-- CHANGED
        element: <Home />,
      },
      {
        path: 'login', // <-- CHANGED (no leading slash)
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: 'signup', // <-- CHANGED (no leading slash)
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: 'all-posts', // <-- CHANGED (no leading slash)
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: 'add-post', // <-- CHANGED (no leading slash)
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: 'edit-post/:slug', // <-- CHANGED (no leading slash)
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: 'post/:slug', // <-- CHANGED (no leading slash)
        element: <Post />,
      },
      {
        path: 'profile', // <-- CHANGED (no leading slash)
        element: (
          <AuthLayout authentication>
            <Profile />
          </AuthLayout>
        ),
      },
    ],
  },
], {
  // This basename is correct and stays
  basename: "/My-Blog"
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)