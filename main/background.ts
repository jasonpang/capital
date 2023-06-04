import { app } from "electron";
import serve from "electron-serve";
import Store from "electron-store";
import { createWindow } from "./helpers";
import json5 from "json5";
import { ipcMain as ipc } from "electron-better-ipc";
import { AppConfig } from "../renderer/lib/models";
import path from "path";
import fs, { fstat } from "fs";

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

const defaultAppConfig: any = {
  titlebar: {
    title: "Capital",
    background: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 0px 2px rgba(0,0,0,0.24)",
    transform: "translateY(1px)",
    height: "30px",
    fontSize: "15px",
    titleHorizontalAlignment: "left",
  },
  sidebar: {
    background: "linear-gradient(#014CDB, #029BD8)",
  },
};

const fileStore = new Store({
  name: "capital",
  cwd: path.join(app.getPath("home"), "capital"),
  fileExtension: "conf",
  clearInvalidConfig: true,
  serialize: (value) => json5.stringify(value, null, "\t"),
  deserialize: (value) => json5.parse(value),
  watch: true,
  defaults: defaultAppConfig,
});

const resourceCache = {};

(async () => {
  ipc.answerRenderer("get-store", async () => {
    return fileStore.store;
  });
  ipc.answerRenderer("get-resource", async (path: string) => {
    if (!resourceCache[path]) {
      resourceCache[path] = fs.readFileSync(path, "utf8");
    }

    return resourceCache[path];
  });

  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }

  fileStore.onDidAnyChange(() => {
    ipc.callRenderer(mainWindow, "notify-store-changed", fileStore.store);
  });
})();

app.on("window-all-closed", () => {
  app.quit();
});
