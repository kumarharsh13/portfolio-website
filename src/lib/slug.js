// Stable, URL-safe slug from a title.
export const slugify = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const findBySlug = (items, slug, key = 'title') =>
  items.find((it) => slugify(it[key]) === slug);
