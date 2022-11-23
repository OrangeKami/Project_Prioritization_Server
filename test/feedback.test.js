import request from "supertest";
import { app } from "../server.js";
import mongoose from "mongoose";
import { userLogin, managerLogin } from "./login.js";

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

describe("check role and create feedback ", () => {
  // managers create feedback
  test("create feedback", async () => {
    const response = await managerLogin();
    const res = await request(app)
      .post("/api/tickets/636afa900b89cf9905418db8/feedbacks")
      .send({
        context: "Feedback test jest",
        ticketId: "636afa900b89cf9905418db8",
        feedbackBy: response.body.user._id,
      })
      .set("Authorization", `bearer ${response.body.token}`);

    expect(res.statusCode).toBe(200);
  });

  // create feedback with empty fields
  test("create feedback", async () => {
    const response = await managerLogin();
    const res = await request(app)
      .post("/api/tickets/636afa900b89cf9905418db8/feedbacks")
      .set("Authorization", `bearer ${response.body.token}`);

    expect(res.statusCode).toBe(400);
  });

  // users creat feedback
  test("user create feedback should be unAuthorized", async () => {
    const response = await userLogin();
    const res = await request(app)
      .post("/api/tickets/636afa900b89cf9905418db8/feedbacks")
      .send({
        context: "Feedback test jest",
        ticketId: "636afa900b89cf9905418db8",
        feedbackBy: response.body.user._id,
      })
      .set("Authorization", `bearer ${response.body.token}`);

    expect(res.statusCode).toBe(403);
    expect(res.text).toEqual('{"message":"Not Authorized"}');
  });
});

// * gets feedback of the ticketId
describe("get feedback of the ticket", () => {
  // * check ticketId is valid
  test("ticket id is unvalid", async () => {
    const response = await userLogin();
    const res = await request(app)
      .get("/api/tickets/123/feedbacks")
      .set("Authorization", `bearer ${response.body.token}`);
    expect(res.statusCode).toBe(404);
  });

  // * gets feedback from the ticket
  test("get feedbacks of the ticket", async () => {
    const response = await managerLogin();
    const res = await request(app)
      .get("/api/tickets/636afa900b89cf9905418db8/feedbacks")
      .set("Authorization", `bearer ${response.body.token}`);

    expect(res.statusCode).toBe(200);
  });
});

// updates feedback when is manager
describe("update feedback", () => {
  // * feedback id is invalid
  test("invalid feedback id", async () => {
    const response = await managerLogin();
    const res = await request(app)
      .patch("/api/tickets/636afa900b89cf9905418db8/feedbacks/123")
      .send({
        context: "jset feedbacks update",
      })
      .set("Authorization", `bearer ${response.body.token}`);

    expect(res.statusCode).toBe(404);
    expect(res.text).toEqual('{"error":"No such Feedback"}');
  });

  // * feedback is updated by manager
  test("invalid feedback id", async () => {
    const response = await managerLogin();
    const res = await request(app)
      .patch(
        "/api/tickets/636afa900b89cf9905418db8/feedbacks/636c768c2aa9b7edd5c37634"
      )
      .send({
        context: "jset feedbacks update",
      })
      .set("Authorization", `bearer ${response.body.token}`);

    expect(res.statusCode).toBe(200);
   
  });

  // * users denied feedback update
  test("invalid feedback id", async () => {
    const response = await userLogin();
    const res = await request(app)
      .patch(
        "/api/tickets/636afa900b89cf9905418db8/feedbacks/636c768c2aa9b7edd5c37634"
      )
      .send({
        context: "jset feedbacks update",
      })
      .set("Authorization", `bearer ${response.body.token}`);

    expect(res.statusCode).toBe(403);
    expect(res.text).toEqual('{"message":"Not Authorized"}');
  });
});

// ! manual test feedback delete function by using postman