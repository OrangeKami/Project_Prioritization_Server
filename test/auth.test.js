import { app } from "../server";
import supertest from "supertest";
import mongoose from "mongoose";
const request = supertest(app);
import { userLogin, invaldLogin, managerLogin } from "./login.test.js";