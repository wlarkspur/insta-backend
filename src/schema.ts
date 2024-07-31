import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
// /**/*.  모든 폴더, 모든 파일을 검색
const loadedResolvers = loadFilesSync(
  `${__dirname}/**/*.{queries,resolvers}.ts`
);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers: any = mergeResolvers(loadedResolvers);
