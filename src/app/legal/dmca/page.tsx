import type { Metadata } from "next";
import LegalArticle, { type Block } from "@/components/legal/LegalArticle";
import { BODIES, LEGAL_EMAIL, mailto, SUBJECTS } from "@/components/legal/links";

export const metadata: Metadata = {
  title: "Copyright Infringement Policy (DMCA)",
  description:
    "Copyright Infringement Policy and DMCA Notice procedure for the websites operated by Borchetta Entertainment Group, LLC.",
  alternates: { canonical: "https://bigmachinerecords.com/legal/dmca" },
  robots: { index: false, follow: true },
};

const blocks: Block[] = [
  {
    type: "p",
    runs: [
      "Company respects the intellectual property rights of others and expects users of the Site and services to do the same. In accordance with the Digital Millennium Copyright Act, 17 U.S.C. § 512 (“DMCA”), Company will respond expeditiously to claims of copyright infringement committed using the Site or services and will take appropriate action, including removing or disabling access to allegedly infringing material and terminating repeat infringers in appropriate circumstances.",
    ],
  },
  { type: "h3", text: "DMCA Notices" },
  {
    type: "p",
    runs: [
      "If you believe that any content available through the Site or services infringes a copyright that you own or control, you may submit a written notification to Company’s designated copyright agent containing substantially the following information:",
    ],
  },
  {
    type: "ol",
    items: [
      ["A physical or electronic signature of the copyright owner or a person authorized to act on behalf of the copyright owner;"],
      ["Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works are covered by a single notification, a representative list of such works;"],
      ["Identification of the material claimed to be infringing or to be the subject of infringing activity, and information reasonably sufficient to permit Company to locate the material;"],
      ["Information reasonably sufficient to permit Company to contact you, including your name, mailing address, telephone number, and email address;"],
      ["A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law; and"],
      ["A statement that the information contained in the notification is accurate and, under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed."],
    ],
  },
  { type: "p", runs: ["DMCA notices should be sent to:"] },
  { type: "h3", text: "Designated Copyright Agent" },
  { type: "p", runs: ["Name: Business Affairs/Legal Dept."] },
  { type: "p", runs: ["Address: 1221 16th Ave South, Nashville, TN 37212"] },
  {
    type: "p",
    runs: ["Email: ", { t: LEGAL_EMAIL, href: mailto(LEGAL_EMAIL, SUBJECTS.dmcaNotice, BODIES.dmcaNotice) }],
  },
  {
    type: "p",
    runs: ["Company may disregard notices that fail to substantially comply with the requirements of the DMCA."],
  },
  { type: "h3", text: "Removal of Content" },
  {
    type: "p",
    runs: [
      "Upon receipt of a valid DMCA notice, Company may remove or disable access to the allegedly infringing material and may notify the user responsible for posting or making the material available.",
    ],
  },
  { type: "h3", text: "Counter-Notification Procedure" },
  {
    type: "p",
    runs: [
      "If you believe that material removed or disabled as a result of a DMCA notice was removed or disabled by mistake or misidentification, you may submit a written counter-notification to Company's designated copyright agent containing substantially the following information:",
    ],
  },
  {
    type: "ol",
    items: [
      ["Your physical or electronic signature;"],
      ["Identification of the material that has been removed or disabled and the location where the material appeared before it was removed or disabled;"],
      ["A statement under penalty of perjury that you have a good-faith belief that the material was removed or disabled as a result of mistake or misidentification;"],
      ["Your name, address, telephone number, and email address; and"],
      ["A statement that you consent to the jurisdiction of the Federal District Court for the judicial district in which your address is located, or if your address is outside the United States, for any judicial district in which Company may be found, and that you will accept service of process from the person who submitted the original DMCA notice or that person's agent."],
    ],
  },
  {
    type: "p",
    runs: ["If Company receives a valid counter-notification, Company may restore the removed material in accordance with the DMCA."],
  },
  { type: "h3", text: "Repeat Infringer Policy" },
  {
    type: "p",
    runs: [
      "Company maintains a policy of terminating, in appropriate circumstances and at Company’s sole discretion, users who are determined to be repeat infringers of intellectual property rights. Company may also limit access to the Site or services, remove content, suspend accounts, or terminate accounts for users who repeatedly violate intellectual property rights or these Terms.",
    ],
  },
  { type: "h3", text: "Misrepresentations" },
  {
    type: "p",
    runs: [
      "Any person who knowingly materially misrepresents that material or activity is infringing, or that material was removed or disabled by mistake or misidentification, may be liable for damages, costs, and attorneys' fees under applicable law, including Section 512(f) of the DMCA.",
    ],
  },
  { type: "h3", text: "Reservation of Rights" },
  {
    type: "p",
    runs: [
      "Company reserves the right to remove, disable access to, or restrict access to any content at any time, with or without notice, and regardless of whether Company has received a formal DMCA notice.",
    ],
  },
];

export default function DmcaPolicyPage() {
  return <LegalArticle title="Copyright Infringement Policy (DMCA)" blocks={blocks} />;
}
