import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import {
  services,
  equipment,
  lodene,
  massarLink,
} from "../src/data/catalog.js";
import fr from "../src/i18n/fr.js";
import ar from "../src/i18n/ar.js";

test("all six universes have unique destinations, translated content and local images", () => {
  assert.equal(services.length, 6);
  assert.equal(new Set(services.map((s) => s.path)).size, 6);
  for (const service of services) {
    assert.ok(
      service.path.startsWith(
        service.brand === "massar" ? "/massar" : "/lodene/",
      ),
    );
    assert.ok(
      existsSync(new URL(`../public${service.image}`, import.meta.url)),
      service.image,
    );
    for (const dictionary of [fr, ar]) {
      for (const field of [
        "title",
        "description",
        "tag",
        "alt",
        "hero",
        "intro",
      ]) {
        assert.ok(
          dictionary.services[service.id][field].trim(),
          `${dictionary.locale}: ${service.id}.${field}`,
        );
      }
    }
  }
});

function assertSameShape(first, second, path = "") {
  if (typeof first === "string") {
    assert.equal(typeof second, "string", path);
    assert.ok(second.trim(), path);
    return;
  }
  assert.deepEqual(Object.keys(first), Object.keys(second), path);
  for (const key of Object.keys(first))
    assertSameShape(first[key], second[key], `${path}.${key}`);
}

test("French and Arabic cover the same complete visitor flows", () =>
  assertSameShape(fr, ar));

test("all four requested machinery courses belong to Conduite and have explanatory topics", () => {
  assert.deepEqual(
    equipment.map((e) => e.id),
    ["tractopelle", "chariot", "gerbeur", "nacelle"],
  );
  for (const machine of equipment) {
    assert.ok(
      existsSync(new URL(`../public${machine.image}`, import.meta.url)),
    );
    for (const dictionary of [fr, ar]) {
      const content = dictionary.conduite.machines[machine.id];
      assert.ok(content.title && content.description);
      assert.ok(content.topics.length >= 3);
    }
  }
  assert.match(fr.conduite.machines.chariot.label, /FENWICK/);
});

test("account links preserve role routing and only allow web destinations", () => {
  const candidate = new URL(massarLink("https://massar.example", "candidat"));
  assert.equal(candidate.pathname, "/login");
  assert.equal(candidate.searchParams.get("role"), "candidat");
  assert.equal(
    new URL(massarLink(undefined, "auto-ecole")).searchParams.get("role"),
    "auto-ecole",
  );
  assert.throws(
    () => massarLink("file:///local/index.html", "candidat"),
    /HTTP/,
  );
  assert.equal(new URL(lodene.portal).hostname, "lodene.fr");
  assert.ok(lodene.portal.endsWith("/espace-eleve"));
  for (const service of services.filter((s) => s.official))
    assert.equal(new URL(service.official).protocol, "https:");
});
