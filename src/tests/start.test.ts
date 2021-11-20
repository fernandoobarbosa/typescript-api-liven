import app from "../routes";

import supertest from "supertest";

const request = supertest(app);

it("Health check test", async () => {
  const response = await request.get("/healthcheck");
  expect(response.status).toBe(200);
  expect(response.body).toEqual({ message: "Working!" });
});
