import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { NextPageWithLayout } from './page';
import { AppContextWrapper } from "../context/state";

import Seo from "../components/SEO/Seo"

import { wrapper, makeStore } from '../app/store'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../app/store/index";

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page);
  
  return getLayout(
    <AppContextWrapper>
      <Provider store={makeStore}>
        <PersistGate persistor={persistor} loading={null}>
          <Component {...pageProps} /> 
        </PersistGate>
      </Provider>  
    </AppContextWrapper>);
}
export default wrapper.withRedux(MyApp);