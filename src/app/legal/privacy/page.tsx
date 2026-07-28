import type { Metadata } from "next";
import LegalArticle, { type Block, type Run } from "@/components/legal/LegalArticle";
import { BODIES, LEGAL_EMAIL, OPTOUT_EMAIL, mailto, SUBJECTS } from "@/components/legal/links";

export const metadata: Metadata = {
  title: "Privacy & Cookies Policy",
  description:
    "Privacy Policy and Cookies Policy for the Label-related and artist-related websites operated by Nashville Harbor Records & Entertainment, LLC and affiliates.",
  alternates: { canonical: "https://bigmachinerecords.com/legal/privacy" },
  robots: { index: false, follow: true },
};

// Reusable links
const optNewsletter: Run = {
  t: OPTOUT_EMAIL,
  href: mailto(OPTOUT_EMAIL, SUBJECTS.newsletterUnsubscribe, BODIES.newsletterUnsubscribe),
};
const gPrivacy = (t = "privacy policy"): Run => ({ t, href: "https://policies.google.com/privacy", ext: true });

const blocks: Block[] = [
  // ── Privacy Policy ──
  {
    type: "p",
    id: "privacy-policy",
    runs: [
      "This policy explains how and why we collect, use and share your personal data. As used herein, “we,” “us,” our,” and/or “Label” shall collectively refer to: (1) Nashville Harbor Records & Entertainment, LLC; (2) Borchetta Entertainment Group, LLC; (3) Big Machine Racing Productions, LLC; (4) SB Entertainment Group, LLC; (5) all current or future affiliates of any of the foregoing; and (6) all Label-related artist websites.",
    ],
  },
  {
    type: "p",
    runs: [
      "It describes our privacy practices in relation to our online, digital or mobile services for which this policy is posted or linked (the “",
      { t: "services", b: true },
      "”). Those include each of our label-related or artist-related websites, apps, data integration tools and software, as well as any of our other products, services, content, adverts or activities for which this policy is posted or linked.",
    ],
  },
  {
    type: "p",
    runs: ["It covers all the related data collection activities (online and offline) of the relevant Label group companies, as explained in section 1 below."],
  },
  {
    type: "p",
    runs: ["Our relevant site(s) for the services are referred to below, collectively and individually, as the “", { t: "site", b: true }, "”."],
  },

  { type: "h2", text: "Contents" },
  {
    type: "ul",
    items: [
      [{ t: "1 Collection and processing of data", href: "#s1" }],
      [{ t: "2 Use of your personal data", href: "#s2" }],
      [{ t: "3 Newsletter", href: "#s3" }],
      [{ t: "4 Sharing with third parties", href: "#s4" }],
      [{ t: "5 Data transfers outside US", href: "#s5" }],
      [{ t: "6 Cookies", href: "#s6" }],
      [{ t: "7 Third-party links", href: "#s7" }],
      [{ t: "8 Data security", href: "#s8" }],
      [{ t: "9 Data retention", href: "#s9" }],
      [{ t: "10 Your legal rights", href: "#s10" }],
      [{ t: "10.1 For European residents", href: "#s10-1" }],
      [{ t: "10.2 For California residents", href: "#s10-2" }],
      [{ t: "10.3 Sensitive Personal Information", href: "#s10-3" }],
      [{ t: "10.4 For other residents", href: "#s10-4" }],
      [{ t: "11 Children", href: "#s11" }],
      [{ t: "12 Changes to this policy", href: "#s12" }],
      [{ t: "13 Compliance with Applicable Law", href: "#s13" }],
      [{ t: "14 Contact us", href: "#s14" }],
    ],
  },

  { type: "h2", text: "1 Collection and processing of data", id: "s1" },
  {
    type: "p",
    runs: [
      "For services provided from the USA and elsewhere, each of the services are run by a Label group company (as applicable), which collects personal data in connection with that service and acts as the data controller for such data, and such Label’s principal place of business is 1221 16th Ave. South, Nashville, TN, 37212.",
    ],
  },
  {
    type: "p",
    runs: ["Just to be clear, this policy does not, however, apply to any Label group sites for which a different privacy policy is posted or linked from time to time."],
  },
  {
    type: "p",
    runs: [
      "For the services to which this policy does apply, we, as well as our affiliated Label companies, artists and/or writers and/or our or their third-party suppliers, technology partners and/or marketing partners (all of the foregoing together, our “",
      { t: "partners", b: true },
      "”), may collect and process certain personal data relating to you, i.e. information that identifies (or makes it possible to identify) you as a natural person (e.g. your name, postal address, email address, telephone number, date of birth, age, country of residence and/or IP address). We and/or our partners may collect such information when you take part in various opportunities and services provided via the site or a partner site, such as when you participate in an artist- or label-related marketing campaign via the site or a partner site or otherwise engage with our content, or when you purchase products, services or digital content through a store that is associated with the site (if any, the “",
      { t: "store", b: true },
      "”, which may be hosted by a third-party supplier).",
    ],
  },
  {
    type: "p",
    runs: [
      "Processing means any operation that is performed on personal data, such as collection, recording, organisation, structuring, storage, adaptation, retrieval, any kind of disclosure, erasure or destruction or other use. For example, we process personal data when you:",
    ],
  },
  {
    type: "ul",
    items: [
      ["actively communicate with us;"],
      ["subscribe to services (e.g. newsletters, artist information bulletins or other communications) that we may provide through the site;"],
      ["make a purchase via the store;"],
      ["take part in a contest, promotion, survey or other type of promotion through the site, the store or any linked social media;"],
      ["contribute to a blog or forum; or"],
      ["link any of your accounts relating to media consumption (e.g. Spotify or Apple) or social media to Label services, including those operated by a third party on our behalf, or otherwise engage with our content."],
    ],
  },
  {
    type: "p",
    runs: ["On each of your visits to the site, we also collect the following technical data, as transmitted by your browser or device to the site:"],
  },
  {
    type: "ul",
    items: [
      ["your type of browser and type of operating system;"],
      ["the internet protocol (IP) address allocated to your internet access when you visited the site;"],
      ["the URL of the internet page from which you arrived at the site;"],
      ["the date and time when you accessed, clicked through and left the site;"],
      ["the amount of data transmitted; and/or"],
      ["the searches you made and the pages you accessed on the site."],
    ],
  },
  {
    type: "p",
    runs: ["We may also receive certain activity data from our partners (e.g. our third-party technology partners), such as data on your interests, purchase history or listening or viewing activity."],
  },

  { type: "h2", text: "2 Use of your personal data", id: "s2" },
  { type: "p", runs: ["We and our partners may use your personal data for the following purposes:"] },
  {
    type: "ul",
    items: [
      ["to provide access to the site and other services;"],
      ["to respond to your enquiries and to fulfil your requests (e.g. to send you newsletters or to provide you with information about our products, services and content);"],
      [
        "to monitor customer traffic patterns and site usage to help us and our partners enhance your enjoyment during the online experience (and for further information on the use of data for web analytics and marketing purposes, please refer to our ",
        { t: "Cookies Policy", href: "#cookies-policy" },
        ");",
      ],
      ["to provide assessment and analysis (e.g. customer, audience, promotional and market analysis) to enable us: (a) to review, develop and improve the services, products and content that we and/or our partners offer; and (b) to use the results of such analysis (e.g. based on segmentation by location, interests, purchase history and/or other characteristics) to build a user profile for use in connection with customised online advertising (where permitted);"],
      ["to show you customised online advertising (where permitted), which may be based on our analytical data and/or data relating to your engagements with us on other sites or platforms that you are using (which could include partner sites, social media and/or search engines);"],
      ["to provide you (or to permit selected third parties to provide you) directly with information about products, services and/or content that we believe may interest you (including but not limited to content and/or materials relating to any Label artist or any artist signed to affiliates thereof);"],
      ["to notify you about changes to site terms and policies;"],
      ["to allow you to take part in competitions and similar promotions and to administer those activities (which may contain additional requirements and information about how we or our partners may use your personal information); and/or"],
      ["any other use permitted by applicable law."],
    ],
  },
  {
    type: "p",
    runs: [
      "These processing activities are necessary for the purposes of our, our partner’s, and any such third parties’ legitimate interests to improve your site and/or store experience and to improve our and/or their products, services and/or content and/or to use the site and/or store for informational and general marketing purposes. For any direct marketing purposes, we process such communications on the basis of your consent, where (and for as long as) you have given it. It is also in your and our mutual legitimate interest to respond to your enquiries and requests.",
    ],
  },
  {
    type: "p",
    runs: [
      "We do not seek to collect any special categories of personal data about you or anyone associated with you: such information would include information about a person’s racial or ethnic origin, political opinions, religious or philosophical beliefs, trade union membership, genetic or biometric data (where used for identification purposes), health, sex life or sexual orientation. Nor do we seek to collect any information about criminal convictions and offenses. If, however, you in fact provide us with any such special or crime-related information (e.g. when using any interactive feature of the site), then by submitting it, you consent to the use of such information by us and/or our partners for (a) the purpose for which you have voluntarily provided it and (b) any purpose that is reasonably compatible with such purpose. You may withdraw that consent at any time by contacting us in the manner herein described below.",
    ],
  },
  {
    type: "p",
    runs: [
      "We also process your personal data where and to the extent necessary: (a) for any purposes required or permitted under any relevant laws or regulations of any relevant jurisdiction; (b) to enforce or apply the site’s terms of use or other contracts with you; and/or (c) to protect our, our users’ or any other third parties’ rights, property or safety.",
    ],
  },

  { type: "h2", text: "3 Newsletter", id: "s3" },
  { type: "p", runs: ["This section 3 only applies if we offer a newsletter via the site or the store (from us or from any of our partners)."] },
  {
    type: "p",
    runs: [
      "When you subscribe to the newsletter, we will only send it to you by email if you confirm your email address (e.g. by clicking on a link via the site or in a notification email). In that case, we will store and use your relevant personal data (including your email address), the time of registration, the IP address used for registration and the location from which you registered. Your subscription to any newsletter relating to any particular Label artist shall be deemed your consent to receive similar newsletters from any other Label artist and/or any artist signed to current or future affiliates thereof.",
    ],
  },
  {
    type: "p",
    runs: [
      "The purposes of such processing are (a) to send you editions of the newsletter, (b) to confirm your registration and (c) to gather data to help us analyse how to improve the newsletter and/or to inform our analysis for customised online advertising (where permitted). The legal basis of the processing is your consent (as far as given) or otherwise our legitimate interest in undertaking such confirmation and analysis.",
    ],
  },
  {
    type: "p",
    runs: ["If, when subscribing to the newsletter, you also consent to receive information about our and/or selected third parties’ products, services or content, the provision of that information is based on that consent."],
  },
  {
    type: "p",
    runs: [
      "You can unsubscribe from the newsletter at any time by clicking on the link provided in each of our newsletters or sending us an email at ",
      optNewsletter,
      ". If unsubscribing, please state the name (such as the relevant label or artist name) of the mailing list that you wish to be removed from. You can also, at any time, withdraw your consent to receive such direct marketing communications by sending us an email to that effect at ",
      optNewsletter,
      ". In either case, such request will only be effective going forward. We may still continue to process certain related data where permitted (e.g. to give effect to your preference), unless you have any relevant rights to restrict or prevent such processing and exercise those rights (as further explained hereinbelow).",
    ],
  },
  {
    type: "p",
    runs: [
      "For our newsletters we may also use commercially established technologies that enable us to measure interactions with the newsletter (e.g. emails opened and links clicked). If applicable, we use such data for general statistical evaluations, as well as for the optimisation and further development of our content and customer communication and/or to inform our analysis for customized online advertising (where permitted). That information is collected using small graphics embedded in the newsletter (known as “pixels”), which can also collect technical data about the device you use. The legal basis for this is your consent (as far as given) or otherwise our legitimate interest in understanding how users interact with the newsletter and in improving our content and customer communication and/or the relevance of customised online advertising (where permitted).",
    ],
  },
  {
    type: "p",
    runs: ["Through our newsletter we want to share content that is as relevant as possible for our customers and to gain a better understanding of what readers are actually interested in. If you do not wish to be involved in the analysis of such usage behaviour, you can unsubscribe from our newsletter or deactivate graphics in your email program by default."],
  },

  { type: "h2", text: "4 Sharing with third parties", id: "s4" },
  { type: "p", runs: ["We may share your personal information for the above purposes from time to time with the following third parties:"] },
  {
    type: "ul",
    items: [
      ["any member of Label’s group of companies (which means our subsidiaries and our ultimate holding company and its subsidiaries) so that such third party may process and use your personal information in any way in which we may process and use your personal information under this policy;"],
      ["our third-party suppliers that provide us with site-related services (such as hosting, data analysis (including webtracking services), search engines, payment processing, order fulfilment, IT services, email delivery, customised online advertising, auditing and other similar services) to enable them to provide such services and/or to assist us in improving and optimising the site (and, in the interests of compliance with applicable data-protection and privacy laws, each of those third-party suppliers is bound by a data processing agreement or some other appropriate safeguard will be in place);"],
      ["any artist connected at any time with the site (including individual band members, if relevant) and such artist’s representatives and third-party suppliers, so that they may: (a) process your personal information in any way in which we may process your personal information under this policy; and (b) if you have consented to their doing so, use such information to send you communications (including marketing communications) that they believe may be of interest to you;"],
      ["any third party that sponsors or provides (in whole or in part) a competition or similar promotion through the site for all purposes in connection with such contest or promotion;"],
      ["any third party with whom you communicate on or via the site (e.g. via message boards, chats, profile pages, blogs and other services to which you are able to post information and materials), but only to the extent that your personal information is included by you in such communication; and/or"],
      ["any other third-party partner, so that such third party may process your personal information in any way in which we may process your personal information under this policy."],
    ],
  },
  {
    type: "p",
    runs: ["Any such sharing of personal data is based on our legitimate interests as specified in section 2 above or (where given) your consent."],
  },
  {
    type: "p",
    runs: ["We may share your personal information with any person where necessary: (a) for any purposes required by or permitted for such person under any relevant laws or regulations of any relevant jurisdiction; (b) to enforce or apply the site’s or the store’s terms of use or other contracts; and/or (c) to protect our, our users’ or any other third parties’ rights, property or safety."],
  },
  {
    type: "p",
    runs: ["We also anonymise your personal data, as it is in our legitimate interest to use aggregated, non-personal information to analyse our target audience and web traffic. We may publish, or share with partners (including but not limited to any current or future affiliates of Label), aggregated non-personal data, which will not identify you individually."],
  },

  { type: "h2", text: "5 Data transfers outside US", id: "s5" },
  {
    type: "p",
    runs: ["The information we collect from you may be transferred to, processed and stored at a destination outside the US, e.g. when we transfer data to members of Label’s group of companies or to our other partners."],
  },

  { type: "h2", text: "6 Cookies", id: "s6" },
  {
    type: "p",
    runs: [
      "A “cookie” is a small text file deposited on your device’s hard drive when you access a website. We may use cookies to monitor your use of the site and to customise your experience of it. For further details, please refer to our ",
      { t: "Cookies Policy", href: "#cookies-policy" },
      ".",
    ],
  },

  { type: "h2", text: "7 Third-party links", id: "s7" },
  {
    type: "p",
    runs: ["The site may contain links to other sites not owned or controlled by us. We are not responsible for the content of any such site, the site operator’s privacy or cookies policies or how the site operator treats information (personal or otherwise) obtained from users of the site. We advise you to check that site’s privacy and cookies policies to satisfy yourself as to how the site operator will treat any such information."],
  },

  { type: "h2", text: "8 Data security", id: "s8" },
  { type: "p", runs: ["We take reasonable precautions to protect against the loss, misuse or alteration of your personal information and to ensure that it will be processed in accordance with this policy."] },
  {
    type: "p",
    runs: ["Unfortunately, the transmission of information via online or mobile networks is not completely secure. You acknowledge and accept that others may intercept personal information you provide to us, and that any such transmission is at your own risk. Once we have received your information, we use set procedures and security features to try to prevent unauthorised access."],
  },

  { type: "h2", text: "9 Data retention", id: "s9" },
  { type: "p", runs: ["We strive to keep our processing activities in relation to your personal data as limited as possible."] },
  {
    type: "p",
    runs: ["Personal, non-technical data provided by you when using our services and activity data received from our partners will be retained only for as long as we and/or our relevant partner(s) need it to fulfil the purpose for which such data were collected, or for as long as required by statutory retention requirements."],
  },
  {
    type: "p",
    runs: ["Technical data will be retained only as long as it is necessary to provide access to the site or to fulfil other purpose(s) of processing described in this policy. Your IP address will be retained as long as required to enable us to engage in effective defence against attacks on our site, such as distributed denial of service (DDoS) attacks. We and/or our partners may retain technical data as long as certain marketing purposes require. We and/or our partners may also retain your technical data longer than might otherwise be required where storage of data is required by statutory retention obligations, as may be the case regarding information that is relevant for obligations under tax and commercial law."],
  },

  { type: "h2", text: "10 Your legal rights", id: "s10" },
  { type: "h3", text: "10.1 For European residents", id: "s10-1" },
  {
    type: "p",
    runs: ["In certain circumstances, you have the following legal rights in relation to your personal information (to the extent consisting of “personal data” in the UK, the EEA and any other European countries with equivalent data protection laws). We may ask you for additional information, so that we take reasonable steps to check that – for example – we only provide personal data to the person to whom the data relate."],
  },
  {
    type: "ul",
    items: [
      [{ t: "Right of access", b: true }, " to your personal data (also known as a \"data subject access request\"). This enables you to receive a copy of the personal data that we hold about you and to check that we are lawfully processing such data."],
      [{ t: "Right of rectification", b: true }, " of the personal data that we hold about you. This enables you to have any incomplete or inaccurate data we hold about you corrected, although we may need to verify the accuracy of the new data that you provide to us."],
      [{ t: "Right to erasure", b: true }, " of your personal data. This enables you to ask us to delete or remove personal data in certain circumstances. Please note, however, that we may retain your data in certain circumstances in accordance with law, which will be notified to you, if applicable, at the time of your request."],
      [{ t: "Right to restriction of processing", b: true }, " of your personal data. This enables you to ask us to suspend the processing of your personal data in the following scenarios: (a) if you would like us to establish the accuracy of such data; (b) where our use of the data is unlawful, but you do not want us to erase the data; (c) where you need us to hold the data even if we no longer require the data as you need the data to establish, exercise or defend legal claims; or (d) you have objected to our use of your data, but we need to verify whether we have overriding legitimate grounds to use the data."],
      [{ t: "Right to portability", b: true }, " of your personal data to you or to a third party. If you so request, we shall provide you, or a third party that you have chosen, with a copy of your personal data in a structured, commonly used, machine-readable format. Please note that this right only applies to automated information that you initially provided consent for us to use or where we used the information to perform our contract with you."],
      [{ t: "Right to object to processing", b: true }, " of your personal data where we are relying on a legitimate interest (or those of a third party) and there is something about your particular situation that makes you want to object to processing on this ground, in which case we will consider whether we have compelling reasons to continue to process your data."],
      [{ t: "Right to object to direct marketing", b: true }, ". You also have the right to object where we are processing your personal data for purposes of direct marketing. Please see the details above on how to exercise the right."],
      [{ t: "Right to withdraw consent at any time", b: true }, " where we are relying on consent to process your personal data. If you withdraw your consent, we may not be able to provide certain products, services or content to you. The withdrawal of consent does not affect the legality of the processing carried out based on the consent until the withdrawal."],
      [{ t: "Right to complain", b: true }, ". If you would like to complain, please ", { t: "contact us", href: mailto(OPTOUT_EMAIL, SUBJECTS.euComplaint, BODIES.euComplaint) }, " using the details below. This does not override your right to complain to the relevant supervisory authority at any time."],
    ],
  },

  { type: "h3", text: "10.2 For California residents", id: "s10-2" },
  { type: "p", runs: ["Under California law, residents of California are entitled, among other things, to access, delete, and opt out of the sale of certain personal information."] },
  {
    type: "p",
    runs: [
      "Accordingly, this section addresses the obligations and rights under the California Consumer Privacy Act (the “",
      { t: "CCPA", b: true },
      "”). Those apply to businesses operating in California and to California residents, and they concern information that identifies, relates to, describes, is reasonably capable of being associated with or could reasonably be linked (directly or indirectly) with California consumers or households (“",
      { t: "California information", b: true },
      "”).",
    ],
  },
  { type: "p", runs: ["Our California privacy practices are as follows:"] },
  {
    type: "ul",
    items: [
      [{ t: "Sources of collection – ", i: true }, "The sources from which we may obtain California information may include: (a) direct from you, including technical and usage information when using the site; (b) linked sites, such as social media and third-party platforms; (c) our group companies, joint venturers and strategic and promotional partners; (d) information providers; (e) distributors and other sellers; (f) marketing mailing lists; (g) other users submitting California information about you, e.g. to invite you to take part in an offering, to make a recommendation or to share content; (h) publicly available sources; and/or (i) any other source described in section 1 above."],
      [{ t: "California information collected", i: true }, " – The types of California information that may be collected by or for us may include: name, postal address, email address, payment details or other similar identifiers; IP address, device ID or other similar online identifiers; characteristics of protected classifications (such as ethnicity or sexual orientation); purchase history, consumption tendency or other commercial information; browsing or search history, views or other online interaction with the service or with service content; professional or educational information; biometric information; video, audio, photographic or calendar content; location information; inferences drawn from such information, e.g. individual profiles, preferences, characteristics or behaviours; and/or any other types of information described in section 1 above."],
      [{ t: "Purposes of collecting California information", i: true }, " – The purposes for which California information may be collected by or for us may include: performing services in connection with our operations, e.g. customer service, processing or fulfilling orders or requests, processing payments or providing content recommendations; auditing customer transactions; prevention of fraud or crime; fixing system errors; marketing or advertising; internal research, analytics or development; developing, maintaining, supporting or upgrading networks, products, services, content or devices; and/or any other purpose described in section 2 above."],
      [{ t: "Sharing of California information", i: true }, " – The California information collected may be shared by or for us: for operational purposes with our partners; and/or for any other purpose described in section 4 above. We note that the CCPA defines “sale” widely, including the sharing of California information in exchange for anything of value. Yet it is not our practice to make any such sale of California information, and we have not done so in the 12 months before issuing this policy. Incidentally, third‑party advertising cookies may be set via the site with your prior consent (and for further details, please see our ", { t: "Cookies Policy", href: "#cookies-policy" }, "), and any associated disclosure from you to the third party may, for CCPA purposes, constitute a “sale”, which will also be covered by the third party’s own privacy and/or cookies policy."],
      [{ t: "Right to request disclosure of California information", i: true }, " – If you are a resident of California, you may: (a) request information on our practices relating to the disclosure of your personal information by certain members of the Label group of companies to certain third parties for their direct marketing purposes; and/or (b) request certain information about our practices relating to California information over the 12-month period preceding your request, including (i) the categories and specific pieces of such information that we have collected, (ii) the categories of sources of such information, (iii) the business or commercial purposes for our collection, sale or sharing of such information, (iv) the categories of third parties to whom we disclose such information and (v) categories of such information that we share with suppliers of services to us."],
      [{ t: "Right to request deletion of California information", i: true }, " – At your request, we shall delete California information we have collected about you, unless we need that information so that we can: (a) provide you with a product, service or content requested by you; (b) perform a contract between you and us; (c) maintain the functionality or security of our systems; (d) comply with or exercise rights provided by law; or (e) use the information internally in ways that are compatible with the context in which you provided the information to us, or that are reasonably aligned with your expectations based on your relationship with us."],
      [{ t: "How to request disclosure or deletion of California information", i: true }, " – If you desire to opt-out or unsubscribe, click ", { t: "HERE", href: mailto(OPTOUT_EMAIL, SUBJECTS.caDelete, BODIES.caDelete), b: true }, " and provide your full name and email/postal address, stating “California privacy request” in the heading or subject line. We may from time to time facilitate alternative methods of submitting such requests, in which case we shall confirm such methods on request and/or update this policy accordingly."],
      [{ t: "CCPA metrics", i: true }, " – CCPA regulations require certain businesses to disclose metrics for the previous calendar year for California residents’ requests, reporting on the number of access, deletion, and “do not sell” requests made, the number fulfilled (in whole or part) and the number denied. If that applies to us in due course, we shall provide a CCPA metrics reporting page on or via the site."],
      [{ t: "Do not track", i: true }, " – Currently, we do not take any action to respond to “do not track” signals or similar signals, since a uniform technological standard has not yet been developed. We keep new technologies under review, and we might adopt a standard in due course."],
      [{ t: "Under-16s", i: true }, " – CCPA has specific rules on the use of California information from consumers under 16 years old. Accordingly, if we knowingly collect California information of an under-16 consumer, we will not sell the information without affirmative permission to do so. If the consumer is between 13 and 16 years old, the consumer may provide such permission. If the consumer is under 13, the consumer’s parent or guardian must provide the permission. If you would like further information on how we handle California information from under-16 consumers, please contact us using the details set out in ", { t: "Section 14", href: "#s14" }, " below."],
      [{ t: "Our support for exercising your CCPA rights", i: true }, " – We are committed to providing you with appropriate control over your California information. If you exercise any of the rights described in this section 10.2, we will not disadvantage you. In particular, you will not be denied access to our products, services or content, nor will you be charged differently for those or provided with a different level or quality."],
    ],
  },

  { type: "h3", text: "10.3 Sensitive Personal Information", id: "s10-3" },
  {
    type: "p",
    runs: [
      "We generally do not seek data that may be considered “special” or “sensitive” personal data (e.g., government-issued identification numbers or information related to an individual’s racial or ethnic origin, political opinions, religious or other beliefs, health, criminal background, or trade union membership) from visitors of this site, and we ask that you do not provide such data. If we specifically require “special” or “sensitive” personal data in connection with one or more of the uses described below, we will request your consent to use the data in accordance with this policy and/or in the ways described at the point where you were asked to disclose the data. If you voluntarily share with us or post/upload any “special” or “sensitive” personal data to this site for any other reason, you consent that we may use such data in accordance with applicable law and this policy. If you choose to opt-out of use of your “sensitive” personal data after voluntarily providing the same, click ",
      { t: "HERE", href: mailto(OPTOUT_EMAIL, SUBJECTS.sensitiveInfo, BODIES.sensitiveInfo), b: true },
      " and put “Unsubscribe from Sensitive Personal Information Use” in the subject line as well as your full name and email/postal address in the body of the email.",
    ],
  },

  { type: "h3", text: "10.4 For other residents", id: "s10-4" },
  {
    type: "p",
    runs: ["Under laws of certain other jurisdictions from time to time, including without limitation Nevada and Virginia residents may be entitled to similar rights relating to the access to, deletion of and/or other forms of control over processing of personal data. Nothing in this policy affects those legal rights, and we shall endeavour to give effect to any relevant rights at your request."],
  },

  { type: "h2", text: "11 Children", id: "s11" },
  {
    type: "p",
    runs: ["This site is not directed toward children (as defined by local law) nor do we knowingly or intentionally collect information from children (as defined by local law) without parental consent except where in compliance with applicable laws. If we are made aware of any information provided by any children on our site, we will take additional steps to protect children’s privacy, including:"],
  },
  {
    type: "ul",
    items: [
      ["Notifying parents about our information practices with regard to children, including the types of personal information collected from children, the uses to which we may put that information, and whether and with whom we may share that information;"],
      ["In accordance with applicable law, and our practices, obtaining consent from parents for the collection of personal information from their children, or for sending information about our products and services directly to their children;"],
      ["Limiting our collection of personal information from children to no more than is reasonably necessary to participate in an online activity; and"],
      ["Giving parents access or the ability to request access to personal information we have collected from their children and the ability to request that the personal information be changed or deleted."],
    ],
  },

  { type: "h2", text: "12 Changes to this policy", id: "s12" },
  {
    type: "p",
    runs: ["Any changes we make to this policy will be posted on the site and, where we consider it appropriate, notified to you by email. Please check back frequently to see any changes to our privacy policy."],
  },

  { type: "h2", text: "13 Compliance with Applicable Law", id: "s13" },
  {
    type: "p",
    runs: ["This Privacy Policy is intended to comply with all applicable federal, state, and local laws, rules, and regulations having jurisdiction over same. Nothing in this Privacy Policy shall be construed to contravene applicable law, and wherever there is a conflict between any provision of this Privacy Policy and any statute, law, ordinance, order or regulation to the contrary to which the parties hereto have no legal right to contract, such statute, law, ordinance, order or regulation shall prevail. In such event, or if any provision of this Privacy Policy is held to be void, voidable, invalid or unenforceable, (i) the provision of this Privacy Policy so affected shall be limited only to the extent necessary to permit the compliance with minimum legal requirements and/or the order of any court or tribunal of competent jurisdiction, (ii) no other provision of this Privacy Policy shall be affected thereby, and (iii) all such other provisions of this Privacy Policy shall remain in full force and effect."],
  },

  { type: "h2", text: "14 Contact us", id: "s14" },
  {
    type: "p",
    runs: ["Any questions, comments or requests about this policy are welcome and should be addressed to our data protection team or directly to our data protection officer, at the address or email as provided hereinbelow:"],
  },
  {
    type: "ul",
    items: [
      ["Email: ", { t: LEGAL_EMAIL, href: mailto(LEGAL_EMAIL, undefined, BODIES.generalContact) }],
      ["Address: 1221 16th Ave. South, Nashville, TN, 37212."],
    ],
  },
  { type: "p", runs: [{ t: "Last modified: July 21, 2026", i: true }] },

  // ── Cookies Policy ──
  { type: "h2", text: "Cookies Policy", id: "cookies-policy" },
  { type: "p", runs: [{ t: "Last updated July 21, 2026", b: true }] },
  {
    type: "p",
    runs: ["This policy explains how we use cookies and similar technologies. As used herein, “we,” “us,” our,” and/or “Label” shall collectively refer to: (1) Nashville Harbor Records & Entertainment, LLC; (2) Borchetta Entertainment Group, LLC; (3) Big Machine Racing Productions, LLC; (4) SB Entertainment Group, LLC; (5) all current or future affiliates of any of the foregoing; and (6) all Label-related artist websites."],
  },
  {
    type: "p",
    runs: [
      "It describes that usage by Label and each relevant Label group company (including but not limited to current or future affiliates thereof) in relation to our online, digital or mobile services for which this policy is posted or linked (the “",
      { t: "services", b: true },
      "”). Those services include each of our label-related or artist-related websites, apps, data integration tools and software, as well as any of our other products, services, content, adverts or activities for which this policy is posted or linked.",
    ],
  },
  {
    type: "p",
    runs: ["Our relevant site(s) for the services are referred to below, collectively and individually, as “the ", { t: "site", b: true }, "”."],
  },
  {
    type: "p",
    runs: [
      "This policy forms part of our ",
      { t: "Privacy Policy", href: "#privacy-policy" },
      ", which also explains which Label group company operates each service and the types of partners with whom we share data. Just to be clear, this policy does not apply to any Label group sites for which a different cookies policy is posted or linked from time to time.",
    ],
  },
  { type: "h3", text: "About cookies" },
  {
    type: "p",
    runs: ["Cookies are widely used to allow online and mobile sites to function efficiently. A “cookie” is a small text file that (depending on your browser settings) is deposited on the hard drive of your computer, mobile phone, tablet or other smart device when you visit a site. The cookie may be sent back to that site when you visit again and may then be used by the server to identify and track your use of the site."],
  },
  {
    type: "p",
    runs: ["There are two main types of cookie. A “session cookie” is a temporary cookie that only remains in the cookie file of your device until you leave a website. A “persistent” cookie is a long-term cookie that will be stored by your device until its set expiry date (unless you delete it before the expiry date)."],
  },
  { type: "p", runs: ["We may also use some other technologies that work in a broadly similar way, such as web beacons, software development kits or locally stored objects."] },
  { type: "p", runs: ["We refer below to cookies and all such other similar technologies as “", { t: "cookies", b: true }, "”, for short."] },
  { type: "h3", text: "Rejecting and deleting cookies" },
  {
    type: "p",
    runs: ["If you object to the use of cookies on the site, most browsers can be configured to alert you to their use or to enable you to reject browser-based cookies. Third parties may use certain special types of cookies (such as flash cookies) that cannot be disabled by configuring browsers, although other methods of preventing or managing such cookies may be available to you (such as via the relevant third-party settings panel). You can also delete cookies already stored on your device."],
  },
  {
    type: "p",
    runs: [
      "The site itself may also provide you with a ",
      { t: "cookie consent tool", action: "cookie" },
      ", in which case you can also set your cookies choices and preferences for the site using that tool (in addition to any other methods of cookie control described below).",
    ],
  },
  { type: "p", runs: ["Further information on rejection and deletion of cookies, please visit your help or support page for your preferred internet browser."] },
  {
    type: "p",
    runs: ["If, however, you decide to disable or delete any cookies, some parts or features of the site (especially interactive features) may not work properly. Disabling or deleting cookies may also affect your ability to use other online or mobile sites."],
  },
  { type: "h3", text: "Our own cookies" },
  { type: "p", runs: ["We use the following types of cookies via the site for the following purposes:"] },
  {
    type: "ul",
    items: [
      [{ t: "Necessary", b: true }, ": enabling core site functionality. Strictly necessary cookies are essential to allow you to move around the site and to use certain site features, such as access to secure areas or provision of appropriate content based on your type of device. We don’t often use necessary cookies, but we may use them where required in that way."],
      [{ t: "Analytics", b: true }, ": allowing us to analyse site usage. Analytics cookies collect information on how you use the site, so that we can analyse traffic and understand users' interactions to perform analytics, including to analyse, measure and report on usage and performance of the site and marketing content. For this purpose, we may use third-party service providers such as Google, as explained further below."],
      [{ t: "Functional", b: true }, ": enabling us to personalise your experience of the site. Functional cookies allow the site to remember choices that you make (such as your user name or location) and to provide more personalised features. We may also use them to provide services that you request or to remember changes that you have made to site features that you can customise. The main functional cookies used on the site are certain non-persistent cookies to identify you as you use the site and/or leave it to visit any store associated with the site (the “store”). That helps Label and our third-party partners to provide you with a good experience when you browse the site and the store and also allows Label and our third-party partners to improve the site and the store. In particular, where relevant, we may use functional cookies for log-in identification, for load distribution, to store your language settings, and to note that information placed on the site or store has been displayed to you – so that on your next visit to the site or store it does not need to be displayed again."],
      [{ t: "Advertising", b: true }, ": enabling advertising partners to serve customised online advertising. Advertising cookies allow us, our affiliates and our and their advertising partners to target advertising of products, services or content. Those cookies also facilitate, manage and measure the performance of adverts displayed on or delivered by or through the site. Those advertising partners may also have the capability to track your browsing across sites, apps and social media sites."],
      [{ t: "Social media", b: true }, ": used when you share content with, or link to or from, social media. Social media cookies are used when you share content using a sharing button or “like” button on the site, or when you link your account or engage with our content on or through a social media site such as Facebook, Twitter, Google, Snapchat or TikTok. The social media site will record that you have done that, and the information may be linked to targeted advertising activities."],
    ],
  },
  {
    type: "p",
    runs: ["We would like to enable you to use the site and the store in a convenient and individual way. Accordingly, the uses of cookies described above are based on our and such third-party partners’ legitimate interests in operating, assessing and improving the site and the store (as well as any apps, data integration tools and/or other products/services that may be integrated or otherwise associated with the site and the store) and in serving you relevant site/store content and relevant advertising content."],
  },
  {
    type: "p",
    runs: ["The cookies do not contain any information that, in itself, personally identifies you and do not provide us with access to the rest of your device. We and such partners may, however, associate the information contained in cookies with personal information that you have provided to us or them separately."],
  },
  {
    type: "p",
    runs: ["We or such partners might introduce further types of cookie from time to time to improve your experience of the site or the store. If we do so, we or they will provide details of any such usage on the site and/or (as relevant) the store."],
  },
  {
    type: "p",
    runs: [
      "If you would like any further information on the cookies that we use, you can contact us at ",
      { t: OPTOUT_EMAIL, href: mailto(OPTOUT_EMAIL, SUBJECTS.cookiesInquiry, BODIES.cookiesInquiry) },
      " for further details.",
    ],
  },
  {
    type: "p",
    runs: ["We also use partners’ cookies (including comparable technologies such as web beacons) for analytical and marketing purposes. This is described in further detail in the sections below."],
  },
  { type: "h3", text: "Analytics and marketing" },
  {
    type: "p",
    runs: ["We use technologies to improve the site by analysing user behaviour and user data. That information includes, but is not limited to, the IP address, time and date of access to the site, device ID for a mobile device and cookie ID, as well as technical information about your device, such as the browser and operating system. We also use such data for marketing and retargeting purposes."],
  },
  {
    type: "p",
    runs: ["The legal basis for such processing is our legitimate interest in analysing the site’s traffic to improve the user’s experience and to undertake data-based marketing and advertising. Where you have given consent to our use of cookies for analytics and marketing purposes, the legal basis for that processing is your consent."],
  },
  { type: "p", runs: ["You can opt out of the use of cookies for analytics and marketing purposes using the opt-out function of the relevant cookie provided below."] },
  {
    type: "p",
    runs: ["Please note that other sites that may be accessible via the site by clicking on links (such as any associated store hosted by a third-party partner) may also use cookies, over which we have no control. You should check the privacy and cookies policies posted on the relevant third-party sites for further information on such cookies (including details of how to reject or delete such cookies)."],
  },
  { type: "h3", text: "Google cookies" },
  {
    type: "p",
    runs: ["The following cookies may be used on the site, in which case each is a service provided by Google LLC of 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA (“Google”)."],
  },
  { type: "h3", text: "Google Analytics" },
  {
    type: "p",
    runs: ["Google Analytics is a web-analysis service that uses cookies to analyse and improve the site on the basis of the site user’s usage pattern. The data accrued in this context may be transmitted by Google for analysis to a server in the USA and stored there. Should personal data be transmitted to the USA, Google has implemented appropriate safeguards. Your IP address will be abbreviated before the analysis of usage statistics, however, so that no conclusions can be drawn about your identity. For this purpose, Google Analytics has been extended on the site to include the code “anonymizeIP”, in order to guarantee an anonymised capture of IP addresses."],
  },
  {
    type: "p",
    runs: ["Google will process the information so gained in order to evaluate your use of the site, to assemble reports on the site activities for the site operators, and to supply further services connected with website use and internet use."],
  },
  {
    type: "p",
    runs: [
      "As set out above, you can configure your browser so that it rejects cookies, or you can prevent the capture of the data generated by cookies and relating to your use of the site (including your IP address) and the processing of such data by Google by downloading and installing the ",
      { t: "opt-out browser add-on", href: "https://tools.google.com/dlpage/gaoptout/", ext: true },
      " provided by Google. As an alternative to the browser add-on or if you browse the site from a mobile device, you can use this ",
      { t: "opt-out link", action: "cookie" },
      ". This will prevent the data collection of Google Analytics within the site (the opt-out link will only work in this browser and only for this domain). If you delete your cookies in this browser, you have to click on the link again.",
    ],
  },
  {
    type: "p",
    runs: ["You will find more detailed information on this matter in the ", gPrivacy("privacy policy"), " for Google Analytics."],
  },
  { type: "h3", text: "Google Ads / Google AdWords conversion tracker" },
  {
    type: "p",
    runs: ["Google AdWords conversion tracking may be used to capture specific customer actions (such as clicking on an advert, page call-up or download) and to analyse them. AdWords Remarketing may be used to display individualised advertising messages to you for our products, services or content on partner websites of Google."],
  },
  {
    type: "p",
    runs: ["For this purpose both services insert cookies. The data accrued in this context may be transmitted by Google for analysis to a server in the USA and stored there. In the event that personal data are transmitted to the USA, Google has implemented appropriate safeguards."],
  },
  {
    type: "p",
    runs: ["If you use a Google account, Google may – depending on the settings saved in your Google account – link your web and app browser history with your Google account and use information from your Google account in order to personalise adverts. If you do not wish for this allocation to the Google account, it will be necessary for you to log out before calling up our contact page at Google."],
  },
  {
    type: "p",
    runs: [
      "As set out above, you can configure your browser so that it rejects cookies. Additionally, in the cookie settings of Google’s ",
      { t: "support information", href: "https://support.google.com/ads/answer/2662922", ext: true },
      ", you can prevent Google cookies from being used for advertising purposes.",
    ],
  },
  { type: "p", runs: ["You can find more detailed information about this in Google’s ", gPrivacy("privacy policy"), "."] },
  { type: "h3", text: "Google DoubleClick" },
  {
    type: "p",
    runs: ["DoubleClick uses cookies to serve ads relevant to you. Use of DoubleClick allows Google and its partner sites to serve ads based on previous visits to our or other sites on the internet."],
  },
  {
    type: "p",
    runs: [
      "You may refuse the use of cookies by selecting the appropriate settings on your browser (as described above). But please note that if you do that, you may not be able to use the full functionality of the site. You can also prevent Google from collecting the data generated by the cookies and relating to your use of the site and from processing such data by Google by downloading and installing the DoubleClick ",
      { t: "deactivation browser plug-in", href: "https://support.google.com/ads/answer/7395996", ext: true },
      ". As an alternative to the browser plug-in or within browsers on mobile devices, you can disable the “Personalized Advertising” button in Google’s ",
      { t: "advertising settings", href: "https://support.google.com/ads/answer/2662922", ext: true },
      ". In this case, Google will only display general advertising that has not been selected based on the information collected about you.",
    ],
  },
  { type: "p", runs: ["We may use the following DoubleClick functionality:"] },
  {
    type: "ul",
    items: [
      ["Bid Manager, which enables users to create campaigns, to set bids on ad spaces online (e.g. a banner) and to evaluate the success of their campaign through reporting features;"],
      ["Bid Floodlight, which enables users to track multiple visits from the same browser using a cookie and is used for conversion tracking purposes; and/or"],
      ["Ad Exchange, a marketplace for ad spaces online (e.g. a banner), where marketers can purchase targets and optimise their campaigns."],
    ],
  },
  { type: "p", runs: ["Please refer to Google’s ", gPrivacy("privacy policy"), " for more information."] },
  { type: "h3", text: "Google Dynamic Remarketing" },
  {
    type: "p",
    runs: ["Google Dynamic Remarketing uses cookies to display personalised advertising messages on websites that work with Google. Cookies are also used to perform the analysis of website usage as a basis for the creation of interest-based adverts. The data arising in this context can be transmitted by Google to a server in the USA for evaluation and stored there. In the event that personal data are transferred to the USA, Google has implemented appropriate safeguards."],
  },
  {
    type: "p",
    runs: ["If you use a Google Account, depending on the settings in your Google Account, Google may link your Google web and App browsing history to your Google Account and use information from your Google Account to personalise ads. If you don’t want this association with your Google Account, you’ll need to log out of Google before you can access our contact page."],
  },
  {
    type: "p",
    runs: [
      "As described above, you can configure your browser to reject cookies, or you can prevent the collection of data generated by the cookies and related to your use of the site and the processing of such data by Google by accessing the Google ",
      { t: "advertising settings", href: "https://support.google.com/ads/answer/2662922", ext: true },
      " and setting the personalisation buttons to “Off”.",
    ],
  },
  { type: "p", runs: ["Please refer to Google’s ", gPrivacy("privacy policy"), " for more information on Dynamic Remarketing."] },
  { type: "h3", text: "Google Tag Manager" },
  {
    type: "p",
    runs: ["Google Tag Manager is used to manage tracking tools and other services, so-called “website tags”. A tag is an element that is stored in the source code of the site in order to record, for example, predefined usage data, such as an IP address. The Google Tag Manager does not itself use cookies and does not collect any personal data. The Google Tag Manager triggers other tags that may collect data. Some of the data are stored on a Google server in the USA. In the event that personal data are transferred to the USA, Google has implemented appropriate safeguards. If deactivation has been made at the domain or cookie level, it will remain in effect for all tracking tags implemented with Google Tag Manager."],
  },
  {
    type: "p",
    runs: [
      "For more information, please refer to Google’s ",
      { t: "privacy policy", href: "https://policies.google.com/privacy?hl=en", ext: true },
      " and Google’s ",
      { t: "further information", href: "https://marketingplatform.google.com/intl/en/about/tag-manager/", ext: true },
      " about Tag Manager.",
    ],
  },
  { type: "h3", text: "Meta cookies" },
  {
    type: "p",
    runs: ["The site may make use of Meta technologies such as the Meta pixel. The Meta pixel is a piece of code that functions by setting and triggering cookies to track users during their interaction with the site, both on and off its platforms, such as Facebook and Instagram. The pixel gathers site usage data to help to optimise advertising across those platforms, including by measuring effectiveness of ads (e.g. tracking conversions from ads), building targeted audiences for future ads and remarketing to site users who have already taken some kind of action on the site."],
  },
  {
    type: "p",
    runs: [
      "For further details about Meta cookies, please see Meta’s ",
      { t: "cookies policy", href: "https://www.facebook.com/policies/cookies/", ext: true },
      ".",
    ],
  },
  { type: "h3", text: "Social media plug-ins" },
  {
    type: "p",
    runs: ["On certain pages of the site or the store we may implement so-called “social media” plug-ins, such as Facebook’s “like” button, Twitter’s Twitter buttons and Google’s “+1” button. When you visit a page that displays one or more of such buttons, your browser will establish a direct connection to the relevant social media server and load the button from there. At the same time the provider of the social media service will know that the relevant page on the site or the store has been visited."],
  },
  {
    type: "p",
    runs: ["We have no influence on the data that any such social media provider collects on the basis of the buttons. According to the available information, however, if you do not click on the respective buttons, none of your personal data will be collected and stored unless you have logged onto to your social media account. In that case, certain user data (including your IP address at the time) may be collected and linked to the account information already present at the social media service. If you wish to prevent this, please log out of your social media accounts before visiting the site or the store."],
  },
  {
    type: "p",
    runs: ["In addition, clicking a button may also lead to a collection of certain data, such as your IP address. Social media providers such as Meta, Twitter, Google, Snapchat and TikTok may set cookies as well, unless you have disabled the acceptance and storage of cookies in your browser settings (see above)."],
  },
  {
    type: "p",
    runs: ["We receive no information from social media providers about which social media buttons you may personally have clicked or seen on the site or the store. If at all, we may receive a summarised, non-personalised statistical report on the use of the buttons."],
  },
  { type: "p", runs: ["The Meta, Twitter, Google, Snapchat and TikTok privacy policies are available via the following links:"] },
  {
    type: "ul",
    items: [
      ["Meta privacy policy: ", { t: "https://www.facebook.com/about/privacy/update", href: "https://www.facebook.com/about/privacy/update", ext: true }],
      ["X privacy policy: ", { t: "https://x.com/en/privacy", href: "https://x.com/en/privacy", ext: true }],
      ["Google privacy policy: ", { t: "https://policies.google.com/privacy", href: "https://policies.google.com/privacy", ext: true }],
      ["Snapchat privacy policy: ", { t: "https://values.snap.com/privacy/privacy-policy", href: "https://values.snap.com/privacy/privacy-policy", ext: true }],
      ["TikTok privacy policy: ", { t: "https://www.tiktok.com/legal/privacy-policy?lang=en", href: "https://www.tiktok.com/legal/privacy-policy?lang=en", ext: true }],
    ],
  },
  { type: "h3", text: "Other third-party cookies" },
  { type: "p", runs: ["Various cookies may be set by our third-party partners in connection with the site. In particular:"] },
  {
    type: "ul",
    items: [
      ["Our third-party partners may set cookies as part of the integration of third-party services, such as if Spotify or Apple is integrated into the site."],
      ["Third-party media agencies may also use their own cookies when you interact with the site."],
    ],
  },
  {
    type: "p",
    runs: ["Those third parties are responsible for setting out their own privacy and cookies policies, where you can find out more about their privacy practices and use of cookies."],
  },
  { type: "h3", text: "Compliance with Applicable Law" },
  {
    type: "p",
    runs: ["This Cookies Policy is intended to comply with all applicable federal, state, and local laws, rules, and regulations having jurisdiction over same. Nothing in this Cookies Policy shall be construed to contravene applicable law, and wherever there is a conflict between any provision of this Cookies Policy and any statute, law, ordinance, order or regulation to the contrary to which the parties hereto have no legal right to contract, such statute, law, ordinance, order or regulation shall prevail. In such event, or if any provision of this Cookies Policy is held to be void, voidable, invalid or unenforceable, (i) the provision of this Cookies Policy so affected shall be limited only to the extent necessary to permit the compliance with minimum legal requirements and/or the order of any court or tribunal of competent jurisdiction, (ii) no other provision of this Cookies Policy shall be affected thereby, and (iii) all such other provisions of this Cookies Policy shall remain in full force and effect."],
  },
  { type: "h3", text: "Changes to this policy" },
  {
    type: "p",
    runs: ["We may modify this policy at any time. We shall notify you of any changes to the policy by posting the modified policy on the site. By then continuing to use the site, you agree to the setting of cookies in accordance with the modified cookies policy."],
  },
];

export default function PrivacyPolicyPage() {
  return <LegalArticle title="Privacy & Cookies Policy" blocks={blocks} />;
}
