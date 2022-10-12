import { app } from "electron";
import serve from "electron-serve";
import { Logger } from "sass";
import { createWindow } from "./helpers";

const log = require("electron-log");
var kill = require("tree-kill");
const findPidFromPort = require("find-pid-from-port");

const isProd = process.env.NODE_ENV === "production";

const BACKEND_PORT = 1111;

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    // width: 1600,
    // height: 1000,
    fullscreen: true,
    frame: false,
  });

  if (isProd) {
    log.info(`Starting the spring boot app in port ${BACKEND_PORT}`);
    var pid;
    var jarPath =
      "C:\\JarPaths\\escobar-systems\\libs\\escobar-systems-0.0.1-SNAPSHOT.jar";
    var child = require("child_process").spawn("java", [
      "-jar",
      jarPath,
      `--server.port=${BACKEND_PORT}`,
    ]);

    while (true) {
      try {
        pid = await findPidFromPort(BACKEND_PORT);
        break;
      } catch (error) {}
    }

    await mainWindow.loadURL("app://./home.html");

    mainWindow.on("closed", function () {
      log.info("Closing this PID: ", pid.tcp[0]);
      kill(pid.tcp[0]);
    });
  } else {
    // log.info(`Starting the spring boot app in port ${BACKEND_PORT}`);
    // var pid;
    // var jarPath = app.getAppPath() + '\\IMS-0.0.1-SNAPSHOT.jar';
    // var jarPath = 'C:\\JarPaths\\IMS-0.0.1-SNAPSHOT.jar';
    // log.info(`Jar Path: ${jarPath}`);
    // var child = require('child_process').spawn(
    //   'java', ['-jar', jarPath, `--server.port=${BACKEND_PORT}`]
    // );

    // while(true){
    //   try{
    //     pid = await findPidFromPort(BACKEND_PORT);
    //     break;
    //   } catch(error){
    //   }
    // }

    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();

    // mainWindow.on('closed', function () {
    //   log.info("Closing this PID: ", pid.tcp[0]);
    //   kill(pid.tcp[0]);
    // })
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});
