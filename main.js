const path = require("path");
const { app, BrowserWindow, Menu } = require("electron");

// Check if Mac for when app is closed
const isMac = process.platform === "darwin";
const isDev = process.env.NODE_ENV !== "development";

//Create the main window
function createMainWindows() {
  const mainWindow = new BrowserWindow({
    title: "Hello Window",
    width: isDev ? 1200 : 600,
    height: 1000,
  });
  // Open devtools if in dev mode
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
}

//Create about window
function createAboutWindow() {
  const aboutWindow = new BrowserWindow({
    title: "About image sizer",
    width: 300,
    height: 300,
  });
  mainWindow.loadFile(path.join(__dirname, "./renderer/about.html"));
}

//App is ready
app.whenReady().then(() => {
  createMainWindows();

  //Implement menu
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindows();
    }
  });
});

//Menu template
const menu = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: "About",
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  {
    role: "fileMenu",
  },
  ...(!isMac
    ? [
        {
          label: "Help",
          submenu: [
            {
              label: "About",
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  //   {
  //     label: "File",
  //     submenu: [
  //       {
  //         label: "Quit",
  //         click: () => app.quit(),
  //         accelerator: "Alt+F4",
  //       },
  //     ],
  //   },
];

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});
