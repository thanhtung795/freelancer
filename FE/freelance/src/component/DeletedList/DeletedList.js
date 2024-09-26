import React, { useState } from 'react';
import { Pagination } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import JobCard from './JobCard/JobCard';

const DeletedList = () => {
  const jobs = [
    {
      title: 'Công việc 1',
      date: '2024-09-24',
      status: 'Đang tuyển',
      description: 'Mô tả ngắn về công việc 1.',
      detailLink: '/job/1'
    },
    {
      title: 'Công việc 2',
      date: '2024-09-23',
      status: 'Đã hoàn thành',
      description: 'Mô tả ngắn về công việc 2.',
      detailLink: '/job/2'
    },
    {
      title: 'Công việc 3',
      date: '2024-09-22',
      status: 'Đang tuyển',
      description: 'Mô tả ngắn về công việc 3.',
      detailLink: '/job/3'
    },
   
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2; 

  const indexOfLastJob = currentPage * pageSize;
  const indexOfFirstJob = indexOfLastJob - pageSize;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }} className='my-container my-4'>
      <h1 className='my-4'>
        <FontAwesomeIcon icon={faClipboardList} /> Danh sách job đã xóa
      </h1>
      {currentJobs.map((job, index) => (
        <JobCard
          key={index}
          title={job.title}
          date={job.date}
          status={job.status}
          description={job.description}
          detailLink={job.detailLink}
        />
      ))}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={jobs.length}
        onChange={onChangePage}
        style={{ marginTop: '16px', alignSelf: 'center' }}
      />
    </div>
  );
};

export default DeletedList;
