import request from "supertest";
import {app} from "../server";

export const userLogin = async () => {
    const response = await request(app).post("/api/auth/signIn").send({
      email: "userTest@test.com",
      password: "test@123",
    });
    return response.text
};

export const managerLogin = async () => {
  const response = await request(app).post("/api/auth/signIn").send({
    email: "managerTest@test.com",
    password: "test@123",
  });
  return response.text;
};

export const invalidLogin = async () => {
  const response = await request(app).post("/api/auth/signIn").send({
    email: "invalid@test.com",
    password: "invalid",
  });
  return response.text;
};