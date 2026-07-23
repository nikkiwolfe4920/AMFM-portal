export type ProfileType = "church-leader" | "marriage-champion";

export interface TeamMember {
  name: string;
  email: string;
  profileType: ProfileType;
  campus: string;
  completedTraining: boolean;
  completedMmp: boolean;
  /** null renders as "Pending" — the member hasn't accepted their invite yet. */
  joined: string | null;
  status: "active" | "invited";
}

export const PROFILE_TYPE_LABEL: Record<ProfileType, string> = {
  "church-leader": "Church Leader",
  "marriage-champion": "Marriage Champion",
};

/**
 * Representative sample data for the "Our Marriage Champions" table —
 * not wired to a real backend. Shared by the live interactive table
 * (/marriage-champions) and the decorative blurred backdrop on the
 * empty state (/marriage-champions-empty), which reuses the same
 * roster shape per the Figma "Empty" frame's own faded screenshot of
 * this table.
 */
export const TEAM_MEMBERS: TeamMember[] = [
  { name: "Olivia Rhye", email: "olivia@untitledui.com", profileType: "church-leader", campus: "North Campus", completedTraining: true, completedMmp: true, joined: "10/14/2025", status: "active" },
  { name: "Phoenix Baker", email: "phoenix@untitledui.com", profileType: "marriage-champion", campus: "South Campus", completedTraining: false, completedMmp: false, joined: "10/14/2025", status: "active" },
  { name: "Lana Steiner", email: "lana@untitledui.com", profileType: "marriage-champion", campus: "East Campus", completedTraining: false, completedMmp: false, joined: "10/14/2025", status: "active" },
  { name: "Demi Wilkinson", email: "demi@untitledui.com", profileType: "marriage-champion", campus: "East Campus", completedTraining: true, completedMmp: true, joined: "10/14/2025", status: "active" },
  { name: "Candice Wu", email: "candice@untitledui.com", profileType: "marriage-champion", campus: "North Campus", completedTraining: false, completedMmp: false, joined: "10/14/2025", status: "active" },
  { name: "Natali Craig", email: "natali@untitledui.com", profileType: "marriage-champion", campus: "West Campus", completedTraining: false, completedMmp: false, joined: null, status: "invited" },
  { name: "Drew Cano", email: "drew@untitledui.com", profileType: "marriage-champion", campus: "West Campus", completedTraining: true, completedMmp: true, joined: "10/14/2025", status: "active" },
  { name: "Orlando Diggs", email: "orlando@untitledui.com", profileType: "marriage-champion", campus: "East Campus", completedTraining: false, completedMmp: false, joined: "10/14/2025", status: "active" },
  { name: "Andi Lane", email: "andi@untitledui.com", profileType: "marriage-champion", campus: "North Campus", completedTraining: false, completedMmp: false, joined: "10/14/2025", status: "active" },
  { name: "Kate Morrison", email: "kate@untitledui.com", profileType: "marriage-champion", campus: "South Campus", completedTraining: false, completedMmp: false, joined: null, status: "invited" },
];
