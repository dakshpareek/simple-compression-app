// scripts/generate-sitemap.js
const fs = require('fs');
const path = require('path');
const { createClient } = require('contentful');

const client = createClient({
  space: '8158bkxr2he7', // Replace with your Contentful space ID
  accessToken: 'nup7ERL6bzUzZ6na4hFIKXZ9xKgwGWviu6B7uSjPK6k' // Replace with your Contentful access token
});

client.getEntries({ content_type: 'blogPost' })
  .then((response) => {
    const blogUrls = response.items.map((item) => {
      return `
        <url>
          <loc>http://www.easyzip.org/#/blog/${item.fields.slug}</loc>
          <lastmod>${item.sys.updatedAt}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>
      `;
    }).join('');

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>http://www.easyzip.org/</loc>
        <lastmod>2023-08-25</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>http://www.easyzip.org/#/faq</loc>
        <lastmod>2024-06-25</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
      ${blogUrls}
    </urlset>`;

    fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemapContent, 'utf8');
    console.log('Sitemap generated successfully!');
  })
  .catch((error) => {
    console.error('Error generating sitemap:', error);
  });
