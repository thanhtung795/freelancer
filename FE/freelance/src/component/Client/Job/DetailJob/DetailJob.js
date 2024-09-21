import React from 'react';
import { FaCheck, FaPencilAlt } from 'react-icons/fa';
import './DetailJob.css';
import Title from './Title';
import Category from './Category';
import Skill from './Skill';
import Scope from './Scope';
import Budget from './Budget';
import Description from './Description';
import Post from './Post';
const DetailJob = () => {

  return (
    <div className="job-details">

      <div className="header">
        <h2>Job details</h2>
        <button className="post-btn">Post this job</button>
      </div>

      <div className="job-details-content">
        <Title />
        <hr className="separator" />
        <Description />
        <hr className="separator" />
        <div className="additional-details">
          <Category />
          <Skill />
          <Scope />
          <Budget />
        </div>
        <hr className="separator" />
        <Post />
      </div>

      
    </div>
  );

};

export default DetailJob;
