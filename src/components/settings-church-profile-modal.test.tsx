import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ChurchProfileSettingsModal } from "./settings-church-profile-modal";

describe("ChurchProfileSettingsModal", () => {
  it("renders the Figma settings church-profile modal with reusable settings shell anatomy", () => {
    render(
      <ChurchProfileSettingsModal
        trigger={<button type="button">Open church profile settings</button>}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Open church profile settings" }));

    const dialog = screen.getByRole("dialog", { name: "Church Profile" });

    expect(dialog).toHaveClass("sm:max-w-modal-settings");
    expect(dialog.querySelector("[data-slot='settings-modal-shell']")).toBeInTheDocument();
    expect(dialog.querySelector("[data-slot='heartchart-modal-frame']")).not.toBeInTheDocument();
    expect(within(dialog).getByText("Update your church's information")).toBeInTheDocument();

    const nav = within(dialog).getByRole("navigation", { name: "Settings" });
    expect(within(nav).getByRole("link", { name: "Personal Profile" })).toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: "Church Profile" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(within(nav).getByRole("link", { name: "Subscription & Billing" })).toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: "Terms & Privacy" })).toBeInTheDocument();

    const mobileNav = within(dialog).getByRole("navigation", { name: "Settings sections" });
    expect(mobileNav).toHaveAttribute("data-slot", "settings-modal-mobile-nav");
    expect(within(mobileNav).getByRole("link", { name: "Church Profile" })).toHaveAttribute(
      "aria-current",
      "page"
    );

    expect(within(dialog).getByRole("img", { name: "Fellowship of the Parks" })).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: "Upload logo" })).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: "Remove logo" })).toBeInTheDocument();
    expect(within(dialog).getByText("Remove")).toBeInTheDocument();
    expect(within(dialog).getByText("SVG or PNG files accepted")).toBeInTheDocument();

    expect(within(dialog).getByRole("textbox", { name: "Church Name" })).toHaveValue(
      "Fellowship of the Parks"
    );
    expect(within(dialog).getByRole("textbox", { name: "Avg. Weekly Attendance" })).toHaveValue(
      "5,000"
    );
    expect(within(dialog).getByRole("textbox", { name: "Website" })).toHaveValue("fotp.church");
    expect(within(dialog).getByRole("textbox", { name: "Street address (optional)" })).toHaveAttribute(
      "placeholder",
      "Enter your street address"
    );
    expect(within(dialog).getByRole("textbox", { name: "City" })).toBeInTheDocument();
    expect(within(dialog).getByRole("textbox", { name: "State" })).toBeInTheDocument();
    expect(within(dialog).getByRole("textbox", { name: "Zip" })).toBeInTheDocument();

    for (const campus of ["Bedford", "Grapevine", "Haslet", "Northlake", "North Fort Worth"]) {
      expect(within(dialog).getByText(campus)).toBeInTheDocument();
      expect(within(dialog).getByRole("button", { name: `Edit ${campus}` })).toBeInTheDocument();
      expect(within(dialog).getByRole("button", { name: `Remove ${campus}` })).toBeInTheDocument();
    }

    expect(within(dialog).getByRole("textbox", { name: "Campus name" })).toHaveAttribute(
      "placeholder",
      "Campus name"
    );
    expect(within(dialog).getByRole("button", { name: "Add campus" })).toBeDisabled();
  });

  it("submits a new campus name without owning persistence", () => {
    const onAddCampus = vi.fn();

    render(
      <ChurchProfileSettingsModal
        trigger={<button type="button">Open church profile settings</button>}
        onAddCampus={onAddCampus}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Open church profile settings" }));

    const dialog = screen.getByRole("dialog", { name: "Church Profile" });
    const campusInput = within(dialog).getByRole("textbox", { name: "Campus name" });

    fireEvent.change(campusInput, { target: { value: "Southlake" } });
    fireEvent.click(within(dialog).getByRole("button", { name: "Add campus" }));

    expect(onAddCampus).toHaveBeenCalledWith("Southlake");
  });

  it("keeps form control IDs unique across multiple mounted settings modal instances", () => {
    render(
      <>
        <ChurchProfileSettingsModal
          trigger={<button type="button">Open first church profile settings</button>}
        />
        <ChurchProfileSettingsModal
          trigger={<button type="button">Open second church profile settings</button>}
        />
      </>
    );

    fireEvent.click(screen.getByText("Open first church profile settings"));
    fireEvent.click(screen.getByText("Open second church profile settings"));

    const modalRoots = Array.from(
      document.querySelectorAll<HTMLElement>("[data-slot='settings-church-profile-modal']")
    );
    expect(modalRoots).toHaveLength(2);

    const fieldNames = [
      "churchName",
      "averageWeeklyAttendance",
      "website",
      "streetAddress",
      "city",
      "state",
      "zip",
      "campusName",
    ];

    for (const fieldName of fieldNames) {
      const fields = Array.from(
        document.querySelectorAll<HTMLInputElement>(`[name='${fieldName}']`)
      );
      expect(fields).toHaveLength(2);
      expect(new Set(fields.map((field) => field.id)).size).toBe(2);
    }
  });
});
