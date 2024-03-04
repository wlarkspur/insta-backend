import jwt, { JwtPayload } from "jsonwebtoken";
import client from "../client";

export const getUser = async (token: any) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
    const user = await client.user.findUnique({
      where: {
        id,
      },
    });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

interface IProtectResolver {
  root: any;
  args: any;
  context: any;
  info: any;
}

export const protectedResolver =
  (ourResolver: Function) =>
  (root: any, args: any, context: any, info: any) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please log in to perform this action. :)",
      };
    }
    return ourResolver(root, args, context, info);
  };
