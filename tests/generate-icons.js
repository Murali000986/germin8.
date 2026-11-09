import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const iconsDir = path.join(__dirname, "..", "extension", "icons");

// Minimal valid transparent/colored PNG base64
// 16x16 cyan/blue icon
const png16Base64 = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZklEQVR4nGNgGFjAiM7/T2n4j0+ekZFRmYGBgQGfmFp+fD4gyh2kWI0kH5CUD4g2gOAD0s0g2gAkG0D0AYn2w1DygdTwh+E/Pn4h348k+0e6H9H8gKz2P13jF4W0gOAD0v33HwD6v1xW5N+7oAAAAABJRU5ErkJggg==";
const png48Base64 = "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAXElEQVR4nO3OMQHAMBAEsWf/o6uK7cCC2Y12t66q7w/w6wCSBJJEEkgSSBJJIEkgSSBJJIEkgSSBJJEEkgSSBJJEEkgSSBJJIEkgSSBJJIEkgSSBJJEEkgSSRPIC2w4DkW36XioAAAAASUVORK5CYII=";
const png128Base64 = "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAdElEQVR4nO3BAQ0AAADCoPdPbQ43oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwZ5V8AAUGfD5oAAAAASUVORK5CYII=";

fs.writeFileSync(path.join(iconsDir, "icon16.png"), Buffer.from(png16Base64, "base64"));
fs.writeFileSync(path.join(iconsDir, "icon48.png"), Buffer.from(png48Base64, "base64"));
fs.writeFileSync(path.join(iconsDir, "icon128.png"), Buffer.from(png128Base64, "base64"));

console.log("Extension icons generated successfully.");
