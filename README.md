# Mock Server using Express
Mock server for testing, will give response based on json files from repository

## Configuration files
Examples
```
{
  "path": "/test",
  "get": {
    "status": 200,
    "body": {
      "something": "something"
    }
  }
}
```

```
{
  "path": "/error",
  "get": {
    "status": 400
  }
}
```

## How to use

`npm start "<path_to_route_files>`
