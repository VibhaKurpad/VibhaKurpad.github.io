const STAGES = ['Just starting', 'Halfway there', 'The finished piece'];

// Each generated sheet has three stages across and two project sizes down.
const DETAILS = {
  crochet: {
    beginner: [
      ['A short chain and the first rows of your pink practice square.', 'A few more rows, with the square beginning to take shape.', 'One small square with the yarn ends tucked away.'],
      ['A foundation chain and the first rows of coaster number one.', 'One coaster finished, with the second still on the hook.', 'Two matching cotton coasters, ready for your table.']
    ],
    intermediate: [
      ['The center ring and first clusters of a granny square.', 'The next round adds color and begins to form the corners.', 'One small granny square with four finished corners.'],
      ['The first clusters of your first mug mat.', 'One mug mat complete and the second growing in rounds.', 'Two matching granny-square mug mats with tidy edges.']
    ],
    advanced: [
      ['A foundation chain and the first narrow rows of moss stitch.', 'A rectangle of moss stitch, about halfway to a square.', 'One small textured coaster with a tidy edge.'],
      ['The first moss-stitch rows in sage and blush cotton.', 'One mug mat finished, and a second one underway.', 'Two textured mug mats with neatly finished borders.']
    ]
  },
  knitting: {
    beginner: [
      ['Cast-on stitches and the first rows on wooden needles.', 'A small rectangle of garter stitch with live stitches on the needle.', 'One bound-off practice square with horizontal garter ridges.'],
      ['A wider cast-on row for your cotton coaster.', 'Garter-stitch rows build up into a half-height rectangle.', 'One finished garter-stitch cotton coaster.']
    ],
    intermediate: [
      ['Cast-on stitches and the first knit-and-purl rows.', 'The pebbly seed-stitch texture begins to fill the swatch.', 'One small seed-stitch square, bound off and finished.'],
      ['A wider cast-on row for a seed-stitch coaster.', 'The seed-stitch fabric is about halfway to a square.', 'One finished seed-stitch coaster with a textured surface.']
    ],
    advanced: [
      ['Foundation rows on the needles, with a cable needle nearby.', 'The first cable crossing takes shape inside the garter border.', 'One miniature cable sampler, bound off and flattened.'],
      ['Foundation rows for a wider mug mat with a garter border.', 'Cable crossings grow down the center of the mug mat.', 'One finished cabled cotton mug mat with a simple border.']
    ]
  },
  embroidery: {
    beginner: [
      ['A faint daisy outline and the start of a stitched green stem.', 'The stem and some looped petals are stitched; the rest is still outlined.', 'One tiny pink daisy with a green stem and a simple center.'],
      ['Three daisy outlines, with the first stem partly stitched.', 'One flower is complete, with the next one partly stitched.', 'Three simple daisies finished in a small wooden hoop.']
    ],
    intermediate: [
      ['A faint botanical outline with the first stem stitches.', 'The stem and one leaf are filled; the remaining leaves are outlined.', 'One botanical sprig with satin-stitch leaves and a small bud.'],
      ['Three sprigs lightly outlined on taut cotton.', 'One sprig finished, another partly stitched, and one still outlined.', 'Three embroidered sprigs make a small flower garden.']
    ],
    advanced: [
      ['A leaf outline, direction guides, and the first shading stitches.', 'Part of the leaf is filled with overlapping shades of green.', 'One small leaf shaded with long-and-short stitch.'],
      ['A simple flower outline and the first fine petal stitches.', 'Some petals are shaded, while the others are still outlined.', 'One finished thread-painted flower with softly blended petals.']
    ]
  }
};

export function projectVisuals(craft, level, scope, projectTitle) {
  const descriptions = DETAILS[craft][level][scope];
  return STAGES.map((title, column) => ({
    title,
    src: `./assets/progress/${craft}-${level}.webp`,
    row: scope,
    column,
    description: descriptions[column],
    alt: `${projectTitle}, ${title.toLowerCase()}. ${descriptions[column]} AI-generated reference.`
  }));
}
