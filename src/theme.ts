import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

import { StyleFunctionProps } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  config,
  styles: {
    global: (_props: StyleFunctionProps) => ({
      body: {
        bg: _props.colorMode == "light" ? "#F1F5F9" : "#394353",
        color: _props.colorMode == "light" ? "gray.500" : "whiteAlpha.700",
      },
    }),
  },
});

export default theme;
