type siteMeta = {
  url?: string;
  type?: string;
  title?: string;
  mainImage?: string;
  description?: string;
};

const defaultMeta: siteMeta = {
  type: "website",
  url: "https://www.olaysco.netlify.app/",
  title: "Olayiwola Odunsi - Software Engineer",
  mainImage: "/olayiwola.jpg",
  description:
    "Olayiwola Odunsi is a software engineer with love for web❤️ and distributed systems.",
};

export default (meta: siteMeta): Array<{}> => {
  return [
    {
      hid: "description",
      name: "description",
      content: (meta && meta.description) || defaultMeta.description,
    },
    {
      hid: "og:type",
      property: "og:type",
      content: (meta && meta.type) || defaultMeta.type,
    },
    {
      hid: "og:url",
      property: "og:url",
      content: (meta && meta.url) || defaultMeta.url,
    },
    {
      hid: "og:title",
      property: "og:title",
      content: (meta && meta.title) || defaultMeta.title,
    },
    {
      hid: "og:description",
      property: "og:description",
      content: (meta && meta.description) || defaultMeta.description,
    },
    {
      hid: "og:image",
      property: "og:image",
      content: (meta && meta.mainImage) || defaultMeta.mainImage,
    },
    {
      hid: "twitter:card",
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      hid: "twitter:domain",
      property: "twitter:domain",
      content: "olaysco.netlify.app",
    },
    {
      hid: "twitter:url",
      name: "twitter:url",
      content: (meta && meta.url) || defaultMeta.url,
    },
    {
      hid: "twitter:title",
      name: "twitter:title",
      content: (meta && meta.title) || defaultMeta.title,
    },
    {
      hid: "twitter:description",
      name: "twitter:description",
      content: (meta && meta.description) || defaultMeta.description,
    },
    {
      hid: "twitter:image",
      name: "twitter:image",
      content: (meta && meta.mainImage) || defaultMeta.mainImage,
    },
  ];
};
