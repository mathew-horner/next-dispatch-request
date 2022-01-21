import { createMocks } from "node-mocks-http";
import { dispatchRequest } from "./index";

describe("dispatchRequest", () => {
  describe("calls the correct handler", () => {
    test("when sent GET", async () => {
      const fn = jest.fn();
      const { req, res } = createMocks({
        method: "GET",
      });
      await dispatchRequest(req, res, {
        get: fn,
      });
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test("when sent POST", async () => {
      const fn = jest.fn();
      const { req, res } = createMocks({
        method: "POST",
      });
      await dispatchRequest(req, res, {
        post: fn,
      });
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test("when sent PUT", async () => {
      const fn = jest.fn();
      const { req, res } = createMocks({
        method: "PUT",
      });
      await dispatchRequest(req, res, {
        put: fn,
      });
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test("when sent DELETE", async () => {
      const fn = jest.fn();
      const { req, res } = createMocks({
        method: "DELETE",
      });
      await dispatchRequest(req, res, {
        delete: fn,
      });
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe("sends a 405 Not Allowed response and enumerates the allowed methods", () => {
    test("when sent GET without a GET handler", async () => {
      const fn = jest.fn((_req, res) => res.status(200).end());
      const { req, res } = createMocks({
        method: "GET",
      });
      await dispatchRequest(req, res, {
        post: fn,
        put: fn,
        delete: fn,
      });
      expect(fn).not.toHaveBeenCalled();
      expect(res.statusCode).toEqual(405);
      expect(res.getHeader("Allow")).toEqual(["POST", "PUT", "DELETE"]);
    });

    test("when sent POST without a POST handler", async () => {
      const fn = jest.fn((_req, res) => res.status(200).end());
      const { req, res } = createMocks({
        method: "POST",
      });
      await dispatchRequest(req, res, {
        get: fn,
        put: fn,
        delete: fn,
      });
      expect(fn).not.toHaveBeenCalled();
      expect(res.statusCode).toEqual(405);
      expect(res.getHeader("Allow")).toEqual(["GET", "PUT", "DELETE"]);
    });

    test("when sent PUT without a PUT handler", async () => {
      const fn = jest.fn((_req, res) => res.status(200).end());
      const { req, res } = createMocks({
        method: "PUT",
      });
      await dispatchRequest(req, res, {
        post: fn,
        get: fn,
        delete: fn,
      });
      expect(fn).not.toHaveBeenCalled();
      expect(res.statusCode).toEqual(405);
      expect(res.getHeader("Allow")).toEqual(["POST", "GET", "DELETE"]);
    });

    test("when sent DELETE without a DELETE handler", async () => {
      const fn = jest.fn((_req, res) => res.status(200).end());
      const { req, res } = createMocks({
        method: "DELETE",
      });
      await dispatchRequest(req, res, {
        post: fn,
        put: fn,
        get: fn,
      });
      expect(fn).not.toHaveBeenCalled();
      expect(res.statusCode).toEqual(405);
      expect(res.getHeader("Allow")).toEqual(["POST", "PUT", "GET"]);
    });
  });

  test("sends a 500 Internal Server Response with the error message when an error occurs in the handler", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });
    await dispatchRequest(req, res, {
      async get(req, res) {
        await Promise.reject("Error!");
      },
    });
    expect(res.statusCode).toEqual(500);
  });
});
