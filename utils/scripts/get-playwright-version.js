const fs = require("fs");
const path = require("path");

try {
  const packageJsonPath = path.resolve(__dirname, "../../package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  const version =
    (packageJson.devDependencies &&
      packageJson.devDependencies["@playwright/test"]) ||
    (packageJson.dependencies && packageJson.dependencies["@playwright/test"]);

  if (!version) {
    console.error("Error: No @playwright/test found in the package.json");
    process.exit(1);
  }

  const cleanVersion = version.replace(/[^0-9.]/g, "");
  console.log(cleanVersion);
} catch (error) {
  console.error("Error when reading package.json content:", error.message);
  process.exit(1);
}
