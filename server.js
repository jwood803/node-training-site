var http = require("http");

function handleRequest(request, response){
    response.end('It Works!! Path Hit: ' + request.url);
}

var port = process.env.PORT;

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(port, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: %s:%s", process.env.IP, port);
});