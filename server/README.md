# ng-comp-life/server

This folder provides a sample Node.js server that serves an endpoint locally (e.g., should return data instantly if run locally), and the same data served with a delay to simulate a live environment.

## Install Dependencies

Install the server dependencies with npm or yarn:

```bash
# ng-comp-life/server
$ npm install
# or yarn install
```

## Serve

To start the server, run the following command from the root of the `ng-comp-life/server` folder containing your `server.js` file:

```bash
# ng-comp-life/server
$ node server
```

Alternatively, you could install [nodemon](https://nodemon.io/), which monitors the server for changes and restarts it automatically:

```bash
# ng-comp-life/server
$ npm install -g nodemon
$ nodemon server
```

> **Note:** To install `nodemon` globally, you may need to use `sudo` (Mac/Linux) or run your command prompt as Administrator (Windows).

## Usage

There are two simple `GET` endpoints available:

### GET `/api/dinosaurs`

Returns an array of dinosaur objects with the following type:

```js
{
  name: string;
  pronunciation: string;
  meaningOfName: string;
  diet: string;
  length: string;
  period: string;
  mya: string;
  info: string;
}
```

### GET `/api/delay/dinosaurs`

Returns the same array of dinosaur objects, but with a short delay to simulate a live environment when the Node server is run locally.
