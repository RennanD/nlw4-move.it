import '../styles/global.css';

import { AppProvider } from '../hooks';

function MyApp({ Component, pageProps }) {

  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
