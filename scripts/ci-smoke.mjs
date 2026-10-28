import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { setTimeout } from "node:timers/promises";

const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "--port", "3100"],
  {
    stdio: "inherit",
    env: process.env,
  },
);
const baseUrl = "http://localhost:3100";

try {
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    if (server.exitCode !== null)
      throw new Error(`Next.js exited: ${server.exitCode}`);
    try {
      const response = await fetch(`${baseUrl}/about`);
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {
      // Wait for the production server to listen.
    }
    await setTimeout(500);
  }
  assert.ok(ready, "Production server did not become ready");

  for (const [path, expected] of [
    ["/", "CI fixture work"],
    ["/works", "CI fixture work"],
    ["/works/ci-work", "CI fixture work body"],
    ["/notes", "CI fixture note"],
    ["/notes/ci-note", "CI fixture note body"],
    ["/travel", "Christchurch"],
    ["/about", "About Me"],
    ["/activity", "Timeline"],
  ]) {
    const response = await fetch(`${baseUrl}${path}`, {
      signal: AbortSignal.timeout(15_000),
    });
    assert.equal(response.status, 200, `${path} must return HTTP 200`);
    assert.ok(
      (await response.text()).includes(expected),
      `${path} must render ${expected}`,
    );
    console.log(`PASS ${path}`);
  }
} finally {
  server.kill("SIGTERM");
}
