const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");

const PORT = process.env.PORT || 0;
const HOST = "0.0.0.0";

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


module.exports = {
  app,
  PORT,
  HOST,
};