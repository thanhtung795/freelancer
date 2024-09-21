import React from 'react';

import NavPills from './NavPills';


function HeadingComponent({ tag: Tag, id, className, title }) {
    return (
      <div>
        <Tag id={id} className={className}>
          {title}
        </Tag>
      </div>
    );
  }

function ListJobsWithNav() {
  return (
    <div className="list-jobs mt-4">
      {/* HeadingComponent hiển thị tiêu đề */}
      <HeadingComponent 
        tag="h2" 
        id="title-jobs" 
        className="title-jobs" 
        title="Công việc bạn có thể thích" 
      />

      {/* NavPills cho phần điều hướng */}
      <NavPills />
    </div>
  );
}

export default ListJobsWithNav;
