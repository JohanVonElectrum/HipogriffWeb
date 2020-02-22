const express = require("express");
const bodyParser = require("body-parser");
const consolidate = require("consolidate");
const path = require("path");

const app = express();
const httpServer = require("http").createServer(app);

const anon_routes = require("./routes/anon");
const user_routes = require("./routes/user");

app.use(anon_routes);
app.use(user_routes);

app.set("httpPort", 80);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine("html", consolidate.ejs);
app.set("view engine", "html");
app.use(express.static("public"));
app.set("views", path.join(__dirname, "/public/html"));

httpServer.listen(app.get("httpPort"), () => {
    console.log("Listening on port:", app.get("httpPort"));
});

//SOCKET.IO

var io = require("socket.io")(httpServer);

io.on("connection", (socket) => {
    console.log("Connect!");
});