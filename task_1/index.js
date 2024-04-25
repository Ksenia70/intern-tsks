import { encoded, translations } from "./data.js";
import decode from "./decode.js";

const excludedKeys = ["groupId", "service", "formatSize", "ca"];

// decode(encoded, translations);

const { decoded, unicValues } = decode(encoded, translations, excludedKeys);

console.log(decoded);
console.log(unicValues);
