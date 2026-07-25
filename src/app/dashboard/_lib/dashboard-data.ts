/**
 * Representative sample data for the HeartChart Dashboard (Figma node
 * 3727:29573) — not wired to a real backend, same caveat already documented
 * for src/lib/team-members.ts on /marriage-champions.
 */

// Deterministic seeded PRNG (mulberry32) instead of Math.random(), so the
// scatter chart's dot cloud renders identically on the server and client —
// Math.random() here would produce a hydration mismatch.
function mulberry32(seed: number) {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateScatterPoints(count: number) {
  const random = mulberry32(1309);
  return Array.from({ length: count }, () => {
    // Clustered around the "Steady" center (commitment/connection both
    // mid-high) with a wide spread, matching the dense-center look in Figma.
    const commitment = Math.min(
      100,
      Math.max(0, 62 + (random() - 0.5) * 90)
    );
    const connection = Math.min(
      100,
      Math.max(0, 58 + (random() - 0.5) * 90)
    );
    return { commitment, connection };
  });
}

export const HEART_CHART_SUMMARY = {
  percentage: 50,
  completedCount: 1512,
  totalAttenders: 2800,
};

export const WE_DO_CARD = {
  coupleCount: 363,
  quote:
    "When it comes to being a listener in our relationship, I would rate myself: Excellent — I give full attention and seek to understand.",
  highlightedPhrase: "being a listener",
  nextPulseLabel: "2d 10h",
};

export const AGE_GROUPS_DATA = [
  { label: "<18", value: 7 },
  { label: "18-24", value: 7 },
  { label: "25-30", value: 15 },
  { label: "31-40", value: 27 },
  { label: "41-50", value: 14 },
  { label: "51-60", value: 16 },
  { label: "61-70", value: 7 },
  { label: "71-80", value: 5 },
  { label: "81+", value: 2 },
];

export const RELATIONSHIP_STATUS_DATA = [
  { label: "Single", value: 9 },
  { label: "Dating", value: 15 },
  { label: "Cohabiting", value: 7 },
  { label: "Engaged", value: 3 },
  { label: "Married", value: 42 },
  { label: "Remarried", value: 22 },
];

export const KIDS_DATA = [
  { label: "None", value: 25 },
  { label: "0-5 Years", value: 18 },
  { label: "In 5th Grade", value: 24 },
  { label: "6th-12th Grade", value: 17 },
  { label: "Adult Children", value: 8 },
];

export const RELATIONSHIP_HEALTH_ZONE_LABELS: Record<string, string> = {
  thriving: "Thriving",
  reliable: "Reliable",
  hopeful: "Hopeful",
  fickle: "Fickle",
  tentative: "Tentative",
  hollow: "Hollow",
  broken: "Broken",
  frayed: "Frayed",
  detached: "Detached",
  strained: "Strained",
  estranged: "Estranged",
};

export const RELATIONSHIP_HEALTH_SCATTER_POINTS = generateScatterPoints(60);

export const RELATIONSHIP_HEALTH_SUMMARY = {
  highlightedZone: "Steady",
  headline: "292 people (46%) are Comfortable but coasting",
  description:
    "These individuals report a moderate level of connection and commitment. Their relationship may not feel distressed, but it may not feel especially alive either. This is often where couples coast without realizing it.",
};

export const FULL_WIDTH_BAR_CHART_DATA = [
  { label: "Thriving", value: 33 },
  { label: "Strong", value: 25 },
  { label: "Steady", value: 20 },
  { label: "Hopeful", value: 12 },
  { label: "Reliable", value: 11 },
  { label: "Fickle", value: 9 },
  { label: "Tentative", value: 8 },
  { label: "Stuck", value: 6 },
  { label: "Detached", value: 5 },
  { label: "Shallow", value: 5 },
  { label: "Estranged", value: 4 },
  { label: "Frayed", value: 4 },
  { label: "Broken", value: 3 },
];

export const FAITH_JOURNEY_PIE = {
  title: "Faith journey breakdown for Bedford Campus",
  centerStat: "9% of people are new to following Jesus",
  segments: [
    {
      label: "Long-time follower of Jesus",
      value: 76,
      color: "--color-chart-pie-purple-700",
    },
    {
      label: "Coming back to their faith after time away",
      value: 12,
      color: "--color-chart-pie-purple-500",
    },
    {
      label: "New to following Jesus",
      value: 9,
      color: "--color-chart-pie-purple-300",
    },
    {
      label: "Don't have a personal faith",
      value: 3,
      color: "--color-chart-pie-purple-100",
    },
  ],
};

export const GOD_CONNECTION_PIE = {
  title: "Connection to God breakdown for Bedford Campus",
  centerStat: "31% of people occasionally feel connected to God",
  segments: [
    {
      label: "Feel deeply connected to God daily",
      value: 54,
      color: "--color-chart-pie-green-700",
    },
    {
      label: "Occasionally connected to God",
      value: 31,
      color: "--color-status-success",
    },
    {
      label: "Feel disconnected from God right now",
      value: 9,
      color: "--color-chart-pie-green-300",
    },
    {
      label: "Never felt personally connected to God",
      value: 6,
      color: "--color-chart-pie-green-100",
    },
  ],
};

export const CAUTION_FLAGS_DATA = [
  {
    percentage: 31,
    question: "Lack a strong support system?",
    nationalAverage: 35,
  },
  {
    percentage: 12,
    question: "Have considered divorce recently?",
    nationalAverage: 9,
  },
  {
    percentage: 23,
    question: "Feel spiritually out of sync as a couple?",
    nationalAverage: 18,
  },
];

export const EXPRESSED_NEEDS_DATA = [
  {
    percentage: 47,
    question: "Struggle with communication",
    nationalAverage: 63,
  },
  {
    percentage: 52,
    question: "Struggle with conflict",
    nationalAverage: 58,
  },
  {
    percentage: 21,
    question: "Struggle to find quality time",
    nationalAverage: 71,
  },
];

export const DASHBOARD_FILTER_GROUPS = [
  {
    label: "Gender",
    options: [
      { label: "All", value: "all" },
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
  },
  {
    label: "Relationship Status",
    options: [
      { label: "All", value: "all" },
      { label: "Married", value: "married" },
      { label: "Engaged", value: "engaged" },
      { label: "Dating", value: "dating" },
      { label: "Living together", value: "living-together" },
    ],
  },
  {
    label: "Years in Relationship",
    options: [
      { label: "All", value: "all" },
      { label: "0-5", value: "0-5" },
      { label: "6-10", value: "6-10" },
      { label: "11-30", value: "11-30" },
      { label: "31+", value: "31-plus" },
    ],
  },
  {
    label: "Kids",
    options: [
      { label: "All", value: "all" },
      { label: "None", value: "none" },
      { label: "0-5", value: "0-5" },
      { label: "6-12", value: "6-12" },
      { label: "Adult Children", value: "adult-children" },
    ],
  },
  {
    label: "Age",
    options: [
      { label: "All", value: "all" },
      { label: "18-30", value: "18-30" },
      { label: "31-40", value: "31-40" },
      { label: "41-50", value: "41-50" },
      { label: "51-60", value: "51-60" },
      { label: "61+", value: "61-plus" },
    ],
  },
];
