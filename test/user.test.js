import request from "supertest";
import { app } from "../server.js";
import mongoose from "mongoose";
import { userLogin } from "./login.js";

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

// * get all users
describe("/api/users get all users", () => {
  test("gets all users", async () => {
    const response = await userLogin();
    const res = await request(app)
      .get("/api/users")
      .set("Authorization", `bearer ${response.body.token}`);
    expect(res.statusCode).toBe(200);
  });
});

// ! login user route
describe("/api/users/:id testing all user route ", () => {
  // * get user info
  test("get users info with id", async () => {
    const response = await userLogin();
    // * find user id and token
    // console.log(response.body)
    const res = await request(app)
      .get(`/api/users/${response.body.user._id}`)
      .set("Authorization", `bearer ${response.body.token}`);
    expect(res.statusCode).toBe(200);
  });

  // * id is not right
  test("Return 404 when user doesn't exist", async () => {
    const response = await userLogin(); // ! pass isAuth middletware
    const res = await request(app)
      .get("/api/users/1231")
      .set("Authorization", `bearer ${response.body.token}`); //! check token is right
    expect(res.statusCode).toBe(404);
    expect(res.text).toEqual('{"error":"No such User"}');
  });

  // * update user info
  test("Update users info", async () => {
    const response = await userLogin();
    const res = await request(app)
      .patch(`/api/users/${response.body.user._id}`)
      .set("Authorization", `bearer ${response.body.token}`)
      .send({
        firstName: "Test",
        lastName: "User",
        email: "usertest@test.com",
      });
    expect(res.statusCode).toBe(200);
  });

  //  delete user function
  test("delete user successfully", async () => {
    const response = await request(app).post("/api/auth/signIn").send({
      email: "pasttest@test.com",
      password: "test@123",
    });

    const res = await request(app)
      .delete(`/api/users/${response.body.user._id}`)
      .set("Authorization", `bearer ${response.body.token}`);

    // console.log(response.body);
    expect(res.statusCode).toBe(200);
  });

  // ! manual test delete ticket function
});
