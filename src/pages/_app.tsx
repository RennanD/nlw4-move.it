import '../styles/global.css';

import { AppProvider } from '../hooks';

function MyApp({ Component, pageProps }) {

  return (

    <Component {...pageProps} />

  );
}

export default MyApp;
