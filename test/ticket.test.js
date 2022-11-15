import request from "supertest";
import { app } from "../server.js";
import mongoose from "mongoose";
import { userLogin } from "./login.js";

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

describe("check authorization", () => {
  // * check authorization
  test("get all my tickets including unsub and sub tickets", async () => {
    const res = await request(app).get("/api/tickets/myTickets");
    expect(res.statusCode).toBe(401);
    expect(res.text).toEqual('{"error":"Authorization token required"}');
  });
});

describe("get all my tickets and get all submitted ticket", () => {
  // get my tickets
  test("get all my tickets including unsub and sub tickets", async () => {
    const response = await userLogin();
    const res = await request(app)
      .get("/api/tickets/myTickets")
      .set("Authorization", `bearer ${response.body.token}`);
    expect(res.statusCode).toBe(200);
  });

  // get all tickets
  test("get all my tickets including unsub and sub tickets", async () => {
    const response = await userLogin();
    const res = await request(app)
      .get("/api/tickets/submitted")
      .set("Authorization", `bearer ${response.body.token}`);
    expect(res.statusCode).toBe(200);
  });
});

describe("/tickets create update, get and delete a ticket", () => {
    // succeful create ticket
    test("create a ticket", async () => {
        const response = await userLogin();
        const res = await request(app)
          .post("/api/tickets/new")
          .send({
            initialtive: "Ticket test",
            description: "This is jest test for ticket creation",
            target: "business",
            ticket_id: "tsmtest",
            author: response.body.user._id,
          })
          .set("Authorization", `bearer ${response.body.token}`);
        expect(res.statusCode).toBe(200)
    });

    // * validation not match
    test("all fields are blank", async () => {
        const response = await userLogin();
        const res = await request(app)
          .post("/api/tickets/new")
          .set("Authorization", `bearer ${response.body.token}`);
        expect(res.statusCode).toBe(422);
    });

    // * get single tickets
    test("get single tickets", async () => {
         const response = await userLogin();
         const res = await request(app)
           .get("/api/tickets/636c6d40363bc2a8277bf356")
           .set("Authorization", `bearer ${response.body.token}`);
        expect(res.statusCode).toBe(200)
    });

    // check authorization
     test("get single tickets", async () => {
       const response = await userLogin();
       const res = await request(app)
         .get("/api/tickets/636c6d40363bc2a8277bf356")
       expect(res.statusCode).toBe(401);
     });

    // * ticket id is not valid
     test("get single tickets with invalid id", async () => {
       const response = await userLogin();
       const res = await request(app)
         .get("/api/tickets/123")
         .set("Authorization", `bearer ${response.body.token}`);
       expect(res.statusCode).toBe(404);
       expect(res.text).toEqual('{"error":"No such Ticket"}');
     });

    //  * ticket update
    test("update single tickets", async () => {
      const response = await userLogin();
      const res = await request(app)
        .get("/api/tickets/636c6d40363bc2a8277bf356")
        .send({
          ininitialtive: "update ticket test"
        })
        .set("Authorization", `bearer ${response.body.token}`);
      expect(res.statusCode).toBe(200);
    });

    // ! manual test delete function by using postman
})