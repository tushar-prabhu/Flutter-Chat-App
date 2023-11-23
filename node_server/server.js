const WebSocket = require("ws");
const express = require("express");
const moment = require("moment");
const app = express();
const port = 8000; //port for https

app.get("/", (req, res) => {
  res.send("Express server is running");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
var webSockets = {};

const wss = new WebSocket.Server({ port: 6060 }); //run websocket server with port 6060
wss.on("connection", function (ws, req) {
  var userID = req.url.substr(1); //get userid from URL ip:6060/userid
  webSockets[userID] = ws; //add new user to the connection list

  console.log("User " + userID + " Connected ");

  ws.on("message", (message) => {
    //if there is any message
    console.log(message);
    var datastring = message.toString();
    if (datastring.charAt(0) == "{") {
      datastring = datastring.replace(/\'/g, '"');
      var data = JSON.parse(datastring);
      if (data.auth == "addauthkeyifrequired") {
        if (data.cmd == "send") {
          var boardws = webSockets[data.userid]; //check if there is reciever connection
          if (boardws) {
            var cdata =
              "{'cmd':'" +
              data.cmd +
              "','userid':'" +
              data.userid +
              "', 'msgtext':'" +
              data.msgtext +
              "'}";
            boardws.send(cdata); //send message to reciever
            ws.send(data.cmd + ":success");
          } else {
            console.log("No receiver user found.");
            ws.send(data.cmd + ":error");
          }
        } else {
          console.log("No send command");
          ws.send(data.cmd + ":error");
        }
      } else {
        console.log("App Authentication error");
        ws.send(data.cmd + ":error");
      }
    } else {
      console.log("Non JSON type data");
      ws.send(data.cmd + ":error");
    }
  });

  ws.on("close", function () {
    var userID = req.url.substr(1);
    delete webSockets[userID]; //on connection close, remove receiver from connection list
    console.log("User Disconnected: " + userID);
  });

  ws.send("connected"); //initial connection return message
});
