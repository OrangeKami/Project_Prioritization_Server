import request from "supertest";
import { app } from "../server.js";
import mongoose from "mongoose";
import { userLogin, invalidLogin } from "./login.js";

// * connect to mongoose server before testing
beforeAll(() => {
  const dbConfig = { useNewUrlParser: true, useUnifiedTopology: true };
  mongoose.connect(process.env.MONG_URI, dbConfig, (err) => {
    if (err) {
      console.log(`Error: ${err.message}`);
    }
  });
});

afterAll(() => {
  mongoose.disconnect();
});

// * test Test function is working
describe("get /", () => {
  test("should respond with 200 statuse code and show welcome message", async () => {
    const res = await request(app).get("/api");
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual(expect.stringContaining("Welcome"));
  });
});

//  * test sign up function
describe("/auth/signUp will have some situations", () => {
  // * test sing up successfully
  test("return status 200 when fields are valid", async () => {
    const res = await request(app).post("/api/auth/signUp").send({
      lastName: "signup",
      firstName: "Test",
      email: "pasttest@test.com",
      password: "test@123",
      confirmPassword: "test@123",
    });
    expect(res.statusCode).toBe(200);
  });

  //  * test  when some filed are not provided
  test("return status 422 when fields are empty", async () => {
    const res = await request(app).post("/api/auth/signUp");
    expect(res.statusCode).toBe(422);
  });

  // * test email exist
  test("return error when email is exsist", async () => {
    const res = await request(app).post("/api/auth/signUp").send({
      firstName: "exist",
      lastName: "email",
      email: "pasttest@test.com",
      password: "test@123",
      confirmPassword: "test@123",
    });
    // * for test function purpose
    // console.log(res.statusCode);
    expect(res.statusCode).toBe(400);
    expect(res.text).toEqual('{"error":"Email already in use"}');
  });
});

// * test sign in function
describe("/auth/signIn will hvae some situations", () => {
  // * successfully sign in
  test("return status 200 when email and password are valid", async () => {
    const res = await userLogin();
    // ! use console log to get info from res
    // console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body.user._id).toBeDefined();
  });

  // * test email or password are incorrect
  test("return status 400 when email or password are incorrect", async () => {
    const res = await invalidLogin();
    // console.log(res.text)
    expect(res.statusCode).toBe(400);
    expect(res.text).toEqual('{"error":"Incorrect email"}');
  });

  // * test fields are empty
  test("return status 422 when fields are empty", async () => {
    const res = await request(app).post("/api/auth/signIn");
    expect(res.statusCode).toBe(422);
  });
});
