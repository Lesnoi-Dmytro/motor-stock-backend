import { loadConfig, createMatchPath } from "tsconfig-paths";
import { fileURLToPath } from "url";
import { dirname, join, isAbsolute } from "path";
import { existsSync } from "fs";

const baseUrl = dirname(fileURLToPath(import.meta.url));
const configLoaderResult = loadConfig(join(baseUrl, "tsconfig.json"));

if (configLoaderResult.resultType === "failed") {
  console.log("Could not load tsconfig.json", configLoaderResult.message);
  process.exit(1);
}

const distPaths = {
  "@/*": [join(baseUrl, "dist/*")],
  "*": [join(baseUrl, "dist/*")],
};

const matchPath = createMatchPath(
  baseUrl,
  distPaths,
  configLoaderResult.mainFields,
  configLoaderResult.addMatchAll
);

function tryExtensions(path) {
  const extensions = [".js", ".mjs", ".cjs"];
  for (const ext of extensions) {
    const pathWithExt = path + ext;
    if (existsSync(pathWithExt)) {
      return pathWithExt;
    }
  }
  return path + ".js"; // default to .js if no match found
}

export function resolve(specifier, context, nextResolve) {
  // Handle built-in modules and node_modules
  if (!specifier.startsWith(".") && !specifier.startsWith("@")) {
    return nextResolve(specifier, context);
  }

  let resolvedPath;

  // Handle relative imports
  if (specifier.startsWith(".")) {
    const parentPath = fileURLToPath(context.parentURL);
    const parentDir = dirname(parentPath);
    resolvedPath = join(parentDir, specifier);
    resolvedPath = tryExtensions(resolvedPath);
    return nextResolve("file://" + resolvedPath, context);
  }

  // Handle @ aliases
  const match = matchPath(specifier);
  if (match) {
    resolvedPath = tryExtensions(match);
    return nextResolve("file://" + resolvedPath, context);
  }

  return nextResolve(specifier, context);
}

export function load(url, context, nextLoad) {
  return nextLoad(url, context);
}
