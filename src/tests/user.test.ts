import app from "../routes";
import supertest from "supertest";
import User from "../models/user";
import faker from "faker";

jest.setTimeout(30000);

const request = supertest(app);

it("Get /user information without token", async () => {
  const response = await request.get("/user/information");
  expect(response.statusCode).toBe(401);
});

it("Delete /user without token", async () => {
  const response = await request.delete("/user/remove");
  expect(response.statusCode).toBe(401);
});

it("Wrong /login", async () => {
  let randomPassword = faker.internet.password();
  let randomEmail = faker.internet.email();
  const response = await request.post("/login").send({
    email: randomEmail,
    password: randomPassword,
  });
  expect(response.statusCode).toBe(400);
});
