const { app, protocol } = require('electron');
const { createHandler } = require('next-electron-rsc');

const appPath = app.getAppPath();
const isDev = process.env.NODE_ENV === 'development';
const localhostUrl = 'http://localhost:3000'; // must match Next.js dev server

const { createInterceptor } = createHandler({
  standaloneDir,
  staticDir,
  localhostUrl,
  protocol,
});

if (!isDev) createInterceptor({ session: mainWindow.webContents.session });