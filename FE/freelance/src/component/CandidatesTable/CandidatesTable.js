import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spin } from 'antd';

const CandidatesTable = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://66ea5a3855ad32cda478730d.mockapi.io/candidates');
        setCandidates(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      className: 'text-center w-25',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      className: 'text-center w-25',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      className: 'text-center w-25',
    },
    {
      title: 'Ngày ứng tuyển',
      dataIndex: 'createdAt',
      key: 'createdAt',
      className: 'text-center w-25',
    },
  ];

  return (
    <div className="table-container">
      {loading ? (
        <Spin />
      ) : (
        <Table
          className="text-center"
          columns={columns}
          dataSource={candidates}
          style={{
            backgroundColor: '#fff',
            ':hover': {
              backgroundColor: '#dddd',
            },
          }}
        />
      )}
    </div>
  );
};

export default CandidatesTable;
