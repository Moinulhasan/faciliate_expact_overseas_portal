// Run: node --test resources/js/lib/search.test.ts  (Node ≥ 22.6 strips TS types natively)
import assert from "node:assert/strict";
import { test } from "node:test";
import { matches, normalize } from "./search.ts";

test("normalize strips case and accents", () => {
  assert.equal(normalize("  Çroatia "), "croatia");
});

test("empty query matches everything", () => {
  assert.ok(matches("", ["anything"]));
  assert.ok(matches("   ", []));
});

test("every word must appear somewhere across fields", () => {
  const fields = ["Construction & Infrastructure", "Welder", "Mason", "Saudi Arabia"];
  assert.ok(matches("weld", fields));
  assert.ok(matches("saudi mason", fields));
  assert.ok(!matches("saudi nurse", fields));
});

test("null fields are ignored", () => {
  assert.ok(matches("japan", [null, undefined, "Japan"]));
});
