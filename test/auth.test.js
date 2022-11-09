import request from "supertest";
import { app } from "../server.js";

describe("get /", () => {
  test("should respond with 200 statuse code and show welcome message", async () => {
    const res = await request(app).get("/api");
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual(expect.stringContaining('Welcome'))
  });
});
