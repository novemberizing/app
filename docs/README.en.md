NOVEMBERIZING APP
=================

[ENGLISH](https://novemberizing.github.io/app/README.en.html) |
[한국어](https://novemberizing.github.io/app/README.ko.html)

![Node js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

![Github issues](https://img.shields.io/github/issues/novemberizing/app)
![GitHub license](https://img.shields.io/github/license/novemberizing/app)
![GitHub release](https://img.shields.io/github/v/release/novemberizing/app)
![Npm version](https://img.shields.io/npm/v/@novemberizing/app)

----

> "Novemberizing app" is a framework that defines the basic skeleton of a server so that a server application can be created simply by implementing a service or module or defining it in configuration.

The goal of "Novemberizing app" is to help you create server applications easily, starting with setup.

![Class Diagram Log](https://novemberizing.github.io/app/assets/images/ClassDiagramApplication.jpg)

The application class executes `await Application.on(...)` to start the server. The application class has `administrator` and `server` as static members as member variables, so the application logic and the logic for the administrator can be structurally separated and implemented.

```js
await Application.on(await Config.gen({ url: "fs://./test/configure.json" }));
```

## INSTALL

Application framework can be installed using "npm".

```
npm install --save @novemberizing/app
```

## USAGE

In order to use the application framework, you can run the application server by creating a configuration file, setting modules related to services and modules, and using the configuration when running the application.

The configuration below defines that the manager server uses the `ApplicationServerExpress` (Express server) engine, opens with port 50001, and uses `ApplicationServerServiceRoot` as the default service, and `server` (the server containing the main application logic) is also ` ApplicationServerExpress` (Express server) engine is used, port 40001 is opened, and `ApplicationServerServiceRoot` service is used similarly.

```json
{
    "administrator": {
        "engine": "ApplicationServerExpress",
        "port": 50001,
        "services": {
            "ApplicationServerServiceRoot": {}
        }
    },
    "server": {
        "engine": "ApplicationServerExpress",
        "port": 40001,
        "services": {
            "ApplicationServerServiceRoot": {}
        }
    }
}
```

If you defined `./configure.json` as above, you can simply run the server as below.

```js
await Application.on(Config.gen({ url: "fs://./configure.json" }));
```

### HOW TO SHUTDOWN THE SERVER

To shutdown the server, simply call `await Application.off()` to do so.

```js
await Application.off();
```

### HOW TO DEFINE AND CONSUME NEW SERVICES

To define and use a new service, after inheriting and implementing the `ApplicationServerService` class, call `Application.use(c)` to specify its use.

```js
import Application from "@novemberizing/app";
import { ApplicationServerService } from "@novemberizing/app";

export default class CustomApplicationService extends ApplicationServerService {
    constructor(server, config) {
        super("[service unique name]", server, config);
        
        ...
    }

    ...
}

...

// Use CustomApplicationService
Application.use(CustomApplicationService);

// Application on
await Application.on(await Config.gen({ url: "fs://./configure.json" }));
```

### HOW TO DEFINE AND USE NEW MODULES

A module is a class designed to define and use small business logic as a sub-business logic of a service. To define a module and use it in a service, define a new custom module by inheriting the `ApplicationServerServiceModule` class and call `Application.use(c)` to specify and use it.

```js
import Application from "@novemberizing/app";
import { ApplicationServerServiceModule } from "@novemberizing/app";

export default class CustomServiceModule extends ApplicationServerServiceModule {
    constructor(service, config) {
        super("[module unique name in the service]", service, config);

        ...
    }

    ...
}

// Use CustomApplicationService
Application.use(CustomApplicationService);

// Application on
await Application.on(await Config.gen({ url: "fs://./configure.json" }));
```

## DOCUMENT

[Novemberizing application api](https://novemberizing.github.io/app/api)
