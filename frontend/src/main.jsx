import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { store } from './store/store.js'
import { Provider } from "react-redux"
import "./App.css"

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Provider>
)
