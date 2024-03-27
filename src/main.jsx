import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/home/Home'
import SearchResult from './pages/searchResult/SearchResult'
import Details from './pages/details/Details'
import Explore from './pages/explore/Explore'
import PageNotFound from './pages/404/PageNotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/:mediaType/:id',
        element: <Details />,
      },
      {
        path: '/search/:query',
        element: <SearchResult />,
      },
      {
        path: '/explore/:mediaType',
        element: <Explore />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>

)
