import path from "path";
import {makeSchema} from "nexus";
import * as Types from "./api/index";

export const getSchema = (generate: boolean = false) => {
  return makeSchema({
    types: Types,
    outputs: generate
      ? {
        schema: path.join(__dirname, './schema.graphql'),
        typegen: path.join(__dirname, './typings.ts'),
      }
      : false,
  });
};
