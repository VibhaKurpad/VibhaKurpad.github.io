import { projectVisuals } from './project-visuals.js';

export const LEVELS = { beginner: 'Just starting', intermediate: 'A little practice', advanced: 'Feeling confident' };
export const MINUTES = [15, 30, 45, 60];
// Preserve the original key so a name change does not erase anyone's saved plan.
export const STORAGE_KEY = 'petal-and-purl.plan.v1';
const item = (name, quantity, detail, query) => ({ name, quantity, detail, query: query || name });
const common = [item('Small scissors', '1 pair', 'Any sharp craft scissors you already own will do.'), item('Tape measure', '1', 'A ruler works just as well for these small projects.')];
const yarn = item('Worsted-weight cotton yarn', '1 ball · 50–100 g', 'Choose a light, solid color so your stitches are easy to see. Match the hook or needles to the yarn label.', 'worsted cotton yarn weight 4');

export const CRAFTS = {
  crochet: {
    name: 'Crochet', icon: '✿',
    supplies: [yarn, item('Crochet hook', '1 · about 5 mm', 'The yarn label takes priority. An ergonomic handle can be comfortable for practice.', '5 mm crochet hook'), item('Tapestry needle', '1 blunt needle', 'Choose a large eye for weaving in yarn ends.', 'yarn tapestry needle'), item('Locking stitch markers', '2–4', 'Mark the first and last stitch. Safety pins can work too.', 'locking crochet stitch markers'), ...common],
    videos: [
      { id: 'GcOzdAzmtNM', title: 'Crochet for absolute beginners, episode one', creator: 'Bella Coco', popularity: '24M+ views', note: 'Start with holding the hook, slip knots, and chains.' },
      { id: 'npIsh-o9AM0', title: 'How to crochet a granny square', creator: 'Bella Coco', popularity: 'Popular project lesson', note: 'A useful next step for working in rounds and changing colors.' }
    ],
    tip: 'Bella Coco uses UK terminology. UK double crochet is US single crochet; UK treble is US double crochet. Follow one set of terms throughout your project.',
    projects: {
      beginner: [
        { title: 'Your first little crochet square', description: 'A palm-sized practice square. A small finish is still a finish.', target: 'One 5–7 cm square', query: 'crochet small single crochet square beginner tutorial', steps: ['Try slip knots, chains, and US single crochet. Aim for relaxed hands rather than perfect tension.', 'Chain about 11. Work 10 US single crochet stitches across. Make a turning chain and count 10 stitches each row.', 'Add a few rows and count the stitches. Stop at a square, about 5–7 cm; fewer rows are fine if time is tight.', 'Fasten off and weave in both ends with a tapestry needle. Flatten the square with your hands.'] },
        { title: 'A cozy little coaster duo', description: 'Two soft cotton coasters for your tea, your desk, or someone you love.', target: 'Two 9–10 cm cotton coasters', query: 'single crochet square cotton coaster beginner tutorial', steps: ['Practice a chain and US single crochet on a small swatch. Count the stitches at the end of each row.', 'Chain about 16 and work 15 US single crochet stitches per row. Adjust the starting chain for a width of 9–10 cm.', 'Keep working until the first coaster is square, then make a second to match. A single finished coaster is a lovely fallback.', 'Fasten off, weave in loose ends, and gently flatten. Let damp cotton dry fully before putting it away.'] }
      ],
      intermediate: [
        { title: 'A sweet granny square', description: 'A little color play and a satisfying finish, one round at a time.', target: 'One 3–4 round granny square', query: 'Bella Coco granny square tutorial', steps: ['Refresh clusters, corner spaces, and joining rounds using the granny-square lesson.', 'Make the center ring and the first round. Check that there are four corners before continuing.', 'Work three or four rounds, turning if your chosen pattern calls for it. Try one color change if time allows.', 'Join neatly, weave in ends securely, and flatten the square.'] },
        { title: 'Granny-square mug mats', description: 'A pair of cheerful squares with tidy edges and a little color.', target: 'Two 10–12 cm granny squares', query: 'Bella Coco solid granny square coaster tutorial', steps: ['Watch the granny-square lesson and choose two or three cotton colors. Practice an invisible color change on a swatch.', 'Work the first square in rounds. Keep all four corners aligned and measure as you go.', 'Finish one 10–12 cm square, then make a matching square. Count clusters on every side to keep it even.', 'Weave in each color securely and gently block both squares to matching dimensions.'] }
      ],
      advanced: [
        { title: 'A textured crochet coaster', description: 'A small canvas for a new stitch and a crisp, careful edge.', target: 'One 8–10 cm textured square', query: 'crochet moss stitch cotton coaster tutorial', steps: ['Swatch moss stitch and check your gauge with the cotton yarn. Choose a starting chain for an 8–10 cm width.', 'Begin the coaster using the stitch multiple in your chosen moss-stitch tutorial.', 'Work the textured rows, keeping the edges straight. Stop at a square.', 'Add a simple border only if time allows. Weave in ends and block flat.'] },
        { title: 'A pair of textured mug mats', description: 'Moss stitch, thoughtful colors, and a beautifully finished border.', target: 'Two 10–12 cm textured coasters', query: 'crochet moss stitch coaster border tutorial', steps: ['Swatch moss stitch with two cotton colors. Confirm the stitch multiple and finished width before starting.', 'Begin a 10–12 cm coaster, using the color changes from your selected tutorial.', 'Complete the first mat and repeat for the second. Keep notes so both are the same size.', 'Add a tidy single-crochet border, weave in ends, and block both pieces flat.'] }
      ]
    }
  },
  knitting: {
    name: 'Knitting', icon: '❋',
    supplies: [yarn, item('Straight knitting needles', '1 pair · about 5 mm', 'Use the size recommended on your yarn label. Wood or bamboo grips the yarn well.', '5 mm bamboo straight knitting needles'), item('Tapestry needle', '1 blunt needle', 'A large eye makes it easier to weave in the ends.', 'yarn tapestry needle'), item('Stitch markers', '2', 'Optional for these small squares, but helpful for marking a pattern repeat.', 'knitting stitch markers'), ...common],
    videos: [
      { id: 'Egp4NRhlMDg', title: 'The knit stitch for total beginners', creator: 'Sheep & Stitch', popularity: '6M+ views', note: 'Close-up practice for the stitch that makes garter stitch.' },
      { id: '1vm6oaYzHyA', title: 'How to cast on for total beginners', creator: 'Sheep & Stitch', popularity: 'Popular foundation lesson', note: 'Learn how to get the first stitches onto your needle.' }
    ],
    tip: 'Knit every row for garter stitch. For ribbing or seed stitch, check your project tutorial for knit and purl repeats before casting on. Use the small practice session to test them.',
    projects: {
      beginner: [
        { title: 'Your first knitted square', description: 'A tiny garter-stitch sampler to keep as your first handmade milestone.', target: 'One 5–7 cm practice square', query: 'Sheep and Stitch garter stitch beginner square bind off', steps: ['Watch the cast-on and knit-stitch lessons. Practice a relaxed grip with the needles.', 'Cast on about 10–12 stitches. Knit every stitch of every row for garter stitch.', 'Work a few rows at a time, counting stitches. Stop when the little piece is roughly square.', 'Bind off loosely using a beginner bind-off lesson. Weave in the two yarn ends.'] },
        { title: 'A little garter-stitch coaster', description: 'A soft cotton square and the lovely rhythm of one simple stitch.', target: 'One 10–12 cm cotton coaster', query: 'knit garter stitch cotton coaster beginner bind off tutorial', steps: ['Learn casting on and the knit stitch. Make a short swatch and count the stitches across.', 'Cast on enough stitches for 10–12 cm, roughly 20–24 depending on your gauge. Knit every row.', 'Keep knitting until the piece is square. Count stitches regularly to catch accidental increases.', 'Bind off loosely, weave in ends, and flatten gently. Let damp cotton dry fully.'] }
      ],
      intermediate: [
        { title: 'A seed-stitch swatch', description: 'A tiny study in texture, with knits and purls taking turns.', target: 'One 6–8 cm seed-stitch square', query: 'Sheep and Stitch seed stitch tutorial', steps: ['Refresh knit and purl stitches and the seed-stitch repeat. Make a tiny tension swatch.', 'Cast on an odd number of stitches for a 6–8 cm width. Follow your tutorial for alternating knits and purls.', 'Work the seed-stitch rows. Read the previous row so knits sit above purls and purls above knits.', 'Bind off in pattern if comfortable, weave in ends, and flatten the square.'] },
        { title: 'A seed-stitch cotton coaster', description: 'A pebbly texture and a small project you can settle into.', target: 'One 10–12 cm seed-stitch coaster', query: 'Sheep and Stitch seed stitch tutorial coaster', steps: ['Swatch seed stitch and measure the gauge. Choose an odd stitch count for a 10–12 cm width.', 'Cast on and begin the alternating knit/purl repeat in your chosen tutorial.', 'Continue until square. Check the texture at the start of each row and correct repeats early.', 'Bind off in pattern, weave in ends, and block lightly to keep the edges neat.'] }
      ],
      advanced: [
        { title: 'A miniature cable sampler', description: 'One little cable, framed in garter stitch, for a satisfying technique break.', target: 'One 6–8 cm cable swatch', query: 'small cable knitting swatch cable needle tutorial', steps: ['Choose a simple four-stitch cable repeat with a garter border. Check the cable-cross direction on a practice row.', 'Cast on for one cable repeat and a small border, following your chosen tutorial.', 'Work one or two cable repeats. Check the reverse side and keep a row tally.', 'Bind off and weave in ends. Block the sampler gently to show the cable.'] },
        { title: 'A cabled cotton mug mat', description: 'A single cable with a simple border. Small enough to finish, detailed enough to enjoy.', target: 'One 10–12 cm cabled mug mat', query: 'knit cable coaster garter border tutorial', steps: ['Choose a small cable-coaster tutorial. Swatch the cable repeat and check the finished gauge.', 'Cast on for a 10–12 cm square with a garter border. Begin the foundation rows from your chosen pattern.', 'Work the cable repeats, recording rows and keeping the border consistent on each side.', 'Finish the top border, bind off, weave in ends, and block flat.'] }
      ]
    }
  },
  embroidery: {
    name: 'Embroidery', icon: '✾',
    supplies: [item('Cotton fabric', '1 piece · about 25 × 25 cm', 'Choose plain, tightly woven cotton. Leave at least 5 cm around your hoop.', 'plain cotton embroidery fabric'), item('Embroidery hoop', '1 · 10–15 cm', 'A small hoop keeps this project manageable. Tighten until the fabric is smooth.', '4 inch 6 inch embroidery hoop'), item('Stranded embroidery floss', '3 colors · 1 skein each', 'A flower color, a leaf color, and an accent. Separate the strands as your tutorial directs.', 'cotton stranded embroidery floss'), item('Embroidery needles', '1 pack · sizes 5–9', 'Match the needle eye to the number of floss strands you use.', 'embroidery needles size 5 9'), item('Washable fabric pen', '1', 'Test on scrap fabric first. A faint pencil line can also work on light cotton.', 'water soluble embroidery marking pen'), item('Small scissors', '1 pair', 'Use sharp scissors for clean thread ends.')],
    videos: [
      { id: 'QBQ_a0WrE3Y', title: '50 must-know embroidery stitches', creator: 'HandiWorks', popularity: '1M+ views', note: 'A stitch reference, not a homework list. Learn only the stitches your small project needs.' }
    ],
    tip: 'Use only the chapters you need. Backstitch starts at 0:31, stem stitch at 1:50, lazy daisy at 4:00, and satin stitch at 4:30 in the HandiWorks reference. Try each stitch on scrap cotton first.',
    projects: {
      beginner: [
        { title: 'A tiny stitched daisy', description: 'A little flower, a few patient stitches, and your very first hoop.', target: 'One 2–3 cm daisy motif', query: 'beginner lazy daisy embroidery flower stem stitch tutorial', steps: ['Hoop scrap cotton and try backstitch and lazy daisy. Use two or three floss strands to start.', 'Draw one small daisy and a short stem on your fabric. Keep the whole design 2–3 cm tall.', 'Stitch a short backstitch stem and six lazy-daisy petals. Use a few straight stitches for the center.', 'Secure thread ends on the back, check for loose loops, and trim the tails. Keep the fabric in the hoop.'] },
        { title: 'Your own little daisy hoop', description: 'Three soft flowers to brighten a corner of your home.', target: 'Three simple daisies in a small hoop', query: 'beginner lazy daisy embroidery three flowers hoop tutorial', steps: ['Practice backstitch and lazy-daisy petals on scrap fabric. Use two or three floss strands.', 'Hoop the cotton and sketch three simple daisies with stems. Keep each flower about 2 cm across.', 'Stitch the stems first, then add lazy-daisy petals and a few straight stitches for each flower center.', 'Secure thread ends, check the fabric tension, and trim excess fabric, leaving enough to tuck behind the hoop.'] }
      ],
      intermediate: [
        { title: 'A little botanical sprig', description: 'A tiny stem with satin-stitch leaves and just a touch of color.', target: 'One 4–5 cm botanical sprig', query: 'embroidery satin stitch leaves stem stitch small sprig tutorial', steps: ['Practice stem stitch and a small satin-stitch leaf. Keep the fabric taut without distorting it.', 'Sketch a 4–5 cm curved stem with three small leaves. Mark the center vein of each leaf.', 'Work the stem, then fill the leaves in short satin stitches. Add a small bud if time allows.', 'Secure the tails and inspect the back. Adjust hoop tension and gently remove any washable guidelines as directed.'] },
        { title: 'A pocket-sized flower garden', description: 'A few stems, a handful of blooms, and space to try a new stitch.', target: 'Three sprigs in a 10–15 cm hoop', query: 'embroidery small botanical hoop satin stitch lazy daisy tutorial', steps: ['Choose a small design with stem stitch, satin stitch, and lazy daisy. Practice the least familiar stitch.', 'Sketch three sprigs and mark the leaf direction. Keep open space between each flower.', 'Work stems first, fill the leaves, and stitch the blooms one at a time. Repeat a small color palette.', 'Secure all threads and remove guidelines according to the pen instructions. Tuck the fabric neatly behind the hoop.'] }
      ],
      advanced: [
        { title: 'A miniature thread-painted leaf', description: 'A little gradient study in long-and-short stitch, with room to experiment.', target: 'One 2–3 cm shaded leaf', query: 'embroidery thread painting leaf long short stitch tutorial', steps: ['Choose three neighboring floss shades. Practice long-and-short stitch with one strand on scrap cotton.', 'Draw a single 2–3 cm leaf, marking the center vein and the direction of the stitches.', 'Fill the leaf in small overlapping rows, blending light to dark. Keep the stitches following the leaf shape.', 'Add a fine center vein if needed, secure the ends, and check the shading from a little distance.'] },
        { title: 'A tiny thread-painted bloom', description: 'A small floral study in gentle shading and careful detail.', target: 'One 3–4 cm shaded flower', query: 'small flower thread painting long short stitch embroidery tutorial', steps: ['Choose a simple flower tutorial and three neighboring shades. Swatch long-and-short stitch with one strand.', 'Transfer one 3–4 cm flower and mark petal directions. Keep the outline simple to fit your available time.', 'Fill one petal at a time, overlapping long-and-short stitches to blend shades. Finish the center last.', 'Secure the ends, remove any suitable guidelines, and finish the hoop back neatly.'] }
      ]
    }
  }
};

const aliases = { crochet: 'crochet', crocheting: 'crochet', knit: 'knitting', knitting: 'knitting', embroidery: 'embroidery', 'hand embroidery': 'embroidery', embroider: 'embroidery' };
export function normalizeCraft(value) {
  if (typeof value !== 'string') return null;
  const key = value.trim().toLowerCase();
  return Object.hasOwn(aliases, key) ? aliases[key] : null;
}
export function validateOptions(options) {
  if (!options || !Object.hasOwn(CRAFTS, options.craft) || !Object.hasOwn(LEVELS, options.level) || !MINUTES.includes(options.minutes) || ![7, 14].includes(options.days)) throw new Error('Choose crochet, knitting, or embroidery, a skill level, and a daily time of 15–60 minutes.');
  return { craft: options.craft, level: options.level, minutes: options.minutes, days: options.days };
}
export function shoppingLinks(query) {
  return [
    { name: 'Michaels', url: `https://www.michaels.com/search?q=${encodeURIComponent(query)}` },
    { name: 'Amazon', url: `https://www.amazon.com/s?k=${encodeURIComponent(query)}` },
    { name: 'Hobby Lobby', url: `https://www.hobbylobby.com/search?text=${encodeURIComponent(query)}` }
  ];
}
export function generatePlan(input) {
  const options = validateOptions(input);
  const craft = CRAFTS[options.craft];
  const activeDays = options.days === 7 ? 6 : 12;
  const totalMinutes = activeDays * options.minutes;
  const scope = totalMinutes >= 240 ? 1 : 0;
  const project = craft.projects[options.level][scope];
  const visuals = projectVisuals(options.craft, options.level, scope, project.title);
  const supplies = craft.supplies.map(supply => ({ ...supply }));
  if (options.craft === 'crochet' && options.level !== 'beginner') supplies[0] = { ...supplies[0], quantity: '2 colors · 100 g total' };
  if (options.craft === 'knitting' && options.level === 'advanced') supplies.push(item('Cable needle', '1', 'Choose a cable needle close to your working needle size.', '5 mm cable needle'));
  if (options.craft === 'embroidery' && options.level === 'advanced') supplies[2] = { ...supplies[2], detail: 'Choose three neighboring shades for blending. Use one strand for the shaded stitches.' };
  const restDays = options.days === 7 ? [3] : [4, 10];
  const phases = options.days === 7 ? [0, 1, 2, 2, 3, 4] : [0, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 4];
  const titles = ['Get to know your materials', 'Make a small beginning', 'One little section at a time', 'The finishing touches', 'Look what you made'];
  const schedule = [];
  let session = 0;
  for (let index = 0; index < options.days; index++) {
    if (restDays.includes(index)) {
      schedule.push({ day: index + 1, title: 'A little breathing room', detail: 'Rest your hands, catch up on a missed session, or simply leave your project for tomorrow. No extra work is required.', minutes: 0, rest: true, milestone: '' });
      continue;
    }
    const phase = phases[session++];
    const final = phase === 4;
    const lastInPhase = phases[session] !== phase;
    schedule.push({ day: index + 1, title: titles[phase], detail: final ? `Check your finished piece against your goal: ${project.target.toLowerCase()}. Take a photo, note one thing you learned, and stop here. If it needs more time, keep the same small daily sessions.` : project.steps[phase] + (phase === 2 ? ' Continue from where you stopped last time, and put it down when your timer ends.' : ''), minutes: final ? Math.min(15, options.minutes) : options.minutes, rest: false, milestone: lastInPhase ? ['A stitch you understand', 'Your project is underway', 'Your main piece is made', 'Ends tucked, details finished', 'Celebrate your small finish'][phase] : '' });
  }
  return { options, craftName: craft.name, icon: craft.icon, project, visuals, supplies, videos: craft.videos, tutorialTip: craft.tip, schedule, totalMinutes: schedule.reduce((sum, day) => sum + day.minutes, 0), activeDays };
}
export function restoreSaved(raw) {
  try {
    const saved = JSON.parse(raw);
    if (saved?.version !== 1) return null;
    const plan = generatePlan(saved.options);
    const indices = (values, length) => Array.isArray(values) ? [...new Set(values.filter(value => Number.isInteger(value) && value >= 0 && value < length))] : [];
    return { plan, supplies: indices(saved.supplies, plan.supplies.length), days: indices(saved.days, plan.schedule.length) };
  } catch { return null; }
}
