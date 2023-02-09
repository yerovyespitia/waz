import type { AppProps } from "next/app"
import Layout from "../components/Layout"
import { store } from "../states/store"
import { Provider } from "react-redux"
import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from "../utils/queryClient"

import "../styles/globals.css"

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </QueryClientProvider>
  )
}
