import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@app/database";

const auth_memo: any = {};

/**
 * Only authenticated users can access the route
 * @param next
 * @returns
 */
const protectedHandler = (
  next: (
    req: NextApiRequest,
    res: NextApiResponse,
    userId: string
  ) => Promise<void>
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Auth
    const userId = req.headers["user-id"] as string;

    if (!userId) {
      return res.status(401).send("");
    }

    // Check if user exists
    const userExists =
      auth_memo[userId] || (await db.get_user_account_by_id(userId));

    // Store user auth (speed the process)
    if (!auth_memo[userId]) {
      auth_memo[userId] = userExists;
    }

    if (!userExists.success) {
      return res.status(401).send("");
    }

    // Next
    await next(req, res, userId);
  };
};

export default protectedHandler;
