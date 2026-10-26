// Tutorial videos and the chapters each plan step points to.
// Chapter times come from each creator's own YouTube chapters, checked October 26, 2026.
// View counts are rounded snapshots from the same date, not live rankings.
const video = (id, title, creator, popularity, length, note) => ({ id, title, creator, popularity, length, note });
const at = (minutes, seconds) => minutes * 60 + seconds;

export const VIDEOS = {
  crochetBasics: video('Ik-GSXWoSak', 'How to single crochet: beginner lesson 1', 'GoodKnitKisses', '7M+ views', at(16, 19), 'Slow, close-up US single crochet, from the slip knot to weaving in your ends.'),
  grannySquare: video('npIsh-o9AM0', 'How to crochet a granny square for beginners', 'Bella Coco', '13M+ views', at(24, 26), 'Round by round, with corners and a color change. Uses UK terms.'),
  mossStitch: video('89q2to9adCk', 'Crochet moss stitch (easy and beginner friendly)', 'Fiber Flux', '210K+ views', at(12, 23), 'The stitch multiple, starting chain, and color changes for a textured fabric.'),
  knitBasics: video('SpfLTb56fMc', 'How to knit for total beginners: step-by-step', 'Sheep & Stitch', '1.9M+ views', at(34, 35), 'Cast on, knit, fix common mistakes, cast off, and weave in ends, with slow repeats.'),
  seedStitch: video('gfc1D9lAFhI', 'How to knit seed stitch the easy way', 'Sheep & Stitch', '470K+ views', at(9, 45), 'A one-row repeat for an odd number of stitches, plus a second method.'),
  cables: video('4XEvjxvbZxo', "A beginner's guide to knitting cables", 'B.Hooked Knitting', '340K+ views', at(10, 19), 'How a cable twists, the tools you need, a practice swatch, and reading cable patterns.'),
  embroideryBasics: video('V95uh5nQZic', '13 hand embroidery stitches for beginners', 'Cutesy Crafts', '1.2M+ views', at(21, 51), 'Securing your thread, back stitch, straight stitch, lazy daisy, and more.'),
  embroideredLeaves: video('7riGZzsP4go', 'How to embroider leaves: 10 ways', 'Sarah Homfray Embroidery', '500K+ views', at(50, 8), 'Satin-stitch and detached-chain leaves, plus eight more leaf styles.'),
  threadPaintedLeaf: video('o9Xylwx1qVk', 'Thread painting embroidery for beginners: leaf tutorial', 'Crewel Ghoul Embroidery', '150K+ views', at(23, 35), 'Long-and-short stitch basics, shading, blending, and veins on one leaf.'),
  threadPaintedBloom: video('jWsweN3Xgro', 'Threadpaint like a pro in 10 minutes', 'Allie Paige Art', '46K+ views', at(10, 53), 'Planning a design, then dark, mid, and light tones for a soft blend.')
};

// Each watch list has four phases: practice, beginning, main work, finishing.
// The final "look what you made" day and rest days have no video.
const ref = (key, minutes, seconds, label) => ({ key, start: at(minutes, seconds), label });
const crochetFinish = [ref('crochetBasics', 12, 19, 'Fasten off'), ref('crochetBasics', 12, 25, 'Weave in ends')];
const knitFinish = [ref('knitBasics', 27, 3, 'Cast off'), ref('knitBasics', 31, 53, 'Weave in ends')];
const secureThread = ref('embroideryBasics', 0, 24, 'Secure your thread');

export const LESSONS = {
  crochet: {
    beginner: {
      tip: 'This lesson uses US terms, just like your plan. Practice the chain and single crochet until they feel relaxed, not perfect.',
      watch: [[
        [ref('crochetBasics', 2, 18, 'Slip knot'), ref('crochetBasics', 3, 20, 'Foundation chain'), ref('crochetBasics', 6, 19, 'Single crochet')],
        [ref('crochetBasics', 6, 5, 'Count your chain'), ref('crochetBasics', 9, 14, 'Single crochet to the end'), ref('crochetBasics', 10, 11, 'Turning chain')],
        [ref('crochetBasics', 9, 51, 'Count your stitches'), ref('crochetBasics', 10, 11, 'Next row'), ref('crochetBasics', 11, 49, 'Pausing mid-project')],
        crochetFinish
      ]]
    },
    intermediate: {
      tip: 'Bella Coco uses UK terms. UK treble is US double crochet, and UK double crochet is US single. Pick one set of terms and stick with it.',
      watch: [[
        [ref('grannySquare', 4, 19, 'Slip knot and chain'), ref('grannySquare', 7, 12, 'Clusters in round 1')],
        [ref('grannySquare', 6, 36, 'Making the circle'), ref('grannySquare', 7, 12, 'Round 1 and corners')],
        [ref('grannySquare', 11, 40, 'Round 2'), ref('grannySquare', 15, 29, 'Round 3'), ref('grannySquare', 19, 5, 'Round 4')],
        [ref('grannySquare', 22, 27, 'Changing color'), ref('crochetBasics', 12, 25, 'Weave in ends')]
      ], [
        [ref('grannySquare', 7, 12, 'Clusters in round 1'), ref('grannySquare', 22, 27, 'Changing color')],
        [ref('grannySquare', 6, 36, 'Making the circle'), ref('grannySquare', 7, 12, 'Round 1'), ref('grannySquare', 11, 40, 'Round 2')],
        [ref('grannySquare', 15, 29, 'Round 3'), ref('grannySquare', 19, 5, 'Round 4'), ref('grannySquare', 22, 27, 'Changing color')],
        [ref('crochetBasics', 12, 25, 'Weave in ends')]
      ]]
    },
    advanced: {
      tip: 'Moss stitch is a single crochet and a chain, worked into the chain spaces below. Check the stitch multiple before you chain.',
      watch: [[
        [ref('mossStitch', 0, 47, 'Stitch multiple'), ref('mossStitch', 0, 58, 'Starting chain')],
        [ref('mossStitch', 1, 43, 'Row one'), ref('mossStitch', 3, 59, 'Row two')],
        [ref('mossStitch', 3, 59, 'Row two, repeated'), ref('mossStitch', 9, 42, 'Repeating rows')],
        crochetFinish
      ], [
        [ref('mossStitch', 0, 47, 'Stitch multiple'), ref('mossStitch', 7, 13, 'Changing color')],
        [ref('mossStitch', 0, 58, 'Starting chain'), ref('mossStitch', 1, 43, 'Row one')],
        [ref('mossStitch', 7, 13, 'Row two in a new color'), ref('mossStitch', 9, 42, 'Adding more colors')],
        crochetFinish
      ]]
    }
  },
  knitting: {
    beginner: {
      tip: 'Knit every row for garter stitch. If the fabric gets wider, check the common mistakes chapter before you keep going.',
      watch: [[
        [ref('knitBasics', 0, 55, 'Materials'), ref('knitBasics', 2, 48, 'Cast on'), ref('knitBasics', 12, 25, 'Knit stitch')],
        [ref('knitBasics', 2, 48, 'Cast on'), ref('knitBasics', 12, 25, 'Knit stitch')],
        [ref('knitBasics', 12, 25, 'Knit stitch'), ref('knitBasics', 21, 25, 'Common mistakes')],
        knitFinish
      ]]
    },
    intermediate: {
      tip: 'With an odd number of stitches, seed stitch is just knit 1, purl 1 on every row. Knit the purls and purl the knits.',
      watch: [[
        [ref('seedStitch', 0, 49, 'The one-row repeat'), ref('seedStitch', 4, 0, 'A second method')],
        [ref('knitBasics', 2, 48, 'Cast on'), ref('seedStitch', 0, 49, 'The one-row repeat')],
        [ref('seedStitch', 0, 49, 'Reading your stitches'), ref('knitBasics', 21, 25, 'Common mistakes')],
        knitFinish
      ]]
    },
    advanced: {
      tip: 'Hold the cable needle in front for a left-leaning cross and behind for a right-leaning one. Check your pattern before each cable row.',
      watch: [[
        [ref('cables', 0, 29, 'How cables twist'), ref('cables', 1, 29, 'Tools and supplies')],
        [ref('cables', 3, 57, 'Starting the cable swatch'), ref('cables', 7, 12, 'Reading cable patterns')],
        [ref('cables', 5, 45, 'The cable row'), ref('cables', 7, 12, 'Reading cable patterns')],
        knitFinish
      ]]
    }
  },
  embroidery: {
    beginner: {
      tip: 'Start with two or three strands of floss. Back stitch makes the stems, and lazy daisy makes the petals.',
      watch: [[
        [secureThread, ref('embroideryBasics', 2, 0, 'Back stitch'), ref('embroideryBasics', 9, 7, 'Lazy daisy')],
        [ref('embroideryBasics', 2, 0, 'Back stitch'), ref('embroideryBasics', 9, 7, 'Lazy daisy')],
        [ref('embroideryBasics', 2, 0, 'Back stitch stems'), ref('embroideryBasics', 9, 7, 'Lazy daisy petals'), ref('embroideryBasics', 7, 12, 'Straight-stitch centers')],
        [secureThread]
      ]]
    },
    intermediate: {
      tip: 'Sarah calls lazy daisy "detached chain". Stitch satin leaves at a slight angle for a smoother edge.',
      watch: [[
        [ref('embroideredLeaves', 18, 33, 'Satin-stitch leaf'), ref('embroideryBasics', 3, 57, 'Stem stitch')],
        [ref('embroideredLeaves', 18, 33, 'Satin-stitch leaf direction'), ref('embroideredLeaves', 0, 26, 'Detached-chain leaf')],
        [ref('embroideryBasics', 3, 57, 'Stem stitch'), ref('embroideredLeaves', 18, 33, 'Satin stitch'), ref('embroideredLeaves', 0, 26, 'Detached chain')],
        [secureThread]
      ]]
    },
    advanced: {
      tip: 'Use one strand for thread painting. Work light to dark, and let each new row overlap the last.',
      watch: [[
        [ref('threadPaintedLeaf', 1, 26, 'Supplies'), ref('threadPaintedLeaf', 5, 39, 'Long-and-short basics')],
        [ref('threadPaintedLeaf', 10, 7, 'Shading and starting the leaf')],
        [ref('threadPaintedLeaf', 14, 40, 'Stitching the leaf'), ref('threadPaintedLeaf', 17, 51, 'Blending colors')],
        [ref('threadPaintedLeaf', 21, 31, 'Adding veins')]
      ], [
        [ref('threadPaintedLeaf', 5, 39, 'Long-and-short basics'), ref('threadPaintedBloom', 0, 56, 'Needle preparation')],
        [ref('threadPaintedBloom', 1, 50, 'Tracing and planning')],
        [ref('threadPaintedBloom', 3, 9, 'Dark tones'), ref('threadPaintedBloom', 5, 52, 'Mid-tone blending'), ref('threadPaintedBloom', 7, 28, 'Light tones')],
        [ref('threadPaintedBloom', 9, 18, 'Final details')]
      ]]
    }
  }
};

export function formatTimestamp(seconds) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}
export function videoAt(id, seconds) {
  return `https://www.youtube.com/watch?v=${encodeURIComponent(id)}&t=${seconds}s`;
}
