function slugify(str) {
  return str
    .toLowerCase()                    // Convert to lowercase
    .replace(/[^a-z0-9 -]/g, '')      // Remove special characters (except space and hyphen)
    .replace(/\s+/g, '-')             // Replace spaces with hyphens
    .replace(/-+/g, '-')              // Collapse multiple hyphens into one
    .replace(/^-+|-+$/g, '');         // Trim hyphens from start and end
}

export default slugify;
