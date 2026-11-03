#!/usr/bin/env node
'use strict';

// Regression contract for rendered HTML export: the book lives in the renderer iframe,
// so the UI must request its HTML through renderer-bridge rather than query the parent DOM.
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const bridge = fs.readFileSync(path.join(root, 'renderer-bridge.js'), 'utf8');
const start = app.indexOf('async function exportRenderedHTML()');
const end = app.indexOf('\nwindow.exportRenderedHTML', start);
assert(start >= 0 && end > start, 'exportRenderedHTML must be defined and exported');
const exporter = app.slice(start, end);

assert(/getElementById\(['"]render-frame['"]\)/.test(exporter), 'exporter must locate the renderer iframe');
assert(/postMessage\(\{\s*type:\s*['"]getHTML['"]\s*,\s*requestId\s*\}/.test(exporter), 'exporter must request HTML through renderer-bridge with a requestId');
assert(/event\.source\s*!==\s*frame\.contentWindow/.test(exporter), 'exporter must accept responses only from its iframe');
assert(/msg\.type\s*!==\s*['"]html-result['"]\s*\|\|\s*msg\.requestId\s*!==\s*requestId/.test(exporter), 'exporter must correlate the html-result response');
assert(!/document\.getElementById\(['"]book-container['"]\)/.test(exporter), 'exporter must not look for the iframe book-container in the parent document');
assert(/frame\.contentDocument/.test(exporter), 'exporter must read renderer document context for CSS variables');
assert(/pageCount\s*<\s*1/.test(exporter), 'exporter must reject empty render results');

const handlerStart = bridge.indexOf("} else if (msg.type === 'getHTML') {");
const handlerEnd = bridge.indexOf("} else if (msg.type === 'print') {", handlerStart);
assert(handlerStart >= 0 && handlerEnd > handlerStart, 'renderer bridge must implement getHTML');
const handler = bridge.slice(handlerStart, handlerEnd);
assert(/requestId:\s*msg\.requestId/.test(handler), 'bridge must echo the requestId');
assert(/pageCount/.test(handler) && /querySelectorAll\(['"]\.a4-page['"]\)/.test(handler), 'bridge must return rendered page count');
assert(/html-result/.test(handler), 'bridge must return html-result');

console.log('PASS: rendered HTML export uses the iframe bridge and validates the rendered page count.');
