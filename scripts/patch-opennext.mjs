// Runs after `npm install`.
//
// @opennextjs/cloudflare 1.20.x inlines Next.js manifest files into the Worker,
// but does not yet know about `preview-props.json`, which Next.js 16.4 added.
// Without it every page fails on Cloudflare with
// "Unexpected loadManifest(/.next/server/preview-props.json) call!".
//
// This adds that file to the adapter's list. It is safe to run repeatedly and
// does nothing once the adapter handles the file itself; delete this script
// and the "postinstall" entry in package.json after upgrading to such a version.
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const file =
  "node_modules/@opennextjs/cloudflare/dist/cli/build/patches/plugins/load-manifest.js";
const before = "{*-manifest,required-server-files,prefetch-hints}.json";
const after = "{*-manifest,required-server-files,prefetch-hints,preview-props}.json";

if (existsSync(file)) {
  const source = readFileSync(file, "utf8");
  if (source.includes("preview-props")) {
    console.log("patch-opennext: adapter already handles preview-props.json");
  } else if (source.includes(before)) {
    writeFileSync(file, source.replaceAll(before, after));
    console.log("patch-opennext: added preview-props.json to the adapter's manifest list");
  } else {
    console.warn(
      "patch-opennext: adapter source has changed; check whether this patch is still needed",
    );
  }
}
