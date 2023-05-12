import store from '@/store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

const storeInstance = store();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={storeInstance}>
      <Component {...pageProps} />
    </Provider>
  );
}