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

const defaultAppConfig: any = {};

const fileStore = new Store({
  name: "capital",
  cwd: path.join(app.getPath("home"), "capital"),
  fileExtension: "conf",
  clearInvalidConfig: false,
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
