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

> "Novemberizing app" 은 서버 어플리케이션을 서비스나 모듈을 구현하거나 설정에 정의하는 것만으로도 만들 수 있도록 서버의 기본 골격을 정의한 프레임워크입니다.

"Novemberizing app" 의 목표는 설정으로 부터 시작하여 서버 어플리케이션을 쉽게 만들 수 있도록 돕는 것입니다.

![Class Diagram Log](https://novemberizing.github.io/app/assets/images/ClassDiagramApplication.jpg)

어플리케이션 클래스는 `await Application.on(...)` 을 실행하여 서버를 동작시킵니다. 어플리케이션 클래스 안에는 정적 멤버로 `administrator`와 `server` 를 멤버 변수로 가지고 있어서 구조적으로 어플리케이션 로직과 관리자를 위한 로직을 분리하여 구현할 수 있습니다.

```js
await Application.on(await Config.gen({ url: "fs://./test/configure.json" }));
```

## 설치

Application 프레임워크는 "npm"을 이용하여 설치할 수 있습니다.

```
npm install --save @novemberizing/app
```

## 사용법

어플리케이션 프레임워크를 사용하기 위해서는 설정 파일을 생성 후에 서비스와 모듈과 관련된 모듈을 설정하고 어플리케이션 실행 시에 설정을 사용하도록 하여 어플리케이션 서버를 실행 시킬 수 있습니다.

아래의 설정은 관리자 서버는 `ApplicationServerExpress`(Express 서버) 엔진을 사용하고, 50001 포트로 오픈하며, 기본 서비스로 `ApplicationServerServiceRoot`를 사용하라고 정의한 것이며, `server`(메인 어플리케이션 로직이 담긴 서버)도 `ApplicationServerExpress`(Express 서버) 엔진을 사용하고, 40001 포트로 오픈하며, 마찬가지로 `ApplicationServerServiceRoot` 서비스를 이용하겠다고 정의한 것입니다.

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

위 처럼 `./configure.json` 을 정의하였다면, 아래처럼 간단하게 서버를 실행시킬 수 있습니다.

```js
await Application.on(Config.gen({ url: "fs://./configure.json" }));
```

### 서버를 종료하는 방법

서버를 종료하려면 간단하게 `await Application.off()`을 호출하여 종료시킬 수 있습니다.

```js
await Application.off();
```

### 새로운 서비스를 정의하고 사용하는 방법

새로운 서비스를 정의하려 사용하려면, `ApplicationServerService` 클래스를 상속하여 구현한 후에 `Application.use(c)`를 호출하여 사용을 명시한 후에 사용할 수 있습니다.

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

### 새로운 모듈을 정의하고 사용하는 방법

모듈은 서비스의 하위 비즈니스 로직으로 작은 단위의 비즈니스 로직을 정의하여 사용할 수 있도록 설계된 클래스입니다. 모듈을 정의하고 서비스에서 사용하려면, `ApplicationServerServiceModule` 클래스를 상속하여 새로운 커스텀 모듈을 정의한 후에 `Application.use(c)`를 호출하여 사용을 명시하고 사용할 수 있습니다.

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

## 문서

[Novemberizing application api](https://novemberizing.github.io/app/api)
