import test from 'node:test';
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { CRAFTS, LEVELS, MINUTES, generatePlan, normalizeCraft, restoreSaved, shoppingLinks } from '../src/planner.js';

test('every craft, level, daily time, and duration produces a bounded plan', () => {
  for (const craft of Object.keys(CRAFTS)) for (const level of Object.keys(LEVELS)) for (const minutes of MINUTES) for (const days of [7, 14]) {
    const plan = generatePlan({ craft, level, minutes, days });
    assert.equal(plan.schedule.length, days);
    assert.equal(plan.schedule.filter(day => day.rest).length, days / 7);
    assert.equal(plan.schedule.at(-1).title, 'Look what you made');
    assert.ok(plan.totalMinutes <= minutes * (days - days / 7));
    assert.ok(plan.schedule.every((day, index) => day.day === index + 1 && day.minutes <= minutes && day.detail.length > 20));
    assert.ok(plan.supplies.length >= 6);
    assert.ok(plan.videos.every(video => /^[A-Za-z0-9_-]{11}$/.test(video.id)));
  }
});
test('project scope and supplies respond to skill and time', () => {
  const options = { craft: 'crochet', level: 'beginner', days: 7, minutes: 15 };
  assert.match(generatePlan(options).project.title, /square/);
  assert.match(generatePlan({ ...options, days: 14, minutes: 30 }).project.title, /coaster/);
  assert.match(generatePlan({ ...options, level: 'advanced' }).project.title, /textured/);
  assert.ok(generatePlan({ ...options, craft: 'knitting', level: 'advanced' }).supplies.some(item => item.name === 'Cable needle'));
});
test('unknown crafts and malformed saved options cannot become plans', () => {
  assert.equal(normalizeCraft('  HAND EMBROIDERY '), 'embroidery');
  assert.equal(normalizeCraft('knit'), 'knitting');
  assert.equal(normalizeCraft('<script>alert(1)</script>'), null);
  assert.equal(normalizeCraft('__proto__'), null);
  for (const options of [null, {}, { craft: '__proto__' }, { craft: 'crochet', level: 'beginner', minutes: -5, days: 14 }, { craft: 'crochet', level: 'constructor', minutes: 30, days: 14 }]) assert.throws(() => generatePlan(options));
  for (const raw of ['{oops', null, '{"version":2}', '{"version":1,"options":{"craft":"unknown"}}']) assert.equal(restoreSaved(raw), null);
});
test('saved progress is restored with bounded, unique checklist indices', () => {
  const saved = restoreSaved(JSON.stringify({ version: 1, options: { craft: 'embroidery', level: 'advanced', minutes: 15, days: 7 }, supplies: [0, 0, 1, -1, '2', 999], days: [2, 6, 7] }));
  assert.deepEqual(saved.supplies, [0, 1]);
  assert.deepEqual(saved.days, [2, 6]);
  assert.equal(saved.plan.options.craft, 'embroidery');
});
test('shopping queries stay encoded in HTTPS links to known retailers', () => {
  const query = 'cotton & yarn #4 "pink"';
  const links = shoppingLinks(query);
  assert.deepEqual(links.map(link => new URL(link.url).hostname), ['www.michaels.com', 'www.amazon.com', 'www.hobbylobby.com']);
  for (const { url } of links) {
    const parsed = new URL(url);
    assert.equal(parsed.protocol, 'https:');
    assert.equal([...parsed.searchParams.values()][0], query);
  }
});

test('all 18 projects have three distinct visual stages backed by local image files', async () => {
  const projects = new Set();
  const files = new Set();
  for (const craft of Object.keys(CRAFTS)) for (const level of Object.keys(LEVELS)) for (const minutes of MINUTES) for (const days of [7, 14]) {
    const plan = generatePlan({ craft, level, minutes, days });
    projects.add(plan.project.title);
    assert.equal(plan.visuals.length, 3);
    assert.deepEqual(plan.visuals.map(visual => visual.column), [0, 1, 2]);
    assert.deepEqual(plan.visuals.map(visual => visual.title), ['Just starting', 'Halfway there', 'The finished piece']);
    for (const visual of plan.visuals) {
      assert.equal(visual.row, minutes * plan.activeDays >= 240 ? 1 : 0);
      assert.equal(visual.src, `./assets/progress/${craft}-${level}.webp`);
      assert.ok(visual.alt.includes(plan.project.title));
      assert.ok(visual.description.length > 20);
      files.add(visual.src);
    }
  }
  assert.equal(projects.size, 18);
  assert.equal(files.size, 9);
  await Promise.all([...files].map(file => access(new URL(`../${file}`, import.meta.url))));
});

test('every making day links to timestamped chapters from its own level videos', () => {
  for (const craft of Object.keys(CRAFTS)) for (const level of Object.keys(LEVELS)) for (const minutes of MINUTES) for (const days of [7, 14]) {
    const plan = generatePlan({ craft, level, minutes, days });
    const videos = new Map(plan.videos.map(video => [video.id, video]));
    for (const day of plan.schedule) {
      const finalDay = day.title === 'Look what you made';
      if (day.rest || finalDay) { assert.equal(day.watch.length, 0); continue; }
      assert.ok(day.watch.length >= 1, `${craft} ${level} day ${day.day} has no video chapters`);
      for (const link of day.watch) {
        const url = new URL(link.url);
        assert.equal(url.protocol, 'https:');
        assert.equal(url.hostname, 'www.youtube.com');
        const video = videos.get(url.searchParams.get('v'));
        assert.ok(video, `${link.url} is not one of this plan's videos`);
        assert.equal(url.searchParams.get('t'), `${link.start}s`);
        assert.ok(link.start >= 0 && link.start < video.length);
        assert.match(link.time, /^\d+:\d{2}$/);
        assert.ok(link.label.length > 3);
      }
    }
  }
});
test('each craft level has its own lead tutorial and tip', () => {
  for (const craft of Object.keys(CRAFTS)) {
    const plans = Object.keys(LEVELS).map(level => generatePlan({ craft, level, minutes: 30, days: 14 }));
    assert.equal(new Set(plans.map(plan => plan.videos[0].id)).size, 3);
    assert.equal(new Set(plans.map(plan => plan.tutorialTip)).size, 3);
  }
});
