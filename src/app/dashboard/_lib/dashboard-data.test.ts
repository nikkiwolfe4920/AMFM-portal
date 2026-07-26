import { describe, expect, it } from "vitest";

import {
  AGE_GROUPS_DATA,
  FULL_WIDTH_BAR_CHART_DATA,
  HEART_CHART_SUMMARY,
  KIDS_DATA,
  RELATIONSHIP_HEALTH_RESPONSE_COUNT,
  RELATIONSHIP_STATUS_DATA,
  WE_DO_CARD,
} from "./dashboard-data";

describe("dashboard representative data", () => {
  it("matches the current HeartChart Dashboard / premium Figma source data", () => {
    expect(HEART_CHART_SUMMARY).toMatchObject({
      percentage: 58,
      completedCount: 1512,
      totalAttenders: 2800,
    });
    expect(WE_DO_CARD.nextPulseLabel).toBe("2d 16h");

    expect(AGE_GROUPS_DATA).toEqual([
      { label: "<18", value: 7 },
      { label: "18-24", value: 7 },
      { label: "25-30", value: 11 },
      { label: "31-40", value: 16 },
      { label: "41-50", value: 21 },
      { label: "51-60", value: 14 },
      { label: "61-70", value: 12 },
      { label: "71-80", value: 9 },
      { label: "81+", value: 3 },
    ]);

    expect(RELATIONSHIP_STATUS_DATA).toEqual([
      { label: "Single", value: 9 },
      { label: "Dating", value: 13 },
      { label: "Cohabiting", value: 7 },
      { label: "Engaged", value: 3 },
      { label: "Married", value: 42 },
      { label: "Remarried", value: 23 },
    ]);

    expect(KIDS_DATA).toEqual([
      { label: "None", value: 25 },
      { label: "0-5 Years", value: 12 },
      { label: "K-5th Grade", value: 38 },
      { label: "6th-12th Grade", value: 17 },
      { label: "Adult Children", value: 8 },
    ]);

    expect(FULL_WIDTH_BAR_CHART_DATA).toEqual([
      { label: "Thriving", value: 3 },
      { label: "Strong", value: 23 },
      { label: "Steady", value: 20 },
      { label: "Hopeful", value: 13 },
      { label: "Reliable", value: 11 },
      { label: "Fickle", value: 7 },
      { label: "Tentative", value: 3 },
      { label: "Stuck", value: 6 },
      { label: "Detached", value: 4 },
      { label: "Shallow", value: 1 },
      { label: "Estranged", value: 2 },
      { label: "Frayed", value: 4 },
      { label: "Broken", value: 3 },
    ]);
  });

  it("keeps the representative response count aligned with the Figma legend", () => {
    expect(RELATIONSHIP_HEALTH_RESPONSE_COUNT).toBe(1309);
  });
});
