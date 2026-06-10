export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: "Big Machine Records",
    description:
      "Big Machine Records is an independent Nashville label home to Riley Green, Rascal Flatts, Aaron Lewis, The Band Perry, and more.",
    url: "https://bigmachinerecords.com",
    logo: "https://bigmachinerecords.com/logos/big-machine-records-nav-logo-new.png",
    foundingDate: "2005",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nashville",
      addressRegion: "TN",
      addressCountry: "US",
    },
    sameAs: [
      "https://www.instagram.com/bigmachinerecords/",
      "https://www.facebook.com/BigMachineRecords/",
      "https://www.youtube.com/@BigMachineRecords",
      "https://www.tiktok.com/@bigmachinerecords",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://bigmachinerecords.com${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
