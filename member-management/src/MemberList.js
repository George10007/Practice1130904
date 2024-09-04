import React from 'react';
import { Table, Tag, Space, Button } from 'antd';

const MemberList = ({ members, deleteMember, toggleCheckIn, openAddMemberModal }) => {
  const columns = [
    {
      title: '會員姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
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
      render: (level) => (
        <Tag color="gold">{`${level} 星`}</Tag>
      ),
    },
    {
      title: '簽到狀態',
      key: 'checkedIn',
      dataIndex: 'checkedIn',
      render: (checkedIn) => (
        <Tag color={checkedIn ? 'green' : 'volcano'}>
          {checkedIn ? '已簽到' : '未簽到'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => toggleCheckIn(record.id)}>
            {record.checkedIn ? '取消簽到' : '簽到'}
          </a>
          <a onClick={() => deleteMember(record.id)}>刪除</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={members.map(member => ({ ...member, key: member.id }))} />
      <div style={{ marginTop: 16 }}>
        <Button type="primary" onClick={openAddMemberModal}>
          新增會員
        </Button>
      </div>
    </div>
  );
};

export default MemberList;
