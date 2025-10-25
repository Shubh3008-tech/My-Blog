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
// --- THIS LINE IS CHANGED ---
import MyPosts from './pages/MyPosts.jsx' // Was AllPosts.jsx
// --- END OF CHANGE ---
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
        index: true, 
        element: <Home />,
      },
      {
        path: 'login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: 'signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      // --- THIS BLOCK IS CHANGED ---
      {
        path: 'my-posts', // Was 'all-posts'
        element: (
          <AuthLayout authentication>
            <MyPosts /> {/* Was <AllPosts /> */}
          </AuthLayout>
        ),
      },
      // --- END OF CHANGE ---
      {
        path: 'add-post',
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: 'edit-post/:slug',
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: 'post/:slug',
        element: <Post />,
      },
      {
        path: 'profile',
        element: (
          <AuthLayout authentication>
            <Profile />
          </AuthLayout>
        ),
      },
    ],
  },
], {
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