const {app, BrowserWindow} = require("electron");

const createWindow = () =>{
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    });

    win.loadURL("https://pagtion.vercel.app/");
}

app.on("ready", () => {
    createWindow();
});