import request from "supertest";
import { app } from "../server.js";
import mongoose from "mongoose";


// * connect to mongoose server before testing
beforeAll(() => {
  const dbConfig = { useNewUrlParser: true, useUnifiedTopology: true };
  mongoose.connect(process.env.MONG_URI, dbConfig, err => {
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
    expect(res.text).toEqual(expect.stringContaining('Welcome'))
  });
});


//  * test sign  up function
describe('/signUp will have some situations', () => { 
  

    // * test  emaiil exist
    test("return error when email is exsist", async () => {
      const res = await request(app).post("/api/auth/signUp").send({
        firstName: "exist",
        lastName: "email",
        email: "usertest@test.com",
        password: "test@123",
        confirmPassword: "test@123"
      });
      console.log(res.text)
      expect(res.text).toEqual("{\"error\":\"Email already in use\"}");
    });
    
    //  * test  when some filed are not provided 
    test("return status 200 when all fields are valid", async  () => { 
      const res = await request(app).post('/api/auth/signUp').send({
        LastName: "field missing",
        email: "testMissing@test.com",
        password: "test@123",
        confirmPassword: "test@123"
      });
      expect(res.statusCode).toBe(422);    
    });

});
