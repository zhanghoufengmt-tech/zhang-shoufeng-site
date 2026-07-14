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
  'currentVideo',
  'preload="metadata"',
  'preload="none"',
  'h-[100svh]',
  'text-[2.75rem]',
  'rounded-[28px]',
  'hidden flex-wrap',
  'Golden Hour',
  'Still Water',
  'Deep Woods',
  'Quiet Dawn',
  'Get Early Access',
  'isTransitioning',
]) {
  assert.ok(appSource.includes(text), `App should include ${text}`);
}

const videoTagCount = (appSource.match(/<video/g) || []).length;

assert.equal(videoTagCount, 1, 'App should only render the active hero video');
assert.match(appSource, /<audio[^>]+loop[^>]+preload="none"/, 'BGM should not preload on page load');
assert.doesNotMatch(appSource, /<audio[^>]+autoPlay/, 'BGM should wait for user playback');
assert.match(appSource, /src=\{currentVideo\.url\}/, 'Hero video should use only the current video URL');
assert.doesNotMatch(appSource, /src=\{video\.url\}/, 'Hero should not mount every video source at once');
assert.match(appSource, /sm:rounded-full/, 'Mobile form should avoid a tall rounded-full pill');
assert.match(appSource, /hidden flex-wrap[\s\S]+sm:flex/, 'Stats should be hidden on mobile');
assert.doesNotMatch(appSource, /How It Works/, 'App should not include How It Works');
assert.doesNotMatch(appSource, /Pricing/, 'App should not include Pricing');
assert.match(cssSource, /\.liquid-glass/, 'CSS should define the liquid glass class');
assert.match(cssSource, /train-bob/, 'CSS should define the train bob animation');
assert.match(cssSource, /max-width:\s*639px/, 'CSS should include mobile performance styles');
