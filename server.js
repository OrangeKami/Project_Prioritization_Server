import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import api from "./routes/api.route.js";
import dotenv from "dotenv";

// * middleware

export const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
dotenv.config();

// ! monitor path at terminal
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// ? Cool trick for when promises or other complex callstack things are crashing & breaking:
void process.on("unhandledRejection", (reason, p) => {
  console.log(`Things got pretty major here! Big error:\n` + p);
  console.log(`That error happened because of:\n` + reason);
});

// Configure server security, based on documentation outlined here:
// https://www.npmjs.com/package/helmet
// TLDR: Very niche things from older days of the web can still be used to hack APIs
// but we can block most things with these settings.
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
    },
  })
);

// * register the mainRouter
app.use("/api", api);



