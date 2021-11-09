import "reflect-metadata";
import "./database/index";
import express from "express";
import "express-async-errors";
import { routes } from "./routes";
import { ErrorsMiddleware } from "./middlewares/errors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(routes);
app.use(ErrorsMiddleware);

app.listen(port, () => console.log("Server is running"));