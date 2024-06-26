// src/components/BlogDetail.js
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import client from '../contentfulClient';
import './Blog.css'; // Import the CSS file

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug
    })
      .then((response) => {
        if (response.items.length > 0) {
          setBlog(response.items[0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching blog:', error);
      });
  }, [slug]);

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <div className="blog-container">
      <Helmet>
        <title>{blog.fields.title} - EasyZip</title>
        <meta name="description" content={blog.fields.description} />
      </Helmet>
      <h1 className="blog-detail-title">{blog.fields.title}</h1>
      <p className="blog-detail-date">{new Date(blog.fields.publishDate).toDateString()}</p>
      <img src={blog.fields.heroImage.fields.file.url} alt={blog.fields.title} className="blog-image" />
      <div className="blog-body">{documentToReactComponents(blog.fields.body)}</div>
    </div>
  );
};

export default BlogDetail;
