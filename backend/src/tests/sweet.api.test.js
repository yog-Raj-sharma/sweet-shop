jest.setTimeout(30000);

const request = require("supertest");
const app = require("../app");

let token;

beforeAll(async () => {
  // register admin user
  await request(app).post("/api/auth/register").send({
    name: "Sweet Admin",
    email: "sweetadmin@test.com",
    password: "password123",
    role: "admin"
  });

  // login
  const res = await request(app).post("/api/auth/login").send({
    email: "sweetadmin@test.com",
    password: "password123"
  });

  token = res.body.token;
});

describe("Sweet API", () => {
  it("adds a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Barfi",
        category: "Indian",
        price: 25,
        quantity: 10
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Barfi");
  });
});
