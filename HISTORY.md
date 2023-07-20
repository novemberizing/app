### 0.0.21
    * Implement service install mechanism

### 0.0.22
    * Remove install mechanism

### 0.0.23
    * Support cors
```js
{
    "administrator": {
        "engine": "ApplicationServerExpress",
        "port": 8090,
        "cors": [
            "https://example.com",
            "https://www.example.com",
        ],
    },
}
```