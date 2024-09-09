import React, { useState, useEffect } from 'react';
import axios from 'axios'; // 引入 axios 來調用 API
import { Modal, Button } from 'antd';
import MemberList from './MemberList';
import MemberForm from './MemberForm';
import './App.css';

const App = () => {
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState([]);

  // 1. useEffect 來初始化會員列表
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('/api/members'); // 從後端 API 獲取會員數據
        setMembers(response.data); // 設置會員列表
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

  // 2. 新增會員，通過 POST 發送到後端
  const addMember = async (member) => {
    try {
      const response = await axios.post('/api/members', member); // 發送新增會員請求
      setMembers([...members, response.data]); // 更新會員列表
      setOpen(false); // 添加會員後自動關閉對話框
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  // 3. 更新會員等級（可選，根據需求擴展後端 API）
  const updateMemberLevel = async (id, level) => {
    try {
      await axios.put(`/api/members/${id}`, { level }); // 發送更新會員等級請求
      setMembers(
        members.map((member) =>
          member.id === id ? { ...member, level } : member
        )
      );
    } catch (error) {
      console.error('Error updating member level:', error);
    }
  };

  // 4. 刪除會員，通過 DELETE 發送到後端
  const deleteMember = async (id) => {
    try {
      await axios.delete(`/api/members/${id}`); // 發送刪除會員請求
      setMembers(members.filter((member) => member.id !== id)); // 更新會員列表
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  // 5. 簽到功能，更新會員簽到狀態
  const toggleCheckIn = async (id) => {
    const member = members.find((m) => m.id === id);
    try {
      await axios.put(`/api/members/${id}`, { checkedIn: !member.checkedIn }); // 發送更新簽到狀態請求
      setMembers(
        members.map((member) =>
          member.id === id ? { ...member, checkedIn: !member.checkedIn } : member
        )
      );
    } catch (error) {
      console.error('Error toggling check-in status:', error);
    }
  };

  // 6. 打開和關閉模態框
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
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
