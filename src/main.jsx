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
import {AuthLayout} from './components'

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
        element={
          <AuthLayout>
            <Login/>
          </AuthLayout>
        }
      />
      <Route
        path='/signup'
        element={
          <AuthLayout>
            <Signup/>
          </AuthLayout>
        }
      />
      <Route
        path='/add-post'
        element={
          <AuthLayout authentication>
            <AddPost/>
          </AuthLayout>
        }
      />
      <Route
        path='/all-post'
        element={
          <AuthLayout authentication>
            <AllPost/>
          </AuthLayout>
        }
      />

      <Route
        path="/posts/:slug"
        element={
          <AuthLayout authentication>
            <Post/>
          </AuthLayout>
        }
      />
      <Route
        path="/posts/edit/:slug"
        element={
        <AuthLayout authentication>
          <EditPost/>
        </AuthLayout>
        }
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
