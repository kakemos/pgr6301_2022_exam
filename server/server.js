import express from "express";
import * as path from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { MongoClient } from "mongodb";
import { WebSocketServer } from "ws";
import { LoginApi } from "./api/loginApi.js";
import { NewsApi } from "./api/newsApi.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: true }));

const wsServer = new WebSocketServer({ noServer: true });

const sockets = [];

wsServer.on("connect", (socket) => {
  sockets.push(socket);

  socket.on("message", (data) => {
    const { title, intro } = JSON.parse(data);

    for (const recipient of sockets) {
      recipient.send(JSON.stringify({ title, intro }));
    }
  });
});

export const mongoClient = new MongoClient(process.env.MONGODB_URL);
mongoClient.connect().then(async () => {
  console.log("Connected to mongodb");
  app.use("/api/news", NewsApi);
});

app.use("/api/login", LoginApi);
app.use(express.static(path.resolve(__dirname, "..", "client", "dist")));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
  server.on("upgrade", (req, socket, head) => {
    wsServer.handleUpgrade(req, socket, head, (socket) => {
      wsServer.emit("connect", socket, req);
    });
  });
});
