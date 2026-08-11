import assert from "node:assert/strict";
import test from "node:test";
import { randomInt, uniqueName } from "../utils.js";

test("randomInt returns the only value in a single-value range", () => {
  assert.equal(randomInt(7, 7), 7);
});

test("uniqueName includes two words and a three-digit suffix", () => {
  assert.match(uniqueName(), /^[a-z]+-[a-z]+-[1-9][0-9]{2}$/);
});
