import { toLower, compact } from "lodash";

export const generateCacheKey = (
  keyPaths: Array<string | number | undefined | boolean>
) => {
  return toLower(compact(keyPaths).join(":"));
};
