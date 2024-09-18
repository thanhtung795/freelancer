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
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Ngày ứng tuyển',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <Table columns={columns} dataSource={candidates} />
      )}
    </div>
  );
};

export default CandidatesTable;