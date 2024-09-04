import React from 'react';
import { Table, Tag, Space, Button, Rate, Switch } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';  // 引入垃圾桶圖示

const MemberList = ({ members, deleteMember, toggleCheckIn, openAddMemberModal, updateMemberLevel }) => {
  const columns = [
    {
      title: '簽到狀態',
      key: 'checkedIn',
      dataIndex: 'checkedIn',
      width: 120, // 調整簽到欄位的寬度
      className: 'center-text', // 使用CSS置中
      render: (checkedIn, record) => (
        <Switch
          checked={checkedIn}
          onChange={() => toggleCheckIn(record.id)}
          checkedChildren="已簽到"
          unCheckedChildren="未簽到"
        />
      ),
    },
    {
      title: '會員姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '註冊時間',
      dataIndex: 'registrationDate',
      key: 'registrationDate',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '會員等級',
      dataIndex: 'level',
      key: 'level',
      width: 180, // 調整寬度，使符合5顆星的長度
      render: (level, record) => (
        <Rate
          value={level}
          onChange={(value) => updateMemberLevel(record.id, value)}
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <DeleteOutlined onClick={() => deleteMember(record.id)} style={{ color: 'red', cursor: 'pointer' }} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={members.map(member => ({ ...member, key: member.id }))}
        pagination={{ pageSize: 7 }} // 每頁顯示7行
      />
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <Button type="primary" onClick={openAddMemberModal}>
          新增會員
        </Button>
      </div>
    </div>
  );
};

export default MemberList;
