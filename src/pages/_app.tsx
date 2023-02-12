import type { AppProps } from "next/app"
import Layout from "../components/Layout"
import { store } from "../states/store"
import { Provider } from "react-redux"

import "../styles/globals.css"

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
