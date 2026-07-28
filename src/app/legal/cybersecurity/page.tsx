import type { Metadata } from "next";
import LegalArticle, { type Block } from "@/components/legal/LegalArticle";

export const metadata: Metadata = {
  title: "Cybersecurity Policy",
  description:
    "Cybersecurity and Security Incident Disclaimer for the websites operated by Borchetta Entertainment Group, LLC.",
  alternates: { canonical: "https://bigmachinerecords.com/legal/cybersecurity" },
  robots: { index: false, follow: true },
};

const blocks: Block[] = [
  { type: "h3", text: "1. No Absolute Security Guarantee" },
  {
    type: "p",
    runs: [
      "Company implements reasonable administrative, technical, and organizational safeguards designed to protect the Site, services, and user information. However, no system, network, software, database, or transmission of data over the internet or any wireless network can be guaranteed to be completely secure.",
    ],
  },
  { type: "p", runs: ["Accordingly, Company does not warrant or guarantee that:"] },
  {
    type: "ul",
    items: [
      ["The Site or services will be free from unauthorized access, hacking, cyberattacks, or security breaches;"],
      ["Any data transmitted to or from the Site will be secure or immune from interception, alteration, or loss; or"],
      ["The Site or services will be uninterrupted or error-free in all circumstances."],
    ],
  },
  { type: "h3", text: "2. User Acknowledgment of Risk" },
  {
    type: "p",
    runs: [
      "You acknowledge and agree that use of the internet and online services inherently involves security risks. You are responsible for maintaining appropriate security measures on your own devices and accounts, including safeguarding login credentials and using up-to-date security software.",
    ],
  },
  { type: "h3", text: "3. Security Incidents" },
  {
    type: "p",
    runs: [
      "A “Security Incident” means any actual or reasonably suspected unauthorized access to, disclosure of, alteration of, or destruction of systems, networks, or data maintained by Company.",
    ],
  },
  {
    type: "p",
    runs: [
      "In the event of a Security Incident, Company may take any actions it deems appropriate in its sole discretion, including but not limited to:",
    ],
  },
  {
    type: "ul",
    items: [
      ["Investigating and remediating the incident;"],
      ["Temporarily suspending or limiting access to the Site or services;"],
      ["Notifying affected users as required by applicable law; and"],
      ["Cooperating with law enforcement or regulatory authorities"],
    ],
  },
  {
    type: "p",
    runs: [
      "Company does not guarantee that all Security Incidents will be detected or that notice will be provided within any specific timeframe, except as required by applicable law.",
    ],
  },
  { type: "h3", text: "4. Limitation of Liability for Security Events" },
  {
    type: "p",
    runs: [
      "To the maximum extent permitted by law, Company shall not be liable for any loss, damage, or harm arising out of or relating to any Security Incident, including but not limited to unauthorized access, data breaches, service disruptions, or malicious attacks, except to the extent such liability cannot be excluded under applicable law.",
    ],
  },
  { type: "h3", text: "5. No Warranty Regarding Security Tools" },
  {
    type: "p",
    runs: [
      "Any security features, tools, or protections provided as part of the services are offered on an “as is” and “as available” basis and may not detect or prevent all threats, vulnerabilities, or malicious activity.",
    ],
  },
  { type: "h3", text: "6. User Responsibility After Incident" },
  {
    type: "p",
    runs: [
      "You are responsible for taking appropriate steps following any suspected compromise of your account or data, including changing passwords, monitoring account activity, and notifying Company promptly if you suspect unauthorized access.",
    ],
  },
  { type: "h3", text: "7. Survival" },
  {
    type: "p",
    runs: ["This section shall survive termination or expiration of your use of the Site or services."],
  },
];

export default function CybersecurityPolicyPage() {
  return <LegalArticle title="Cybersecurity and Security Incident Disclaimer" blocks={blocks} />;
}
