# ng-comp-life

This repo contains the Node back end (`server`). The Angular front end is located at [ng-comp-life-client](https://github.com/kmaida/ng-comp-life-client).

## Setup

Clone the necessary repos (this repo, which contains the server, and the client repo which contains the Angular application):

```bash
git clone https://github.com/kmaida/ng-comp-life.git
cd ng-comp-life
npm install
git clone https://github.com/kmaida/ng-comp-life-client.git client
cd client
npm install
```

## Serve

```bash
# ng-comp-life (root folder containing both server and client folders)
npm run start
```

Server runs on `http://localhost:3005` and Angular app runs on `http://localhost:4200`.

## License

[MIT](LICENSE) © Kim Maida 2018