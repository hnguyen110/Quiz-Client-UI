import "antd/dist/antd.css";
import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import Layout from "../components/utilities/layout/layout";
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/utilities/navbar/navbar";

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Navbar />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default App;
