import React from 'react';
import { FaCheck } from 'react-icons/fa';

const Post = () => {
  return (
    <div className="post-section">
      <div className="post-content">
        <div className="post-item">
          <span>Save as a draft</span>
        </div>
        <button className="post-this-job-btn">Post this job</button>
      </div>
    </div>
  );
};

export default Post;
