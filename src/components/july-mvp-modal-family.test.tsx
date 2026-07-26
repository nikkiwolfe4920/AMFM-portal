import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { HeartChartLastFourWeeksModal } from "./heartchart-last-four-weeks-modal";
import { HeartChartQuickTipModal } from "./heartchart-quick-tip-modal";
import { HeartChartResourcesQuickStartModal } from "./heartchart-resources-quick-start-modal";
import { InviteUserModal } from "./invite-user-modal";

describe("July MVP modal family", () => {
  it("renders the invite-user modal with shared shell chrome, form controls, info copy, and footer actions", () => {
    const onCancel = vi.fn();
    const onSendInvite = vi.fn();

    render(
      <InviteUserModal
        trigger={<button type="button">Open invite modal</button>}
        churchName="Fellowship of the Parks"
        onCancel={onCancel}
        onSendInvite={onSendInvite}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Open invite modal" }));

    const dialog = screen.getByRole("dialog", { name: "Invite Team" });

    expect(dialog).toHaveClass("sm:max-w-modal-md");
    expect(within(dialog).getByText(/join Fellowship of the Parks/)).toBeInTheDocument();
    expect(within(dialog).getByRole("textbox", { name: "Email" })).toHaveAttribute(
      "placeholder",
      "Email, comma separated"
    );
    expect(within(dialog).getByRole("combobox", { name: "Role" })).toHaveTextContent(
      "Marriage Champion"
    );
    expect(within(dialog).getByRole("note")).toHaveTextContent(
      /Marriage Champions can view HeartChart/
    );
    fireEvent.change(within(dialog).getByRole("textbox", { name: "Email" }), {
      target: { value: "leader@example.com, champion@example.com" },
    });

    fireEvent.click(within(dialog).getByRole("button", { name: "Send invite" }));
    fireEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onSendInvite).toHaveBeenCalledWith({
      email: "leader@example.com,champion@example.com",
      role: "marriage-champion",
    });
  });

  it("keeps reusable invite and trend modal IDs unique across multiple mounted instances", () => {
    const onFirstSendInvite = vi.fn();
    const onSecondSendInvite = vi.fn();

    render(
      <>
        <InviteUserModal
          trigger={<button type="button">Open first invite modal</button>}
          churchName="Fellowship of the Parks"
          onSendInvite={onFirstSendInvite}
        />
        <InviteUserModal
          trigger={<button type="button">Open second invite modal</button>}
          churchName="Second Church"
          onSendInvite={onSecondSendInvite}
        />
        <HeartChartLastFourWeeksModal
          trigger={<button type="button">Open first last 4 weeks</button>}
        />
        <HeartChartLastFourWeeksModal
          trigger={<button type="button">Open second last 4 weeks</button>}
        />
      </>
    );

    fireEvent.click(screen.getByText("Open first invite modal"));
    fireEvent.click(screen.getByText("Open second invite modal"));
    fireEvent.click(screen.getByText("Open first last 4 weeks"));
    fireEvent.click(screen.getByText("Open second last 4 weeks"));

    const inviteForms = Array.from(
      document.querySelectorAll<HTMLFormElement>("[data-slot='invite-user-modal-form']")
    );
    expect(inviteForms).toHaveLength(2);
    expect(new Set(inviteForms.map((form) => form.id)).size).toBe(2);

    const emailInputs = Array.from(
      document.querySelectorAll<HTMLInputElement>("input[name='email']")
    );
    expect(emailInputs).toHaveLength(2);
    expect(new Set(emailInputs.map((input) => input.id)).size).toBe(2);

    const emailNotes = Array.from(
      document.querySelectorAll<HTMLParagraphElement>("[data-slot='invite-user-modal-email-note']")
    );
    expect(emailNotes).toHaveLength(2);
    expect(new Set(emailNotes.map((note) => note.id)).size).toBe(2);
    expect(emailInputs[1]).toHaveAttribute("aria-describedby", emailNotes[1].id);

    const sendButtons = Array.from(
      document.querySelectorAll<HTMLButtonElement>("button[form]")
    );
    expect(sendButtons).toHaveLength(2);
    expect(sendButtons[1]).toHaveAttribute("form", inviteForms[1].id);

    fireEvent.change(emailInputs[1], { target: { value: "second@example.com" } });
    fireEvent.click(sendButtons[1]);

    expect(onFirstSendInvite).not.toHaveBeenCalled();
    expect(onSecondSendInvite).toHaveBeenCalledWith({
      email: "second@example.com",
      role: "marriage-champion",
    });

    const tipSections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-slot='heartchart-last-four-weeks-tips']")
    );
    expect(tipSections).toHaveLength(2);
    const labelledByIds = tipSections.map((section) => section.getAttribute("aria-labelledby"));
    expect(new Set(labelledByIds).size).toBe(2);
    labelledByIds.forEach((id) => {
      expect(id).toBeTruthy();
      expect(document.getElementById(id as string)).toBeInTheDocument();
    });
  });

  it("renders the Quick Tip modal as a video-and-copy composition with a resource footer action", () => {
    const onGoToResources = vi.fn();

    render(
      <HeartChartQuickTipModal
        trigger={<button type="button">Open quick tip</button>}
        videoSrc="/quick-tip.mp4"
        captionsSrc="/quick-tip.vtt"
        onGoToResources={onGoToResources}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Open quick tip" }));

    const dialog = screen.getByRole("dialog", { name: "Quick Tip" });

    expect(dialog).toHaveClass("sm:max-w-modal-sm");
    expect(dialog.querySelector("[data-slot='video-player']")).toBeInTheDocument();
    expect(dialog.querySelector("video")).toHaveAttribute("src", "/quick-tip.mp4");
    expect(dialog.querySelector("track")).toHaveAttribute("src", "/quick-tip.vtt");
    expect(within(dialog).getByRole("region", { name: "Quick Tip video" })).toBeInTheDocument();
    expect(within(dialog).getByRole("heading", { name: "Growing Momentum" })).toBeInTheDocument();
    expect(within(dialog).getByText(/Momentum is on your side/)).toBeInTheDocument();

    fireEvent.click(within(dialog).getByRole("button", { name: "Go to HeartChart Resources" }));

    expect(onGoToResources).toHaveBeenCalledTimes(1);
  });

  it("renders the Last 4 Weeks modal with trend data and reusable tip carousel controls", () => {
    render(
      <HeartChartLastFourWeeksModal
        trigger={<button type="button">Open last 4 weeks</button>}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Open last 4 weeks" }));

    const dialog = screen.getByRole("dialog", { name: "Completed the Last 4 Weeks" });

    expect(dialog).toHaveClass("sm:max-w-modal-md");
    expect(within(dialog).getByText(/See how participation is trending/)).toBeInTheDocument();
    expect(within(dialog).getByText("March 23 – April 19")).toBeInTheDocument();
    expect(within(dialog).getByText("62")).toBeInTheDocument();
    expect(within(dialog).getByText("Total this month")).toBeInTheDocument();
    expect(
      within(dialog).getByRole("img", {
        name: "Daily HeartChart completions from March 23 through April 19.",
      })
    ).toBeInTheDocument();
    expect(within(dialog).getByText("Mar 23")).toBeInTheDocument();
    expect(within(dialog).getByText("Mar 30")).toBeInTheDocument();
    expect(within(dialog).queryByText("Apr 23")).not.toBeInTheDocument();
    expect(within(dialog).queryByText("Apr 30")).not.toBeInTheDocument();
    const axisLabels = Array.from(
      dialog.querySelectorAll("[data-slot='participation-trend-axis-label']")
    );
    expect(axisLabels[0]).toHaveTextContent("Mar 23");
    expect(axisLabels[0]).toHaveAttribute("text-anchor", "start");
    expect(axisLabels[0]).toHaveAttribute("x", "24");
    expect(axisLabels[axisLabels.length - 1]).toHaveTextContent("Apr 19");
    expect(axisLabels[axisLabels.length - 1]).toHaveAttribute("text-anchor", "end");
    expect(axisLabels[axisLabels.length - 1]).toHaveAttribute("x", "512");
    expect(
      dialog.querySelector("[data-slot='participation-trend-chart'] polyline")
        ?.getAttribute("points")
        ?.trim()
        .split(/\s+/)
    ).toHaveLength(17);
    expect(within(dialog).getByRole("heading", { name: /Small, consistent invitations/ })).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: "Previous tip" })).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: "Next tip" })).toBeInTheDocument();
    expect(dialog.querySelectorAll("[data-slot='tip-carousel-card']")).toHaveLength(2);

    fireEvent.click(within(dialog).getByRole("button", { name: "Next tip" }));

    expect(within(dialog).getByText("Use natural moments")).toBeInTheDocument();
    expect(within(dialog).getByText("Make it easy in the moment")).toBeInTheDocument();
    expect(within(dialog).queryByText("Start with personal invites")).not.toBeInTheDocument();

    fireEvent.click(within(dialog).getByRole("button", { name: "Previous tip" }));

    expect(within(dialog).getByText("Start with personal invites")).toBeInTheDocument();
    expect(within(dialog).getByText("Use natural moments")).toBeInTheDocument();
  });

  it("renders the HeartChart Resources quick-start guide as a plain video modal", () => {
    render(
      <HeartChartResourcesQuickStartModal
        trigger={<button type="button">Open quick start guide</button>}
        videoSrc="/quick-start.mp4"
        captionsSrc="/quick-start.vtt"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Open quick start guide" }));

    const dialog = screen.getByRole("dialog", { name: "Quick Start Guide" });

    expect(dialog).toHaveClass("sm:max-w-modal-lg");
    expect(dialog).toHaveClass("grid-rows-modal-no-divider");
    expect(dialog.querySelector("[data-slot='heartchart-modal-frame']")).not.toBeInTheDocument();
    expect(dialog.querySelector("[data-slot='heartchart-modal-divider']")).not.toBeInTheDocument();
    const video = within(dialog).getByRole("region", { name: "Quick Start Guide video" });
    expect(video).toBeInTheDocument();
    expect(dialog.querySelector("video")).toHaveAttribute("src", "/quick-start.mp4");
    expect(dialog.querySelector("track")).toHaveAttribute("src", "/quick-start.vtt");
    expect(video).not.toHaveClass("shadow-media-card");
    expect(video).toHaveClass("shadow-none");
  });
});
