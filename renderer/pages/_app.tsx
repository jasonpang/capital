import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import type { AppProps } from "next/app";
import { ipcRenderer as ipc } from "electron-better-ipc";
import { useStore } from "../lib/store";
import { AppConfig } from "../lib/models";
import dynamic from "next/dynamic";
import { red } from "@material-ui/core/colors";
import { Titlebar, Color } from "custom-electron-titlebar";
import equal from "fast-deep-equal";
import { theme } from "../lib/theme";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const titlebarRef = useRef<Titlebar>();
  const appConfig: AppConfig = useStore((state) => state.appConfig);
  const setAppConfig = useStore((state) => state.setAppConfig);
  const store = useStore();
  const isFirstRunRef = useRef(true);
  const [isAppRenderReady, setIsAppRenderReady] = useState(false);

  const useGlobalStyles = makeStyles((theme) => ({
    "@global": {
      ".titlebar": {
        height: `${appConfig?.titlebar?.height} !important`,
        boxShadow: `${appConfig?.titlebar?.boxShadow} !important`,
      },
      ".window-title": {
        fontSize: `${appConfig?.titlebar?.fontSize} !important`,
        transform: `${appConfig?.titlebar?.transform} !important`,
      },
      ".window-controls-container": {
        position: `absolute !important`,
        right: `0 !important`,
      },
    },
  }));
  useGlobalStyles();

  async function onAppLoad() {
    setupIpc();
    await updateAppConfig();
  }

  async function onAppConfigChanged() {
    setupTitlebar();

    if (isFirstRunRef.current) {
      isFirstRunRef.current = false;
      setIsAppRenderReady(true);
    }
  }

  function setupIpc() {
    ipc.answerMain("notify-store-changed", async (updatedStore: AppConfig) => {
      setAppConfig(updatedStore);
    });
  }

  async function updateAppConfig() {
    const fileStore: AppConfig = await ipc.callMain("get-store");
    if (equal(fileStore, appConfig)) {
      return;
    }

    setAppConfig(fileStore);
    if (typeof window !== "undefined") {
      (window as any).store = useStore.getState();
    }
  }

  function setupTitlebar() {
    if (typeof window !== "undefined") {
      const { Titlebar, Color } = require("custom-electron-titlebar");
      console.log("Setting up Title bar. Current app config:", appConfig);
      titlebarRef.current = new Titlebar({
        backgroundColor: Color.fromHex(appConfig.titlebar.background),
        shadow: false,
        menu: null,
        titleHorizontalAlignment: appConfig.titlebar.titleHorizontalAlignment,
        unfocusEffect: false,
      });
      titlebarRef?.current.updateTitle(appConfig.titlebar.title);
      // Move the titlebar style to the beginning of <head> to allow CSS specificity overriding
      const titlebarStyleEl = document.querySelector("style.titlebar-style");
      document.querySelector("head").prepend(titlebarStyleEl);
    }
  }

  function onAppConfigChangedUnload() {
    return () => {
      if (titlebarRef?.current) {
        titlebarRef.current.dispose();
      }
    };
  }

  useEffect(() => {
    onAppLoad();
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && (appConfig as any)?._ready !== false) {
      onAppConfigChanged();

      return onAppConfigChangedUnload();
    }
  }, [appConfig]);

  if (!isAppRenderReady) {
    return null;
  }

  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>with-typescript-material-ui</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}
