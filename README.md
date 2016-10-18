# DaXControl
**Data Exploration Control**

This is a typescript application based on node.js with Express.

## Usage

If you start the app the first time you have to run
```
npm install
```

To start the app, execute the following:
```
npm start
```

Afterwards you can connect devices to the server by calling `server-ip:3000/` in a browser.
The debug view is reachable via `server-ip:3000/debug`.

## Setup in WebStorm
1. Load the root folder in WebStorm and open the *Project* tab.
2. Right-click on `package.json` and choose *Run 'npm install'*.
3. Open the settings menu and navigate to *TypeScript* under *Languages & Frameworks*.
    3.1 Set manually the typescript version (`node_modules -> typescript -> lib`)
    3.1 Check *Enable TypeScript compiler*.
    3.2 Check *Use tsconfig.json*.
4. Right-click on `package.json` and choose *Show npm scripts*.
    4.1 Right-click on *start and choose *Edit 'start' settings*.
    4.2 Click on the plus under *Before launch* and choose *Compile TypeScript*.
5. Start the app via WebStorm (top right).

**Currently, WebStorm is not bundled with Typescript 2.0!** You have to manually set the interpreter.

## Typescript in Frontend
In the frontend, we use browserify for bundling the javascript.
During the bundling, the typescript files are compiled (see *compileFrontend* script in `package.json`).
