# sample-auth0-nodeserver

This repo provides a sample Node.js server with [Auth0](https://auth0.com) authentication and admin roles.

It is important to note that any front-end client using this server must also authenticate with Auth0 and send the user's access token in the request header when requesting protected resources:

```
header: 'Bearer jwtAccessToken-goes-here'
```

This server is intended to be used in conjunction with the [Auth0 Angular Workshop](https://kmaida.gitbooks.io/auth0-angular-workshop/content/) and [sample-auth0-angular](https://github.com/kmaida/sample-auth0-angular) repository.

## Dependencies

* [Node.js](https://nodejs.org)
* A package manager: suggest [npm](https://npmjs.com) (which comes with Node) or [Yarn](https://yarnpkg.com)
* A free [Auth0 account](https://auth0.com/signup)

## Setup

Clone the repo:

```bash
$ git clone https://github.com/kmaida/sample-auth0-nodeserver.git
```

Install dependencies:

```bash
$ cd sample-auth0-nodeserver
$ npm install
# or yarn install
```

## Auth0 API

Log into your [Auth0 Dashboard](https://manage.auth0.com) and create a new [API](https://manage.auth0.com/#/apis) with the following settings:

* **Name**: a suitable name of your choice, suggested: `sample-auth0-nodeserver`
* **Identifier**: `http://localhost:3001/api/`
* **Signing Algorithm**: `RS256`

![New Auth0 API](https://cdn.auth0.com/blog/ngatl/new-api.png)

## Auth0 User Roles Rule

Log into your [Auth0 Dashboard](https://manage.auth0.com) and [create a new Auth0 rule](https://manage.auth0.com/#/rules/create) using the `Set roles to a user` access control rule template:

![Auth0 rule template selection](https://cdn.auth0.com/blog/mean-series/rule-new.jpg)

Modify the rule code as shown below:

```js
// Set roles to a user
function (user, context, callback) {
  user.app_metadata = user.app_metadata || {};
  var addRolesToUser = function(user, cb) {
    if (user.email && user.email === '{YOUR_USER_EMAIL}') {
      cb(null, ['admin']);
    } else {
      cb(null, ['user']);
    }
  };

  addRolesToUser(user, function(err, roles) {
    if (err) {
      callback(err);
    } else {
      user.app_metadata.roles = roles;
      auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
        .then(function(){
          // Add metadata to both ID token and access token
          var namespace = 'https://example.com/roles';
          var userRoles = user.app_metadata.roles;
          context.idToken[namespace] = userRoles;
          context.accessToken[namespace] = userRoles;
          callback(null, user, context);
        })
        .catch(function(err){
          callback(err);
        });
    }
  });
}
```

Set up a pattern for the admin user to be specifically identified. The example above uses `email` matching with strict equality.

Make sure you also add the app metadata containing your roles to the `accessToken` as well as the `idToken`. The access token is how we'll verify that the user has the appropriate role on our server when they request resources.

The `namespace` identifier in the `addRolesToUser()` callback function can be any _non-Auth0_ HTTP or HTTPS URL and does not have to point to an actual resource. Auth0 enforces [this recommendation from OIDC regarding additional claims](https://openid.net/specs/openid-connect-core-1_0.html#AdditionalClaims) and will _silently exclude_ any claims that do not have a namespace. You can read more about [implementing custom claims with Auth0 here](https://auth0.com/docs/scopes/current#custom-claims).

## Add Auth0 Configuration

Change the filename of `config.js.sample` to `config.js` to activate it.

Add your Auth0 configuration to the `config.js` file:

* **domain**: your Auth0 tenant domain, e.g., `[you].auth0.com` (format may differ by region); you can find your domain by viewing an [Auth0 client](https://manage.auth0.com/#/clients)'s settings
* **audience**: the Audience Identifier of the API you set up in Auth0, e.g., `http://localhost:3001/api/` (must be exact match!)
* **namespace**: the `namespace` identifier you specified in the "Set roles to a user" rule you created above, e.g., `https://example.com/roles`

## Serve

To start the server, run the following command from the root of the folder containing your `server.js` file:

```bash
$ node server
```

Alternatively, you could install [nodemon](https://nodemon.io/), which monitors the server for changes and restarts it automatically:

```bash
$ npm install -g nodemon
$ nodemon server
```

## License

[MIT](LICENSE) © Kim Maida 2018
