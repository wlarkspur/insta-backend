import * as jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token: any) => {
  try {
    if (!token) {
      return null;
    }
    const verifiedToken: any = jwt.verify(token, process.env.SECRET_KEY!);
    if ("id" in verifiedToken) {
      const user = await client.user.findUnique({
        where: {
          id: verifiedToken["id"],
        },
      });
      if (user) {
        return user;
      }
    }
    return null;
  } catch {
    return null;
  }
};

export function protectedResolver(ourResolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      const query = info.operation.operation === "query";
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "Please log in to perform this action. :)",
        };
      }
    }
    return ourResolver(root, args, context, info);
  };
}

//console.log(info) - info 인자는 GraphQL 리졸버 함수에서 네 번째 위치에 오며, 현재의 요청 및 필드에 대한 정보를 포함하는 객체입니다. 이 객체는 GraphQL 서버의 실행 단계에서 생성되며, 필드의 리졸버가 실행될 때마다 GraphQL 실행 엔진에 의해 리졸버 함수로 전달됩니다. info 객체는 API 사용자의 요청에 대한 상세한 메타데이터를 담고 있어, 리졸버의 동작을 동적으로 조정하거나, 복잡한 권한 검사, 로깅, 디버깅 등에 사용될 수 있습니다.
