import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@app/database";

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
    const userExists = await db.get_user_account_by_id(userId);
    if (!userExists.success) {
      return res.status(401).send("");
    }

    // Next
    await next(req, res, userId);
  };
};

export default protectedHandler;
