import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
config();
import morgan from "morgan";

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: [process.env.FRONTEND_URL], //to use api in different user
        credentials: true, // to let cookie or credentials trvel through
    })
);

app.use(cookieParser()); //to let token in cookies parse

app.use(morgan("dev")); // dev level ki information console pe print karna

app.use("/ping", (req, res) => {
    //to check if server is running
    res.send("Pong");
});

//routes in 3 modules

app.all("*", (req, res) => {
    //if any random url is seraches expect defined ones
    res.status(404).send("OOPS!! 404 page not fount");
});

export default app;
