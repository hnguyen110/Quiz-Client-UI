import "antd/dist/antd.css";
import "../styles/tailwind.css";
import type {AppProps} from "next/app";
import Layout from "../components/utilities/layout/layout";

function App({Component, pageProps}: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default App;
