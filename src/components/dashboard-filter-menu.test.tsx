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
    const { container } = render(
      <DashboardFilterMenu
        groups={GROUPS}
        onChange={vi.fn()}
        resultCount={100}
        totalCount={200}
      />
    );

    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    expect(container.firstElementChild).toHaveClass("rounded-xl", "border", "p-4");
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

  it("caps a group's chip row to its wrapClassName so options stack instead of flowing in one row", () => {
    render(
      <DashboardFilterMenu
        groups={[{ ...GROUPS[0], wrapClassName: "max-w-[62px]" }]}
        onChange={vi.fn()}
        resultCount={100}
        totalCount={200}
      />
    );

    expect(screen.getByRole("radiogroup")).toHaveClass("max-w-[62px]");
  });
});
