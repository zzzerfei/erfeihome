import "./global.scss";
import type { AppProps, AppContext } from "next/app";
import App from "next/app";
import { ILayoutProps, Layout } from "@/components/layout";
import Head from "next/head";
import axios from "axios";
import { getIsMobile, getIsSupportWebp, LOCALDOMAIN } from "@/utils";
import { ThemeContextProvider } from "@/stores/theme";
import { LanguageContextProvider } from "@/stores/language";
import { UserAgentProvider } from "@/stores/userAgent";
export interface IComponentProps {
  isMobile?: boolean;
  isSupportWebp?: boolean;
}

const MyApp = (data: AppProps & ILayoutProps & IComponentProps) => {
  const {
    Component,
    pageProps,
    navbarData,
    footerData,
    isMobile,
    isSupportWebp,
  } = data;

  return (
    <div>
      <Head>
        <title>二肥的官网</title>
        <meta
          name="description"
          content={`二肥的官网 (${isMobile ? "Mobile" : "PC"})`}
        />
        <meta name="viewport" content="user-scalable=no" />
        <meta name="viewport" content="initial-scale=1,maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LanguageContextProvider>
        <ThemeContextProvider>
          <UserAgentProvider>
            <Layout navbarData={navbarData} footerData={footerData}>
              <Component
                {...pageProps}
                isMobile={isMobile}
                isSupportWebp={isSupportWebp}
              />
            </Layout>
          </UserAgentProvider>
        </ThemeContextProvider>
      </LanguageContextProvider>
    </div>
  );
};

MyApp.getInitialProps = async (context: AppContext) => {
  const pageProps = await App.getInitialProps(context);
  const { data = {} } = await axios.get(`${LOCALDOMAIN}/api/layout`);
  return {
    ...pageProps,
    ...data,
    isMobile: getIsMobile(context),
    isSupportWebp: getIsSupportWebp(context),
  };
};

export default MyApp;
