import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import UserController from "./controllers/UserController";
import FormController from "./controllers/FormController";
import { errorMiddleware } from "./utils/errorHandler";

const app = express();

app.set("trust proxy", 1);
app.use(errorMiddleware);
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

app.use("/api/users", UserController);
app.use("/api/forms", FormController);

export default app;
