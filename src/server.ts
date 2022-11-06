import 'express-async-errors'
import express, { json } from "express";
import { errorMiddleware } from "./middleware/error";
import { routes } from "./routes/routes";

const server = express();
const port = process.env.PORT || 3000;

server.use(json());

server.use(routes);
server.use(errorMiddleware)

server.listen(port, () => {
  console.log(`Server starting 🚀 http://localhost:${port}`);
});

server.get('/', function (request, response) {
  response.send();
});