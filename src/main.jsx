import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from 'react-router-dom'
import store from './store/store.js'
import {Home, Login, Signup, AddPost, AllPost, Post, EditPost} from './pages'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App/>}
    >
      <Route 
        index
        element={<Home/>}
      />
      <Route 
        path='/login'
        element={<Login/>}
      />
      <Route
        path='/signup'
        element={<Signup/>}
      />
      <Route
        path='/add-post'
        element={<AddPost/>}
      />
      <Route
        path='/all-post'
        element={<AllPost/>}
      />

      <Route
        path="/posts/:slug"
        element={<Post/>}
      />
      <Route
        path="/posts/edit/:slug"
        element={<EditPost/>}
      />
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
