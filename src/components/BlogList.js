/* eslint-disable no-undef */
// src/components/BlogList.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import client from '../contentfulClient';
import './Blog.css'; // Import the CSS file

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    client.getEntries({ content_type: 'blogPost' }) // Replace 'blogPost' with your content type ID
      .then((response) => {
        console.log(response.items)
        setBlogs(response.items);
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
      });
  }, []);

  return (
    <div className="blog-container">
      <Helmet>
        <title>Blog - EasyZip</title>
        <meta name="description" content="Read our latest blog posts" />
      </Helmet>
      <h1 className="blog-title">Blog</h1>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog.sys.id} className="blog-item">
            <h2 className="blog-title">{blog.fields.title}</h2>
            {/* <p className="blog-description">{documentToPlainTextString(blog.fields.description)}</p> */}
            <Link to={`/blog/${blog.fields.slug}`} className="blog-link">Read More</Link>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BlogList;
