import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ContextProvider } from "../sections/provider";
import theme from "../sections/theme";
import "../sections/theme/styles.css";
import { ToastBar, Toaster } from "react-hot-toast";
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <ContextProvider>
        <Toaster />
        <Component {...pageProps} />
      </ContextProvider>
    </ChakraProvider>
  );
};

export default App;
