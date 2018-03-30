# ng-comp-life/server

This folder provides a sample Node.js server that serves an endpoint locally (e.g., should return data instantly if run locally), and the same data served with a delay to simulate a live environment.

## Install Dependencies:

```bash
$ cd server
$ npm install
# or yarn install
```

## Serve

To start the server, run the following command from the root of the `ng-comp-life/server` folder containing your `server.js` file:

```bash
$ node server
```

Alternatively, you could install [nodemon](https://nodemon.io/), which monitors the server for changes and restarts it automatically:

```bash
$ npm install -g nodemon
$ nodemon server
```
