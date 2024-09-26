import React from 'react';
import { Card, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCalendarAlt, faInfoCircle, faFlag, faUndo, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const JobCard = ({ title, date, status, description, detailLink, onRestore, onDelete }) => {
  const buttonStyle = {
    width: '100%', 
    marginBottom: '8px'
  };

  return (
    <Card
      title={title}
      style={{ width: '100%', margin: '16px 0'}} 
      hoverable
      bodyStyle={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <div>
        <p><FontAwesomeIcon icon={faCalendarAlt} /> {date}</p>
        <p><FontAwesomeIcon icon={faFlag} /> {status}</p>
        <p><FontAwesomeIcon icon={faInfoCircle} /> {description}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
        <Button 
          type="primary" 
          href={detailLink} 
          icon={<FontAwesomeIcon icon={faEye} />}
          style={buttonStyle} 
        >
          Xem chi tiết
        </Button>
        <Button 
          type="default" 
          icon={<FontAwesomeIcon icon={faUndo} />} 
          onClick={onRestore}
          style={{ ...buttonStyle, backgroundColor: '#28a745', borderColor: '#28a745', color: '#fff' }} 
        >
          Khôi phục
        </Button>
        <Button 
          type="default" 
          icon={<FontAwesomeIcon icon={faTrashAlt} />} 
          onClick={onDelete}
          style={{ ...buttonStyle, backgroundColor: '#dc3545', borderColor: '#dc3545', color: '#fff' }} 
        >
          Xóa vĩnh viễn
        </Button>
      </div>
    </Card>
  );
};

export default JobCard;
