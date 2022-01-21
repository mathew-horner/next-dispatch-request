describe("dispatchRequest", () => {
  describe("calls the correct handler", () => {
    test("when sent GET", () => {});
    test("when sent POST", () => {});
    test("when sent PUT", () => {});
    test("when sent DELETE", () => {});
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
