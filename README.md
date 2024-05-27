#### Express SSE (Server Sent Event) Example

### use case
- Stock market change notification for clients.
- Stream text like ChatGPT

### run:
```sh
$ yarn install
$ node app 
```

## Testing:

#### Listener
```sh
# cd C:\Program Files\Git\mingw64\bin
$ curl.exe -H Accept:text/event-stream http://localhost:3001/events
# Output
# data: []
# data: {"Name":"Test Value"}}
```

#### Sender events
```sh
# cd C:\Program Files\Git\mingw64\bin
$ curl.exe -X POST http://localhost:3001/fact -H "Content-Type: application/json" -d "{\"Name\":\"Test Value\"}"
# Output
# {"data":{"Name":"Test Value"}}

```

#### Clients count log
```sh
# cd C:\Program Files\Git\mingw64\bin
curl.exe -H Accept:text/event-stream http://localhost:3001/status
# Output
# {"clients":0}
```

#### Fronend react test:
```sh
$ cd Frontend_React_App\sse-client
$ yarn install
$ npm start
```

<p align="center">
<img src="./tmp/app.png?raw=true" alt="result" style="width:100%;"/>
</p>

