import request from "supertest";
import {app} from "../server";

export const userLogin = async () => {
    const res = await request(app).post("/api/auth/signIn").send({
      email: "usertest@test.com",
      password: "test@123",
    });
    return res;
};

export const managerLogin = async () => {
  const res = await request(app).post("/api/auth/signIn").send({
    email: "managertest@test.com",
    password: "test@123",
  });
  return res
};

export const invalidLogin = async () => {
  const res = await request(app).post("/api/auth/signIn").send({
    email: "invalid@test.com",
    password: "invalid",
  });
  return res
};