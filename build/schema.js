"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeDefs = exports.resolvers = void 0;
var _loadFiles = require("@graphql-tools/load-files");
var _merge = require("@graphql-tools/merge");
var loadedTypes = (0, _loadFiles.loadFilesSync)("".concat(__dirname, "/**/*.typeDefs.*"));
// /**/*.  모든 폴더, 모든 파일을 검색
var loadedResolvers = (0, _loadFiles.loadFilesSync)("".concat(__dirname, "/**/*.{queries,resolvers}.*"));
var typeDefs = exports.typeDefs = (0, _merge.mergeTypeDefs)(loadedTypes);
var resolvers = exports.resolvers = (0, _merge.mergeResolvers)(loadedResolvers);