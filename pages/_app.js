import Layout from "@/components/Layout";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </SessionProvider>
  );
}
