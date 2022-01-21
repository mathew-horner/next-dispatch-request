import { NextApiRequest, NextApiResponse } from "next";

export interface Handlers {
  get?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
  post?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
  put?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
  delete?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
}

export const createRequestDispatcher =
  (handlers: Handlers) => (req: NextApiRequest, res: NextApiResponse) =>
    dispatchRequest(req, res, handlers);

export async function dispatchRequest(
  req: NextApiRequest,
  res: NextApiResponse,
  handlers: Handlers
) {
  if (req.method === undefined) {
    res.status(400).send("Method Undefined");
    return;
  }
  const method = req.method.toLowerCase() as "get" | "post" | "put" | "delete";
  if (handlers[method] === undefined) {
    res.setHeader(
      "Allow",
      Object.keys(handlers).map((handler) => handler.toUpperCase())
    );
    res.status(405).send(`Method ${method.toUpperCase()} Not Allowed!`);
    return;
  }
  try {
    await handlers[method]!(req, res);
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
}

function getErrorMessage(error: unknown): string {
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  return "";
}
