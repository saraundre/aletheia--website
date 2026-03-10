const fs = require("fs");
const os = require("os");
const path = require("path");
const crypto = require("crypto");
const { spawnSync } = require("child_process");

const projectRoot = path.resolve(__dirname, "..");
const outputDir = path.join(projectRoot, "out");
const nextBin = require.resolve("next/dist/bin/next");
const excludedTopLevelEntries = new Set([
  ".git",
  ".next",
  ".next-build",
  "node_modules",
  "out",
]);

function runNextBuild(cwd) {
  const result = spawnSync(process.execPath, [nextBin, "build"], {
    cwd,
    env: process.env,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

function copyProjectTo(tempRoot) {
  fs.cpSync(projectRoot, tempRoot, {
    recursive: true,
    filter(source) {
      const relativePath = path.relative(projectRoot, source);

      if (!relativePath) {
        return true;
      }

      const topLevelEntry = relativePath.split(path.sep)[0];
      return !excludedTopLevelEntries.has(topLevelEntry);
    },
  });
}

function replaceOutput(tempRoot) {
  const builtOutputDir = path.join(tempRoot, "out");

  if (!fs.existsSync(builtOutputDir)) {
    console.error("Build completed without generating out/.");
    process.exit(1);
  }

  fs.rmSync(outputDir, { recursive: true, force: true });
  fs.cpSync(builtOutputDir, outputDir, { recursive: true });
}

function buildInIsolatedWorkspace() {
  const tempRoot = path.join(
    os.tmpdir(),
    `aletheia-build-${crypto.randomUUID()}`
  );

  fs.mkdirSync(tempRoot, { recursive: true });

  try {
    copyProjectTo(tempRoot);

    fs.symlinkSync(
      path.join(projectRoot, "node_modules"),
      path.join(tempRoot, "node_modules"),
      "junction"
    );

    console.log("Local build running in an isolated workspace.");
    runNextBuild(tempRoot);
    replaceOutput(tempRoot);
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

const isHostedBuild = Boolean(
  process.env.CI ||
    process.env.RENDER ||
    process.env.GITHUB_ACTIONS ||
    process.env.VERCEL
);

if (isHostedBuild) {
  runNextBuild(projectRoot);
} else {
  buildInIsolatedWorkspace();
}
