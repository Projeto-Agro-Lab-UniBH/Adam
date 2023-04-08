import 'express-async-errors'
import cors from 'cors'
import express, { json } from "express";
import { errorMiddleware } from "./middleware/error";
import { routes } from "./routes/routes";
import cookieParser from 'cookie-parser';
const server = express();
const port = process.env.PORT || 3000;
const origin = process.env.ORIGIN || null

server.use(json());
server.use(cookieParser())
server.use(cors({ origin: `http://localhost:${origin}` }))
server.use(routes);
server.use(errorMiddleware)

server.listen(port, () => {
  console.log(`Server starting 🚀 http://localhost:${port}`);
});

server.get('/', function (request, response) {
  response.send();
});