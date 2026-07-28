import type { Metadata } from "next";
import LegalArticle, { type Block, type Run } from "@/components/legal/LegalArticle";
import { BODIES, OPTOUT_EMAIL, mailto, SUBJECTS } from "@/components/legal/links";

export const metadata: Metadata = {
  title: "TCPA Consent and Do Not Call Policy",
  description:
    "Telephone communications, TCPA consent, and Do Not Call / internal suppression list policy for the websites operated by Borchetta Entertainment Group, LLC.",
  alternates: { canonical: "https://bigmachinerecords.com/legal/tcpa" },
  robots: { index: false, follow: true },
};

const optout: Run = { t: OPTOUT_EMAIL, href: mailto(OPTOUT_EMAIL, SUBJECTS.optOut, BODIES.tcpaOptOut) };

const blocks: Block[] = [
  { type: "h2", text: "TELEPHONE COMMUNICATIONS AND TCPA CONSENT" },
  { type: "h3", text: "1. Consent to Receive Communications" },
  {
    type: "p",
    runs: [
      "By providing your telephone number to Company, you expressly consent to receive communications from Company and its affiliates, agents, and service providers, including calls and text messages (SMS and MMS), at the telephone number you provide. These communications may be made using an automatic telephone dialing system, artificial or prerecorded voice, or other automated technology, where permitted by applicable law. Your consent is not a condition of purchasing any goods or services.",
    ],
  },
  { type: "h3", text: "2. Types of Communications" },
  { type: "p", runs: ["Communications may include, without limitation:"] },
  {
    type: "ul",
    items: [
      ["Account-related notices and alerts;"],
      ["Transactional or service-related messages;"],
      ["Customer support communications;"],
      ["Security and verification messages; and"],
      ["Promotional and marketing messages, where permitted by law."],
    ],
  },
  { type: "h3", text: "3. Consent to Automated Technology" },
  {
    type: "p",
    runs: [
      "Where permitted by applicable law, you acknowledge and agree that Company may use automated telephone dialing systems, prerecorded or artificial voice messages, and automated SMS messaging systems to contact you at the number you provide.",
    ],
  },
  { type: "h3", text: "4. Text Messaging Program Terms" },
  { type: "p", runs: ["If you opt in to receive text messages from Company:"] },
  {
    type: "ul",
    items: [
      ["Message frequency may vary;"],
      ["Message and data rates may apply depending on your mobile carrier plan; and"],
      ["You are responsible for any charges imposed by your mobile carrier."],
    ],
  },
  { type: "h3", text: "5. Opt-Out and Revocation of Consent" },
  { type: "p", runs: ["You may opt out of receiving text messages at any time by:"] },
  {
    type: "ul",
    items: [
      ["Replying “STOP” to any text message you receive;"],
      ["Following any unsubscribe instructions provided in the message; and/or"],
      ["Contacting us at ", optout, "."],
    ],
  },
  {
    type: "p",
    runs: ["After opting out, you may receive a final confirmation message acknowledging your request."],
  },
  {
    type: "p",
    runs: ["To stop receiving automated calls, you may request removal by contacting us using the information provided below."],
  },
  { type: "h3", text: "6. Assistance" },
  {
    type: "p",
    runs: ["For help with messaging services, you may reply “HELP” to any text message or contact us at ", optout, "."],
  },
  { type: "h3", text: "7. Carrier Disclaimer" },
  { type: "p", runs: ["Mobile carriers are not liable for delayed or undelivered messages."] },
  { type: "h3", text: "8. User Representations" },
  { type: "p", runs: ["You represent and warrant that:"] },
  {
    type: "ul",
    items: [
      ["You are the current subscriber or customary user of the telephone number provided;"],
      ["You have authority to consent to receive communications at that number; and"],
      ["The number provided is accurate and up to date."],
    ],
  },
  { type: "h3", text: "9. Record of Consent" },
  {
    type: "p",
    runs: [
      "Company may maintain records of your consent, including the date, time, method of consent, and associated identifiers, to demonstrate compliance with applicable law.",
    ],
  },
  { type: "h3", text: "10. Compliance with Applicable Law" },
  {
    type: "p",
    runs: [
      "Company’s communication practices are intended to comply with the Telephone Consumer Protection Act (TCPA), its implementing regulations, and similar state and federal laws governing telemarketing and automated communications. Where applicable law imposes additional or more restrictive requirements, Company will comply with those requirements.",
    ],
  },

  { type: "h2", text: "DO NOT CALL AND INTERNAL SUPPRESSION LIST POLICY" },
  { type: "h3", text: "1. Do Not Call Policy" },
  {
    type: "p",
    runs: [
      "Company maintains a policy of complying with applicable federal and state laws governing telemarketing communications, including the Telephone Consumer Protection Act (TCPA) and applicable regulations enforced by the Federal Trade Commission and Federal Communications Commission. We honor requests to opt out of receiving telephone calls, text messages, and other marketing communications, as required by law.",
    ],
  },
  { type: "h3", text: "2. Internal Suppression List" },
  {
    type: "p",
    runs: [
      "Company maintains an internal “Do Not Call” and communication suppression list (the “Suppression List”) of individuals who have requested not to receive marketing calls or messages from Company.",
    ],
  },
  {
    type: "p",
    runs: [
      "If you request to opt out of marketing communications, your telephone number and/or other relevant contact information may be added to the Suppression List to ensure compliance with your request.",
    ],
  },
  {
    type: "p",
    runs: ["We use the Suppression List solely for the purpose of honoring opt-out requests and complying with applicable legal obligations."],
  },
  { type: "h3", text: "3. How to Opt Out" },
  { type: "p", runs: ["You may request to be added to the Suppression List by:"] },
  {
    type: "ul",
    items: [
      ["Replying “STOP” to any text message you receive from us;"],
      ["Requesting removal during a telephone call; and/or"],
      ["Contacting us at ", optout],
      ["Submitting a request through any designated opt-out mechanism provided by Company."],
    ],
  },
  { type: "h3", text: "4. Processing of Requests" },
  {
    type: "p",
    runs: [
      "We will process opt-out requests in a commercially reasonable timeframe consistent with applicable law. Once your request is processed, we will take reasonable steps to ensure you are not contacted for marketing purposes using the contact information provided.",
    ],
  },
  { type: "h3", text: "5. Duration of Suppression" },
  {
    type: "p",
    runs: [
      "Once added to the Suppression List, your contact information will remain on the list for as long as necessary to comply with applicable law and to ensure that your opt-out request is honored.",
    ],
  },
  { type: "h3", text: "6. Exceptions" },
  {
    type: "p",
    runs: ["Even if you opt out of marketing communications, you may still receive non-marketing communications from Company, including:"],
  },
  {
    type: "ul",
    items: [
      ["Transactional or account-related messages;"],
      ["Service or security notifications;"],
      ["Legal or regulatory notices; and"],
      ["Communications necessary to provide requested services"],
    ],
  },
  { type: "h3", text: "7. Recordkeeping" },
  {
    type: "p",
    runs: [
      "Company may maintain records of opt-out requests, including the date, method of request, and contact information provided, for compliance and auditing purposes.",
    ],
  },
  { type: "h3", text: "8. No Sale or Transfer for Marketing Purposes" },
  {
    type: "p",
    runs: ["Contact information included on the Suppression List will not be sold, rented, or transferred for marketing purposes."],
  },
];

export default function TcpaPolicyPage() {
  return <LegalArticle title="TCPA Consent and Do Not Call Policy" blocks={blocks} />;
}
