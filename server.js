import express from "express";
import cors from "cors";
import helmet from "helmet";
import mainRouter from "./routes/mainRouter.js";

// * middleware
export const app = express();
app.use(cors());
app.use(express.json());

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
app.use(mainRouter);


