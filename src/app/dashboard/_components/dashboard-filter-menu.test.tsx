import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DashboardFilterMenu } from "./dashboard-filter-menu";

const GROUPS = [
  {
    label: "Gender",
    value: "all",
    options: [
      { label: "All", value: "all" },
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
  },
];

describe("DashboardFilterMenu", () => {
  it("renders each group as a radiogroup, not a tablist", () => {
    render(
      <DashboardFilterMenu
        groups={GROUPS}
        onChange={vi.fn()}
        resultCount={100}
        totalCount={200}
      />
    );

    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "All" })).toHaveAttribute(
      "aria-checked",
      "true"
    );
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
  });

  it("reports the result/total count as text", () => {
    render(
      <DashboardFilterMenu
        groups={GROUPS}
        onChange={vi.fn()}
        resultCount={100}
        totalCount={200}
      />
    );

    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText(/of 200 people/)).toBeInTheDocument();
  });

  it("calls onChange with the group label and selected value", () => {
    const onChange = vi.fn();
    render(
      <DashboardFilterMenu
        groups={GROUPS}
        onChange={onChange}
        resultCount={100}
        totalCount={200}
      />
    );

    fireEvent.click(screen.getByRole("radio", { name: "Male" }));

    expect(onChange).toHaveBeenCalledWith("Gender", "male");
  });
});
