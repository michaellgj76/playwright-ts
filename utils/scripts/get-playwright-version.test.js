const { test } = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const scriptPath = path.resolve(__dirname, "./get-playwright-version.js");
const tmpPackagePath = path.resolve(__dirname, "../../package.json.tmp");
const realPackagePath = path.resolve(__dirname, "../../package.json");

// Helper to temporarily swap the real package.json with a test one
function setupMockPackageJson(content) {
  if (fs.existsSync(realPackagePath)) {
    fs.renameSync(realPackagePath, tmpPackagePath);
  }
  fs.writeFileSync(realPackagePath, JSON.stringify(content, null, 2));
}

function restoreOriginalPackageJson() {
  if (fs.existsSync(realPackagePath)) {
    fs.unlinkSync(realPackagePath);
  }
  if (fs.existsSync(tmpPackagePath)) {
    fs.renameSync(tmpPackagePath, realPackagePath);
  }
}

test("Should extract and clean the Playwright version correctly", () => {
  setupMockPackageJson({
    devDependencies: {
      "@playwright/test": "^1.49.2",
    },
  });

  try {
    // Runs the script and captures the output in the console
    const output = execSync(`node ${scriptPath}`).toString().trim();
    assert.strictEqual(output, "1.49.2");
  } finally {
    restoreOriginalPackageJson();
  }
});

test("Should also look in dependencies if it is not in devDependencies", () => {
  setupMockPackageJson({
    dependencies: {
      "@playwright/test": "1.45.0",
    },
  });

  try {
    const output = execSync(`node ${scriptPath}`).toString().trim();
    assert.strictEqual(output, "1.45.0");
  } finally {
    restoreOriginalPackageJson();
  }
});

test("Should fail if @playwright/test is not declared", () => {
  setupMockPackageJson({
    devDependencies: {
      lodash: "^4.17.21",
    },
  });

  try {
    // execSync will throw an error if the process exits with a non-zero status
    assert.throws(() => {
      execSync(`node ${scriptPath}`, { stdio: "pipe" });
    });
  } finally {
    restoreOriginalPackageJson();
  }
});
