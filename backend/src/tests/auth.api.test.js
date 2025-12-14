jest.setTimeout(20000);

const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

describe("Auth API", () => {
  beforeAll(async () => {
    // clean up in case test was run before
    await User.deleteMany({ email: "api@test.com" });
  });

  it("registers a user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "API User",
      email: "api@test.com",
      password: "password123"
    });

    expect(res.statusCode).toBe(201);
  });

  it("logs in a user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "api@test.com",
      password: "password123"
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
