// Site-wide settings. Edit these two lines when the site goes public.
//
// siteUrl:   the live address, with https:// and no trailing slash, e.g. 'https://plainspoken.my'.
//            Canonical links, share previews, structured data and sitemap.xml need it.
//            While it is empty, pages build normally and the sitemap stays empty.
// indexable: false keeps every page out of Google (noindex, nofollow) and shows the
//            "Private build" footer. Set it to true only when the site is ready to be found.

export const SITE = {
  name: 'Plainspoken',
  siteUrl: '',
  indexable: false,
  locale: 'en_MY',
  defaultDescription:
    "Malaysia's economy and your money, explained plainly: a daily brief on what moved and why it matters, plus explainers that answer the basics.",
};

// Explainer hub topics, in display order. An explainer's `topic` should be one of these;
// anything else is listed under "More".
export const EXPLAINER_TOPICS = [
  'Interest rates and loans',
  'Fuel and subsidies',
  'The ringgit and trade',
  'Prices and inflation',
  'Jobs and pay',
  'Savings and EPF',
  'The Budget and government',
];

export const absoluteUrl = (path: string): string | undefined =>
  SITE.siteUrl ? new URL(path, SITE.siteUrl).toString() : undefined;
