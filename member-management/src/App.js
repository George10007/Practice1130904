import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import MemberList from './MemberList';
import MemberForm from './MemberForm';
import './App.css'; // 引入 CSS 文件

const App = () => {
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState([]);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const addMember = (member) => {
    setMembers([...members, { ...member, id: Date.now(), registrationDate: new Date().toLocaleString(), checkedIn: false }]);
    setOpen(false); // 添加會員後自動關閉對話框
  };

  const updateMemberLevel = (id, level) => {
    setMembers(
      members.map((member) =>
        member.id === id ? { ...member, level } : member
      )
    );
  };

  const deleteMember = (id) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const toggleCheckIn = (id) => {
    setMembers(
      members.map((member) =>
        member.id === id ? { ...member, checkedIn: !member.checkedIn } : member
      )
    );
  };

  return (
    <div className="app-container">
      <h1>會員資料管理系統</h1>
      <MemberList
        members={members}
        deleteMember={deleteMember}
        toggleCheckIn={toggleCheckIn}
        openAddMemberModal={showModal}
        updateMemberLevel={updateMemberLevel}
      />
      <Modal
        title="新增會員"
        open={open}
        onCancel={handleCancel}
        footer={null}
      >
        <MemberForm addMember={addMember} />
      </Modal>
    </div>
  );
};

export default App;
