import type { Metadata } from "next";
import LegalArticle, { type Block, type Run } from "@/components/legal/LegalArticle";
import { BODIES, LEGAL_EMAIL, OPTOUT_EMAIL, mailto, SUBJECTS } from "@/components/legal/links";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and Conditions governing use of the websites and mobile apps operated by Borchetta Entertainment Group, LLC and its affiliates.",
  alternates: { canonical: "https://bigmachinerecords.com/legal/terms" },
  robots: { index: false, follow: true },
};

const legalMail: Run = { t: LEGAL_EMAIL, href: mailto(LEGAL_EMAIL, undefined, BODIES.generalContact) };

const blocks: Block[] = [
  {
    type: "p",
    runs: [
      "The following terms and conditions (the “Terms and Conditions”), which includes the ",
      { t: "Privacy Policy", href: "/legal/privacy", b: true },
      ", ",
      { t: "Copyright Infringement Policy", href: "/legal/dmca", b: true },
      ", ",
      { t: "DMCA Notice", href: "/legal/dmca", b: true },
      ", ",
      { t: "Cybersecurity Policy", href: "/legal/cybersecurity", b: true },
      " and ",
      { t: "TCPA Consent", href: "/legal/tcpa", b: true },
      " (each, together with the Terms and Conditions are collectively referred to as the “Policies”) govern your use of Borchetta Entertainment Group, LLC-operated websites and/or mobile apps (collectively, the “Site”). The Site is made available by Borchetta Entertainment Group, LLC and its affiliates (which includes Nashville Harbor Records & Entertainment, LLC, Big Machine Racing Productions, LLC, Borchetta Entertainment Management Group, LLC and all current or future affiliates of any of the foregoing along with all artists affiliated in any way with any of the preceding companies and affiliates) (collectively, “Company” or “we” or “us”). We may change the Policies from time to time, at any time without notice to you, by posting such changes on the Site.",
    ],
  },
  {
    type: "p",
    runs: [
      "Our Sites may include the option to purchase physical or digital goods. Purchases on Company’s Sites are governed by Company’s Webstore Terms and Conditions.",
    ],
  },
  {
    type: "p",
    runs: [
      "BY ACCESSING AND/OR USING THE SITE, INCLUDING REGISTERING FOR AN ACCOUNT, INTERACTING WITH THE SITE, OR SUBMITTING FEEDBACK THROUGH THE SITE, YOU ACCEPT AND AGREE TO THESE POLICIES AND TO ABIDE BY ALL RULES, TERMS, CONDITIONS, RESTRICTIONS AND NOTICES IN THE POLICIES. ",
      { t: "BY CONTINUING TO ACCESS THIS SITE, YOU ARE AGREEING TO BE BOUND TO THE EXCLUSIVE JURISDICTION OF ALL DISPUTES TO BINDING ARBITRATION PER ", b: true },
      { t: "SECTION 17", href: "#section-17", b: true },
      { t: " BELOW AND YOU FURTHER ACKNOWLEDGE YOU ARE WAIVING A JURY TRIAL AND CLASS ACTION. ALL CLAIMS ARE ON AN INDIVIDUAL BASIS ONLY.", b: true },
      "  If you do not agree to these Policies, you may not access or otherwise use the Site.",
    ],
  },

  { type: "h3", text: "1. Proprietary Rights." },
  {
    type: "p",
    runs: [
      "As between you and Company, Company owns, solely and exclusively, all rights, title and interest in and to the Site, all the content (including, for example, audio, photographs, illustrations, graphics, other visuals, video, copy, lyrics, software, etc.), code, data and materials thereon, the look and feel, design and organization of the Site, and the compilation of the content, code, data and materials on the Site, including but not limited to any copyrights, trademark, patent, database, moral, sui generis and other intellectual property and proprietary rights therein.  Your use of the Site does not grant to you ownership of any content, code, data or materials you may access on the Site.  You may view the content on the Site on your computer or other internet-compatible device and make single copies or prints of the content on the Site for your personal, internal use only.  Any commercial distribution, publishing or exploitation of the Site, or any content, code, data or materials on the Site, is strictly prohibited unless you have received the express prior permission of Company or the applicable rights holder.  (The Site may contain some features that enable you to obtain rights to use certain of the content on the Site, such as lyrics, music, photographs, and the like.  In such situations, your rights to use such content are limited to the rights expressly granted by Company in such situations.)  You may not otherwise copy, reproduce, distribute or otherwise exploit any content, code, data or materials on the Site.  If you make other use of the Site, or the content, code, data or materials thereon, except as otherwise provided above, you may violate copyright and other laws of the United States, other countries, as well as applicable state laws and may be subject to liability for such unauthorized use.  Company will aggressively enforce its intellectual property rights to the fullest extent of the law, including the seeking of criminal prosecution.",
    ],
  },

  { type: "h3", text: "2. Trademarks." },
  {
    type: "p",
    runs: [
      "The trademarks, logos, service marks and trade names (collectively the “Trademarks”) displayed on the Site are registered and unregistered Trademarks of Company and others and may not be used in connection with products and/or services that are not related to, associated with, or sponsored by their rights holders that are likely to cause customer confusion, or in any manner that disparages or discredits their rights holders.  All Trademarks not owned by Company that appear on the Site, if any, are the property of their respective owners.  Nothing contained on the Site should be construed as granting, by implication, estoppel, or otherwise, any license or right to use any Trademark displayed on the Site without the written permission of Company or the third party that may own the applicable Trademark. Your misuse of the Trademarks displayed on the Site is strictly prohibited.  Company will aggressively enforce its Trademark rights to the fullest extent of the law, including the seeking of criminal prosecution.",
    ],
  },

  { type: "h3", text: "3. User Information." },
  {
    type: "p",
    runs: [
      "In the course of your use of the Site, you may be asked to provide certain personalized information to us (such information referred to hereinafter as “User Information”).  Our information collection and use policies with respect to the privacy of such User Information are set forth in the Site's Privacy Policy which is incorporated herein by reference for all purposes.  You acknowledge and agree that you are solely responsible for the accuracy and content of User Information. The Site and services are not directed to, and are not intended for use by, children under the age of thirteen (13). Company does not knowingly collect, use, or disclose personal information from children under thirteen (13). If you are under the age of thirteen (13), you may not use the Site or submit any personal information through the Site or services. If Company becomes aware that it has collected personal information from a child under thirteen (13) without verifiable parental consent, Company will take reasonable steps to delete such information as soon as practicable. Parents or legal guardians who believe that a child has provided personal information to Company without their consent may contact Company at ",
      legalMail,
      " to request review, deletion, or other appropriate action regarding such information. By using the Site, you represent and warrant that you are at least thirteen (13) years of age or that your use of the Site is otherwise permitted under applicable law.",
    ],
  },

  { type: "h3", text: "4. Mobile User Information." },
  {
    type: "p",
    runs: [
      "When you enroll in a text message service (“Text Service”) offered by Company, you agree to receive recurring offers and other information from us via SMS and/or MMS message at the mobile number you provided during the service’s registration process. You may be required to respond to an initial message as instructed to complete registration and confirm enrollment. The enrollment process will disclose the program, frequency of messages, and options to cancel your enrollment.",
    ],
  },
  {
    type: "p",
    runs: [
      "Messages will be sent through an automatic telephone dialing system. There is no additional charge for this service, unless specifically disclosed and agreed by you, but you may be offered opportunities to make purchases through the Text Service and you will be responsible for any charges associated with such purchases. Your mobile carrier’s standard message and data rates may apply to any messages you send or receive through the Text Services, including our confirmations and subsequent texts. Please contact your mobile carrier for more information regarding your mobile data and messaging plan.",
    ],
  },
  {
    type: "p",
    runs: [
      "As described at program enrollment and in program welcome messages, including messages sent to a shortcode associated with the Text Service or by replying to any message you receive from us, you may text “STOP” to cancel or “HELP” for customer support information. If you choose to stop your subscription, you agree to receive a final text message from the Text Service to confirm your cancellation.  Our information collection and use policies regarding your information are set forth in our Privacy Policy. You agree to notify us of any changes to your mobile number and update your account with us to reflect this change and acknowledge that you are responsible for the accuracy of this information. You can contact us with questions by using the information provided in the Notices and Contact Information section of these Terms, listed below.",
    ],
  },
  {
    type: "p",
    runs: [
      "Your carrier may prohibit or restrict certain mobile features and certain mobile features may be incompatible with your carrier or mobile device. Contact your carrier with questions regarding these issues. We are not liable for any delays in the receipt of, or failure to receive, any SMS or MMS texts, as delivery is subject to effective transmission by your mobile carrier. The terms of this Section 4 are supplemented by the TCPA Consent and Do Not Call Policy, which can be found ",
      { t: "HERE", href: "/legal/tcpa", b: true },
      ". In connection with this Section 4, as well as all other services relating to the Policies, by accessing or using the Site or services, or by creating an account, submitting information, or entering into any transaction with Company, you consent to receive communications from Company electronically. You agree that your electronic actions, including but not limited to clicking “I Agree,” checking boxes, submitting forms, signing electronically, or otherwise indicating assent through the Site or services, constitute your electronic signature and have the same legal effect as a handwritten signature to the fullest extent permitted by applicable law. You may withdraw your consent to receive electronic communications by contacting Company at ",
      { t: OPTOUT_EMAIL, href: mailto(OPTOUT_EMAIL, SUBJECTS.consentWithdrawal, BODIES.consentWithdrawal) },
      ". If you withdraw consent, Company may suspend or terminate your use of the Site or services where electronic communications are necessary for account maintenance or service delivery. Withdrawal of consent will not affect the legal validity of electronic communications previously provided.",
    ],
  },

  { type: "h3", text: "5. Unsolicited Materials." },
  {
    type: "p",
    runs: [
      "Unless specifically requested, we do not solicit nor do we wish to receive any confidential, secret or proprietary information or other material from you through the Site, by e-mail or in any other way.  Any information, creative works, demos, ideas, suggestions, concepts, methods, systems, designs, plans, techniques or other materials submitted or sent to us (“Submitted Materials”) will be deemed not to be confidential or secret and may be used by us in any manner consistent with the Site's Privacy Policy.  By submitting or sending Submitted Materials to us, you: (i) represent and warrant that the Submitted Materials are original to you, that no other party has any rights thereto, and that any “moral rights” in Submitted Materials have been waived, and (ii) you grant us a royalty-free, unrestricted, worldwide, perpetual, irrevocable, non-exclusive and fully transferable, assignable and sublicensable right and license to use, copy, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, perform and display such material (in whole or part) and/or to incorporate it in other works in any form, media, or technology now known or later developed.  We cannot be responsible for maintaining any Submitted Material that you provide to us, and we may delete or destroy any such Submitted Material at any time.",
    ],
  },

  { type: "h3", text: "6. User Conduct." },
  {
    type: "p",
    runs: [
      "You warrant and agree that, while using the Site, you shall not upload, post or transmit to the Site, or distribute or otherwise publish through the Site, any materials that: (a) are protected by third party copyright, or other proprietary or intellectual property right; (b) are unlawful, threatening, hateful, tortious, defamatory, libelous, deceptive, fraudulent, invasive of another's privacy or publicity rights, harassing, profane, obscene, vulgar or that contain explicit or graphic descriptions or accounts of sexual acts (including but not limited to sexual language of a violent or threatening nature directed at another individual or group of individuals), (c) restrict or inhibit any other user from using and enjoying the Site, (d) constitute or encourage conduct that would constitute a criminal offense or give rise to civil liability, or (e) contain a virus or other harmful component, advertising of any kind, or false or misleading indications of origin or statements of fact.",
    ],
  },
  {
    type: "p",
    runs: [
      "You also warrant and agree that you shall not: (a) impersonate any person or entity or misrepresent your affiliation with any other person or entity; (b) upload, post, publish, transmit, reproduce, distribute or in any way exploit any information or other material obtained through the Site for commercial purposes (other than as expressly permitted by the provider of such information or other material); (c) engage in spamming, flooding, harvesting of e-mail addresses or other personal information, spidering, “screen scraping,” “database scraping,” or any other activity with the purpose of obtaining lists of users or other information, or send chain letters or pyramid schemes via the Site; or (d) attempt to gain unauthorized access to other computer systems through the Site. You agree that you will not use the Site in any manner that could damage, disable, overburden, or impair the Site or interfere with any other party's use and enjoyment of the Site. You may not obtain or attempt to obtain any materials or information through any means not intentionally made available or provided for through the Site. You further agree that you will not and will not permit any third party to do any of the following:",
    ],
  },
  {
    type: "ul",
    items: [
      ["use any robot, spider, scraper, crawler, or other automated means to access, extract, copy, monitor, or harvest data or content from the Site or services;"],
      ["access the Site in a manner that sends more request traffic than a human using a conventional web browser would reasonably produce;"],
      ["bypass or circumvent any rate limits, access controls, authentication measures, or technical protections;"],
      ["reproduce, download, store, or create databases of content obtained from the Site using automated tools or systematic extraction methods;"],
      ["use any content, data, text, images, metadata, or other materials from the Site or services for training, fine-tuning, validation, or improvement of any artificial intelligence, machine learning, or large language model system;"],
      ["use automated or semi-automated systems to ingest Site content for dataset creation or model development;"],
      ["Incorporate Site content into any AI training corpus, dataset, embedding system, or similar technology without prior express written consent from Company;"],
      ["Reverse engineer, decompile, disassemble, or otherwise attempt to derive source code, underlying structure, algorithms, or non-public aspects of the Site or services;"],
      ["Attempt to discover or extract source code, APIs, backend systems, or proprietary models underlying the Site;"],
      ["Probe, scan, or test the vulnerability of any system or network related to the Site without authorization; or"],
      ["Interfere with or disrupt the integrity, security, or performance of the Site or services."],
    ],
  },
  {
    type: "p",
    runs: [
      "These restrictions apply regardless of whether the data is publicly visible or accessible, and you may not attempt to bypass or defeat any technological measures designed to protect the Site, including:",
    ],
  },
  {
    type: "ul",
    items: [
      ["IP blocking, rate limiting, or access throttling systems;"],
      ["CAPTCHA or bot detection systems;"],
      ["Authentication or authorization controls; and"],
      ["API usage restrictions or quotas."],
    ],
  },
  {
    type: "p",
    runs: [
      "Although Company may from time to time monitor or review discussions, chats, postings, transmissions, bulletin boards, and the like on the Site, Company is under no obligation to do so and assumes no responsibility or liability arising from the content of any such locations on the Site nor for any error, defamation, libel, slander, omission, falsehood, obscenity, pornography, profanity, danger, or inaccuracy contained in any information within such locations on the Site.",
    ],
  },
  {
    type: "p",
    runs: [
      "You agree that if you include a link from any other website to the Site, such link shall open in a new browser window.  You agree not to link from any other website to this Site in any manner such that the Site, or any page of the Site, is “framed,” surrounded or obfuscated by any third-party content, materials or branding.  We reserve the right to revoke your right to link to the Site from your website at any time upon written notice to you.",
    ],
  },
  {
    type: "p",
    runs: [
      "You agree to defend, indemnify and hold Company and its directors, officers, employees, agents or content or service providers (collectively, “Protected Entities”) harmless from any and all claims, liabilities, costs and expenses, including reasonable attorneys' fees, arising in any way from your use of the Site, your placement or transmission of any message, content, information, software or other materials through the Site, or your breach or violation of the law or of these Policies.  Company reserves the right, at its own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, and in such case, you agree to cooperate with Company's defense of such claim.",
    ],
  },

  { type: "h3", text: "7. Account and Password." },
  {
    type: "p",
    runs: [
      "You may be enabled to create an account in the Site (“Account”) using a stand-alone registration or social media logins (“Login”).  You shall be entirely responsible for maintaining the strict confidentiality of any username or password administered to you through your Login; for any access to or use of the Site by you or any person or entity using the username or password, whether or not such access or use has been authorized by or on behalf of you, and whether or not such person or entity is your employee or agent; and for all activities that are conducted through your Account.  You agree to (a) ensure that you exit from your Account at the end of each session and (b) immediately notify Company if you have any reason to believe an unauthorized use of your password or Account or any other breach of security has taken place.  It is your sole responsibility to control the dissemination and use of your password, control access to and use of your Account, and notify Company when you desire to cancel your Account on the Site.  Company will not be responsible or liable for any loss or damage arising from your failure to comply with this provision. Company’s Cybersecurity and Security Incident Disclaimer can be found ",
      { t: "HERE", href: "/legal/cybersecurity", b: true },
      ".",
    ],
  },

  { type: "h3", text: "8. Software Downloads." },
  {
    type: "p",
    runs: [
      "In the event that you receive software demos or other software products downloaded from the Site or otherwise delivered or provided by Company in response to your request, your use of such software will be subject to the software license agreement that accompanies such software.",
    ],
  },

  { type: "h3", text: "9. Orders for Products and Services." },
  {
    type: "p",
    runs: [
      "We may make certain products available to visitors and registrants of the Site.  For example, you may be able to order certain music-related products and/or licenses through the Site.  You may only do so if, and you hereby represent and warrant that, you are domiciled in the United States and you are 18 years old or older.  You agree to pay in full the prices for any purchases you make either by credit/debit card concurrent with your online order or by other payment means acceptable to Company.  You agree to pay all applicable taxes.  If payment is not received by us from your credit or debit card issuer or its agents, you agree to pay all amounts due upon demand by us.",
    ],
  },

  { type: "h3", text: "10. Third Party Websites." },
  {
    type: "p",
    runs: [
      "You may be able to link from the Site to third party websites (“Linked Sites”).  For example, you may purchase products, some of which may be Company products, on or though Linked Sites. You acknowledge and agree that we have no responsibility for the information, content, products, services, advertising, code or other materials which may or may not be provided by or through Linked Sites.  Links to Linked Sites do not constitute an endorsement by us of such websites or the information, content, products, services, advertising, code or other materials presented on or through such websites.",
    ],
  },

  { type: "h3", text: "11. DISCLAIMER OF WARRANTIES." },
  {
    type: "p",
    runs: [
      "THE SITE, INCLUDING, WITHOUT LIMITATION, ALL SERVICES, CONTENT, FUNCTIONS AND MATERIALS, IS PROVIDED “AS IS” AND “AS AVAILABLE”, WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, ANY WARRANTY FOR INFORMATION, DATA, DATA PROCESSING SERVICES, UPTIME OR UNINTERRUPTED ACCESS, ANY WARRANTIES CONCERNING THE AVAILABILITY, ACCURACY, USEFULNESS, OR CONTENT OF INFORMATION, ANY WARRANTIES OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE, AND ANY WARRANTIES THAT MAY ARISE FROM COURSE OF DEALING, COURSE OF PERFORMANCE OR USAGE OF TRADE, AND WE HEREBY DISCLAIM ANY AND ALL SUCH WARRANTIES, EXPRESS OR IMPLIED.  WE DO NOT WARRANT THAT THE SITE OR THE SERVICES, CONTENT, FUNCTIONS OR MATERIALS CONTAINED THEREIN WILL BE TIMELY, SECURE, UNINTERRUPTED OR ERROR FREE, OR THAT DEFECTS WILL BE CORRECTED.  WE MAKE NO WARRANTY THAT THE SITE WILL MEET USERS' REQUIREMENTS.  NO ADVICE, RESULTS OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM US OR THROUGH THE SITE SHALL CREATE ANY WARRANTY NOT EXPRESSLY MADE HEREIN. COMPANY ALSO ASSUMES NO RESPONSIBILITY, AND SHALL NOT BE LIABLE FOR, ANY DAMAGES TO, OR VIRUSES OR OTHER HARMFUL COMPONENTS THAT MAY INFECT OR HARM, YOUR COMPUTER EQUIPMENT OR OTHER PROPERTY ON ACCOUNT FROM YOUR ACCESS TO, USE OF, OR BROWSING IN THE SITE OR YOUR DOWNLOADING OF ANY MATERIALS, DATA, TEXT, IMAGES, VIDEO, OR AUDIO FROM THE SITE.  IF YOU ARE DISSATISFIED WITH THE SITE, YOUR SOLE REMEDY IS TO DISCONTINUE USING THE SITE.",
    ],
  },
  {
    type: "p",
    runs: [
      "WITHOUT LIMITATION OF THE ABOVE IN THIS SECTION, COMPANY AND ITS SUPPLIERS AND LICENSORS MAKE NO WARRANTIES OR REPRESENTATIONS REGARDING ANY PRODUCTS OR SERVICES ORDERED OR PROVIDED VIA THE SITE, AND HEREBY DISCLAIM, AND YOU HEREBY WAIVE, ANY AND ALL WARRANTIES AND REPRESENTATIONS MADE IN PRODUCT OR SERVICES LITERATURE, FREQUENTLY ASKED QUESTIONS DOCUMENTS AND OTHERWISE ON THE SITE OR IN CORRESPONDENCE WITH COMPANY OR ITS AGENTS.  ANY PRODUCTS AND SERVICES ORDERED OR PROVIDED VIA THE SITE ARE PROVIDED BY COMPANY “AS IS”, EXCEPT TO THE EXTENT, IF AT ALL, OTHERWISE SET FORTH IN A LICENSE OR SALE AGREEMENT SEPARATELY ENTERED INTO IN WRITING BETWEEN YOU AND COMPANY OR ITS LICENSOR OR SUPPLIER.",
    ],
  },

  { type: "h3", text: "12. LIMITATION OF LIABILITY." },
  {
    type: "p",
    runs: [
      "TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL COMPANY, ITS AFFILIATES, LICENSORS, SERVICE PROVIDERS, OR THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, SUCCESSORS, OR ASSIGNS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, BUSINESS, GOODWILL, DATA, OR BUSINESS INTERRUPTION, ARISING OUT OF OR RELATING TO THE WEBSITE, THE SERVICES, THESE TERMS, OR ANY CONTENT MADE AVAILABLE THROUGH THE WEBSITE, WHETHER BASED IN CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, STATUTE, OR ANY OTHER LEGAL THEORY, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
    ],
  },
  {
    type: "p",
    runs: [
      "TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, THE AGGREGATE LIABILITY OF COMPANY AND ITS AFFILIATES, LICENSORS, SERVICE PROVIDERS, AND THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS FOR ALL CLAIMS, CAUSES OF ACTION, LOSSES, DAMAGES, OR LIABILITIES ARISING OUT OF OR RELATING TO THE WEBSITE, THE SERVICES, OR THESE TERMS ",
      { t: "SHALL NOT EXCEED THE GREATER OF: (A) THE TOTAL AMOUNT OF FEES ACTUALLY PAID BY YOU TO COMPANY FOR ACCESS TO OR USE OF THE WEBSITE OR SERVICES DURING THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM; OR (B) ONE HUNDRED U.S. DOLLARS (US$100)", b: true },
      ".",
    ],
  },
  {
    type: "p",
    runs: [
      { t: "IF YOU HAVE NOT PAID ANY FEES TO COMPANY FOR ACCESS TO OR USE OF THE WEBSITE OR SERVICES, YOUR SOLE AND EXCLUSIVE REMEDY FOR ANY DISPUTE WITH COMPANY IS TO DISCONTINUE USING THE WEBSITE AND SERVICES, AND COMPANY'S TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED ONE HUNDRED U.S. DOLLARS (US$100)", b: true },
      ".",
    ],
  },
  {
    type: "p",
    runs: [
      "THE LIMITATIONS, EXCLUSIONS, AND LIABILITY CAP SET FORTH IN THIS SECTION APPLY REGARDLESS OF THE FORM OF ACTION, WHETHER IN CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, STATUTE, OR OTHERWISE, AND SHALL APPLY EVEN IF ANY LIMITED REMEDY FAILS OF ITS ESSENTIAL PURPOSE. NOTHING IN THESE TERMS SHALL EXCLUDE OR LIMIT LIABILITY TO THE EXTENT SUCH LIABILITY CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.",
    ],
  },

  { type: "h3", text: "13. Applicable Laws." },
  {
    type: "p",
    runs: [
      "We control and operate the Site from our offices in the United States of America.  We do not represent that materials on the Site are appropriate or available for use in other locations.  Persons who choose to access the Site from other locations do so on their own initiative, and are responsible for compliance with local laws, if and to the extent local laws are applicable.",
    ],
  },

  { type: "h3", text: "14. Modifications to the Site and the Services." },
  {
    type: "p",
    runs: [
      "We reserve the right, for any reason, in our sole discretion, to terminate, change, suspend or discontinue any aspect of the Site, including, but not limited to, content, features or hours of availability.  We may also impose limits on certain features of the Site or restrict your access to part or all of the Site without notice or penalty.  Company reserves the right to temporarily or permanently terminate your membership on the Site for any or no reason without prior notice.",
    ],
  },

  { type: "h3", text: "15. Notices and Contact Information.", id: "section-15" },
  {
    type: "p",
    runs: [
      "All notices required or permitted to be given under these Policies must be in writing and shall be given by personal delivery, registered or certified mail, or Federal Express or other nationally recognized courier service which regularly tracks its packages, to:",
    ],
  },
  { type: "p", runs: ["Borchetta Entertainment Group, LLC"] },
  { type: "p", runs: ["1221 16th Avenue South,"] },
  { type: "p", runs: ["Nashville, TN 37212"] },
  { type: "p", runs: ["Attn: Legal Dept."] },
  { type: "p", runs: [legalMail] },
  {
    type: "p",
    runs: [
      "Notices, if personally delivered, shall be deemed to have been received on the date of delivery; if by registered or certified mail, on the third business day after mailing; if by Federal Express, on the second business day after deposit with the service.",
    ],
  },
  {
    type: "p",
    runs: [
      "If you have any questions, comments or complaints regarding the Sites, feel free to contact us ",
      { t: "here", href: mailto(LEGAL_EMAIL, undefined, BODIES.generalContact) },
      ".",
    ],
  },

  { type: "h3", text: "16. Miscellaneous." },
  {
    type: "p",
    runs: [
      "Our failure to exercise or enforce any right or provision of the Policies shall not constitute a waiver of such right or provision.  If any provision of the Policies is found by a court of competent jurisdiction to be invalid, the parties nevertheless agree that the court should endeavor to give effect to the parties' intentions as reflected in the provision, and the other provisions of the Policies remain in full force and effect.",
    ],
  },

  { type: "h3", text: "17. Dispute Resolution", id: "section-17" },
  {
    type: "p",
    runs: [
      "You and Company agree to arbitrate all disputes between you and Company or its affiliates, except for disputes relating to the enforcement of Company's or its affiliates intellectual property.    The Policies are solely governed by and construed in accordance with the laws of the State of Tennessee, without regard to its principles of conflicts of law that would require the application of the laws of another jurisdiction. Any disputes between you and Company relating to the Sites must be resolved exclusively through binding non-appearance-based arbitration administered by JAMS in Nashville, Tennessee, U.S.A..  In the event of a dispute, you or Company must send to the other party a notice of dispute, in writing, setting forth the name, address and contact information of the party giving notice, the facts of the dispute and relief requested.  You may initiate proceedings by sending Us a Notice of Legal Dispute, to the address listed in the “Notices and Contact Information” above.",
    ],
  },
  { type: "p", runs: ["We will send any notice of dispute to you at the contact information we have for you."] },
  {
    type: "p",
    runs: [
      "You and Company agree to try to attempt to resolve a dispute through informal negotiation upon notice of a dispute for a period of 60 days.  If you and Company do not resolve the dispute in such 60-day time period, then you or Company may commence arbitration.  You and Company agree that a dispute will be heard before single a neutral arbitrator, whose decision will be final, except for a limited right of appeal under the U.S. Federal Arbitration Act.  ",
      { t: "YOU ARE GIVING UP THE RIGHT TO LITIGATE A DISPUTE IN A COURT OF LAW BEFORE A JUDGE OR JURY", b: true },
      ".  The arbitration proceedings shall be governed by the JAMS Comprehensive Arbitration Rules and Procedures and Expedited Procedures, or JAMS’ Streamlined Arbitration Rules and Procedures, at the election of the party initiating the arbitration.  Information regarding these rules can be found on the JAMS website at ",
      { t: "www.jamsadr.org", href: "http://www.jamsadr.org", ext: true },
      ".  In addition, you and Company agree that the following rules shall apply to the arbitration proceedings: (a) the arbitration shall be conducted, at the option of the party seeking relief, by telephone, online, or based solely on written submissions; (b) the arbitration shall not involve any personal appearance by the parties or witnesses unless otherwise mutually agreed by the parties; and (c) any judgment on the award rendered by the arbitrator may be entered in any court of competent jurisdiction.  The substantially prevailing party shall be entitled to an award from the arbitrator for its reasonable attorneys’ fees, arbitration costs, and other costs associated with the arbitration. The United Nations Conventions on Contracts for the International Sale of Goods shall have no applicability. Company will be entitled to seek injunctive and other equitable relief, in addition to whatever legal remedies are available, to prevent or cure any breach or threatened breach by you with respect to any violation of these Policies (and the incorporated policies), provided that nothing herein will be deemed to deny you the right to defend the issuance of injunctive or other relief.",
    ],
  },
  {
    type: "p",
    runs: [
      "To the fullest extent permitted by applicable law, NO ARBITRATION OR CLAIM UNDER THESE TERMS SHALL BE JOINED TO ANY OTHER ARBITRATION OR CLAIM, INCLUDING ANY ARBITRATION OR CLAIM INVOLVING ANY OTHER CURRENT OR FORMER USER OF THE SITES, AND NO CLASS ARBITRATION PROCEEDINGS SHALL BE PERMITTED – ONLY ON AN INDIVIDUAL BASIS.  ",
      { t: "You and Company agree that each may bring claims against the other only in your or its individual capacity and not as a plaintiff or class member in any class or representative action", b: true },
      ". In no event shall any claim, action or proceeding by you related in any way to the Sites be instituted more than one (1) year after the cause of action arose.",
    ],
  },
  { type: "h3", text: "Class Action & Representative Action Waiver", id: "class-action-waiver" },
  {
    type: "p",
    runs: [
      "To the fullest extent permitted by applicable law, you and Company agree that any claim, dispute, or controversy arising out of or relating to your use of the services, these Terms, or any relationship between you and Company shall be brought solely in an individual capacity and not as a plaintiff, claimant, class representative, class member, private attorney general, relator, or participant in any purported class, collective, consolidated, mass, coordinated, or representative proceeding.",
    ],
  },
  {
    type: "p",
    runs: [
      "Accordingly, you and Company expressly waive any right to bring, maintain, participate in, or recover through any class action, collective action, mass action, consolidated action, coordinated action, or other representative proceeding. No court or adjudicator shall have authority to hear or adjudicate any claim on a class, collective, mass, consolidated, coordinated, or representative basis.",
    ],
  },
  {
    type: "p",
    runs: [
      "If any portion of this Class Action & Representative Action Waiver is found to be unenforceable with respect to a particular claim or remedy, that portion shall be severed and the remainder of this provision shall remain enforceable to the fullest extent permitted by law. Any claim for which a waiver is determined to be unenforceable shall proceed only to the extent required by applicable law.",
    ],
  },
  {
    type: "p",
    runs: [
      "If a court of competent jurisdiction finds these arbitration provisions invalid or inapplicable, you agree to the exclusive jurisdiction of the Federal and State courts located in Nashville, Tennessee, and you agree to submit to the exercise of personal jurisdiction of such courts for the purpose of litigating any applicable claim or action.",
    ],
  },

  { type: "h3", text: "18. California Residents." },
  {
    type: "p",
    runs: [
      "This section applies to any California residents (and other residents who reside in a State with similar privacy laws) about whom Company has collected personal information from any source, including through your use of Company’s Site, including by filling out a form on the Site, buying Company’s products or services, or communicating with Company electronically, in paper correspondence, or in person. For purposes of this section, “personal information” means information that identifies, relates to, describes, is reasonably capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular California consumer/resident or household. Personal information does not include publicly available information or information that has been de-identified.",
    ],
  },
  {
    type: "p",
    runs: ["a.  ", { t: "What Information We Collect", u: true }, ": We may collect the following categories of personal information about you:"],
  },
  {
    type: "ul",
    items: [
      [{ t: "Identifiers", u: true }, ", which includes first and last name; postal address; Internet Protocol (“IP”) address (for purposes of error log files only); email address; name, and password;"],
      [{ t: "Information relating to Internet activity or other electronic network activity", u: true }, ", which includes cookie identifiers (e.g. session and persistent); logins to and logouts from, and downloads of documents from the Site; clear gifs (a.k.a. web beacons/web bugs or so-called pixels); log files; browser type; referring/exit pages; operating system; date/time stamp; device characteristics ; internet service provider (ISP); amount of data transmitted; pages accessed on the Site; clickstream data; device platform; device characteristics including your choice of settings such as Wi-Fi, Bluetooth, and Global Positioning System (“GPS”) data; and"],
      [{ t: "Geolocation data", u: true }, ", which includes GPS data; locational information based upon your IP address; cell network data; and/or other similar locational data; and which may be collected from various devices including your mobile device(s) or vehicle(s)."],
    ],
  },
  {
    type: "p",
    runs: ["b.  ", { t: "What We Do With Your Information", u: true }, ": We may collect or use personal information from you for the following purposes:"],
  },
  {
    type: "ul",
    items: [
      ["Customer claims and fraud investigation and prevention"],
      ["Customer communications (e.g. newsletter)"],
      ["Customer relationship management"],
      ["Financial reporting and accounting"],
      ["General business administration"],
      ["Internal analytics"],
      ["Investigate, protect, enforce, or defend the legal rights, privacy, safety or property of us or others"],
      ["Systems and data security"],
      ["Website optimization and maintenance"],
    ],
  },
  {
    type: "p",
    runs: ["c.  ", { t: "Sources of Collected Information", u: true }, ": We may collect personal information from the following categories of sources:"],
  },
  {
    type: "ul",
    items: [
      ["Our users / members, including via our websites, the my.bmg.com platform, mobile applications, telephone, text message, postal mail, social media, forums, message boards, chatbot, or other means;"],
      ["Our affiliates;"],
      ["Our service providers, which includes customer relationship management providers, analytics providers, website hosting providers, systems administrators, and communications delivery services;"],
      ["Our third party business partners (“Company Partners”); and"],
      ["Other third parties, which includes operators of other websites and mobile applications, online advertising partners, and other data suppliers."],
    ],
  },
  {
    type: "p",
    runs: ["d. ", { t: "Who We Share Information With", u: true }, ": We do not sell personal information, or otherwise provide personal information to third parties, other than service providers receiving information to perform services for us on our behalf."],
  },
  { type: "p", runs: ["We may share your personal information with the following categories of third parties:"] },
  { type: "ul", items: [["Affiliates"], ["Service providers"], ["BMG Partners"]] },
  {
    type: "p",
    runs: ["e. ", { t: "Your Privacy Rights", u: true }, ": If you are a California resident, subject to applicable law, you have the following rights under California law with respect to your personal information:"],
  },
  {
    type: "ul",
    items: [
      [{ t: "Right to Know. ", b: true }, "You have the right to request what personal information we collect, use, disclose, and/or sell, as applicable."],
      [{ t: "Right to Delete. ", b: true }, "You have the right to request the deletion of your personal information that is collected or maintained by us."],
      [{ t: "Right to Opt-Out of Sale. ", b: true }, "You have the right to opt-out of the sale of your personal information by us."],
      [{ t: "Right to Non-Discrimination. ", b: true }, "You have the right not to receive discriminatory treatment by us for the exercise of the privacy rights described above."],
    ],
  },
  { type: "h3", text: "General Data Protection Regulation (GDPR)" },
  {
    type: "p",
    runs: [
      "If you are located in the European Economic Area (“EEA”), Switzerland, or the United Kingdom, the processing of your personal data is subject to applicable data protection laws, including the General Data Protection Regulation (EU) 2016/679 (“GDPR”) and the United Kingdom GDPR.",
    ],
  },
  { type: "h3", text: "Privacy Notice" },
  {
    type: "p",
    runs: [
      "Our collection, use, disclosure, retention, and protection of personal data are governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the services, you acknowledge that you have reviewed our Privacy Policy.",
    ],
  },
  { type: "h3", text: "Lawful Bases for Processing" },
  { type: "p", runs: ["Where GDPR applies, we process personal data only where we have a lawful basis to do so, including:"] },
  {
    type: "ul",
    items: [
      ["Performance of a contract with you;"],
      ["Compliance with legal obligations;"],
      ["Protection of vital interests;"],
      ["Legitimate business interests that are not overridden by your rights and freedoms; and"],
      ["Your consent, where consent is required by law."],
    ],
  },
  { type: "h3", text: "International Data Transfers" },
  {
    type: "p",
    runs: [
      "Your personal data may be transferred to and processed in countries outside your country of residence, including the United States and other jurisdictions that may not provide the same level of data protection as your home jurisdiction. Where required by applicable law, we implement appropriate safeguards for international transfers, including Standard Contractual Clauses approved by the European Commission or other lawful transfer mechanisms recognized under applicable data protection laws.",
    ],
  },
  { type: "h3", text: "Data Subject Rights" },
  {
    type: "p",
    runs: ["Subject to applicable law, individuals located in the EEA, Switzerland, and the United Kingdom may have the following rights regarding their personal data:"],
  },
  {
    type: "ul",
    items: [
      ["Right of access;"],
      ["Right to rectification;"],
      ["Right to erasure (“right to be forgotten”);"],
      ["Right to restriction of processing;"],
      ["Right to data portability;"],
      ["Right to object to processing;"],
      ["Right to withdraw consent at any time where processing is based on consent; and"],
      ["Right not to be subject solely to automated decision-making, including profiling, where prohibited by law."],
    ],
  },
  { type: "p", runs: ["Requests regarding these rights may be submitted using the contact information provided below."] },
  { type: "h3", text: "Marketing Communications" },
  {
    type: "p",
    runs: [
      "Where required by applicable law, we will obtain consent before sending marketing communications. Individuals may opt out of marketing communications at any time by following the unsubscribe instructions included in such communications or by contacting us directly.",
    ],
  },
  { type: "h3", text: "Data Retention" },
  {
    type: "p",
    runs: [
      "We retain personal data only for as long as reasonably necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, enforce agreements, and protect our legitimate business interests.",
    ],
  },
  { type: "h3", text: "Security Measures" },
  {
    type: "p",
    runs: [
      "We implement reasonable and appropriate technical and organizational measures designed to protect personal data against unauthorized access, disclosure, alteration, loss, or destruction. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  { type: "h3", text: "Complaints" },
  {
    type: "p",
    runs: [
      "If you believe your rights under applicable data protection laws have been violated, you may lodge a complaint with the supervisory authority in your country of residence, place of work, or place of the alleged infringement.",
    ],
  },
  { type: "h3", text: "Data Protection Contact" },
  {
    type: "p",
    runs: [
      "Questions regarding privacy or personal data processing may be directed to the address above in ",
      { t: "Section 15", href: "#section-15", b: true },
      ".",
    ],
  },
  { type: "p", runs: [{ t: "You may also authorize someone to exercise the above rights on your behalf", b: true }, "."] },
  {
    type: "p",
    runs: [
      "The above rights are subject to our being able to reasonably verify your identity and authority to make these requests. These rights are also subject to various exclusions and exceptions under applicable laws. If you are a California resident and wish to seek to exercise these rights, please reach out to our legal department (for details see ",
      { t: "Section 15", href: "#section-15", b: true },
      ").",
    ],
  },
  { type: "p", runs: [{ t: "All rights not expressly granted are reserved by Company", b: true }, "."] },
  { type: "p", runs: [{ t: "Last updated June 12, 2026", i: true }] },
];

export default function TermsPage() {
  return <LegalArticle title="Terms & Conditions" blocks={blocks} />;
}
