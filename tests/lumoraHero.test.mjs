import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const appSource = await readFile(new URL('../src/App.tsx', import.meta.url), 'utf8');
const cssSource = await readFile(new URL('../src/index.css', import.meta.url), 'utf8');

for (const text of [
  'brandLabel',
  'heroTitle',
  'bgmSource',
  './audio/bgm.mp3',
  'audioRef',
  'Play BGM',
  'Golden Hour',
  'Still Water',
  'Deep Woods',
  'Quiet Dawn',
  'Get Early Access',
  'isTransitioning',
]) {
  assert.match(appSource, new RegExp(text), `App should include ${text}`);
}

assert.match(appSource, /<audio[^>]+autoPlay[^>]+loop/, 'App should autoplay and loop BGM');
assert.doesNotMatch(appSource, /How It Works/, 'App should not include How It Works');
assert.doesNotMatch(appSource, /Pricing/, 'App should not include Pricing');
assert.match(cssSource, /\.liquid-glass/, 'CSS should define the liquid glass class');
assert.match(cssSource, /train-bob/, 'CSS should define the train bob animation');
