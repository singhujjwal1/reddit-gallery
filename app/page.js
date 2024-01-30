// page.js
"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Gallery from './components/Gallery';

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [after, setAfter] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`https://www.reddit.com/r/memes.json?after=${after || ''}`);
      const newPosts = response.data.data.children.map((post) => post.data);
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setAfter(response.data.data.after);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      fetchPosts();
    }
  };

  useEffect(() => {
    fetchPosts();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [after]);

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Reddit Gallery</h1>
      <Gallery posts={posts} />
    </div>
  );
};

export default Page;
