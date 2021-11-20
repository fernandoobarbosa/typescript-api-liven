import app from "../routes";

import supertest from "supertest";

const request = supertest(app);

it("Working test", async () => {
  const response = await request.get("/");
  expect(response.status).toBe(200);
  expect(response.body).toEqual({ message: "Working!" });
});
