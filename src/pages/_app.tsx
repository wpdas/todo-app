import Head from "next/head";
import Providers from "./providers";
import "./globals.css";

const MyApp = ({
  Component,
  pageProps,
}: {
  Component: React.JSX.ElementType;
  pageProps: any;
}) => {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
};

export default MyApp;
