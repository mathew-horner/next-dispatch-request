import { createMocks } from "node-mocks-http";
import { dispatchRequest } from "./index";

describe("dispatchRequest", () => {
  describe("calls the correct handler", () => {
    test("when sent GET", () => {
      const fn = jest.fn();
      const { req, res } = createMocks({
        method: "GET",
      });
      dispatchRequest(req, res, {
        get: fn,
      });
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test("when sent POST", () => {
      const fn = jest.fn();
      const { req, res } = createMocks({
        method: "POST",
      });
      dispatchRequest(req, res, {
        post: fn,
      });
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test("when sent PUT", () => {
      const fn = jest.fn();
      const { req, res } = createMocks({
        method: "PUT",
      });
      dispatchRequest(req, res, {
        put: fn,
      });
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test("when sent DELETE", () => {
      const fn = jest.fn();
      const { req, res } = createMocks({
        method: "DELETE",
      });
      dispatchRequest(req, res, {
        delete: fn,
      });
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe("sends a 405 Not Allowed response and enumerates the allowed methods", () => {
    test("when sent GET without a GET handler", () => {});
    test("when sent POST without a POST handler", () => {});
    test("when sent PUT without a PUT handler", () => {});
    test("when sent DELETE without a DELETE handler", () => {});
  });

  test("sends a 400 Bad Request response when given an undefined method", () => {});

  test("sends a 500 Internal Server Response with the error message when an error occurs in the handler", () => {});
});
