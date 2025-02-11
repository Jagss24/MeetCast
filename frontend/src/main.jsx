import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { store } from './store/store.js'
import { Provider } from "react-redux"
import "./App.css"
import AppProvider from './AppProvider.jsx'
import queryClient from './queryConfig/queryClient.config.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <AppProvider />
    </QueryClientProvider>
  </Provider>
)
