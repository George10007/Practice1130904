import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import HonestClub1ABI from './abis/HonestClub1.json'; // 替換成正確的路徑
import MemberList from './MemberList';
import MemberForm from './MemberForm';

const contractAddress = "YOUR_CONTRACT_ADDRESS"; // 替換為你的合約地址

const App = () => {
  const [account, setAccount] = useState(null);
  const [honestClub1, setHonestClub1] = useState(null);
  const [members, setMembers] = useState([]);

  // 連接 MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, HonestClub1ABI, signer);
        setHonestClub1(contract);

        loadMembers(contract); // 加載會員列表
      } catch (error) {
        console.error("MetaMask 連接失敗:", error);
      }
    } else {
      alert("請安裝 MetaMask");
    }
  };

  // 載入會員列表
  const loadMembers = async (contract) => {
    const memberCount = await contract.how_many_members();
    const loadedMembers = [];
    for (let i = 0; i < memberCount; i++) {
      const member = await contract.members(i);
      loadedMembers.push({
        id: i,
        name: member.name,
        email: member.email,
        level: member.level,
        signIn: member.signIn,
      });
    }
    setMembers(loadedMembers);
  };

  // 新增會員
  const addMember = async (newMember) => {
    if (honestClub1) {
      try {
        const tx = await honestClub1.add_member(newMember.name, newMember.email);
        await tx.wait();
        loadMembers(honestClub1); // 更新會員列表
      } catch (error) {
        console.error("新增會員失敗:", error);
      }
    }
  };

  // 刪除會員
  const deleteMember = async (id) => {
    if (honestClub1) {
      try {
        const tx = await honestClub1.remove_member(id);
        await tx.wait();
        loadMembers(honestClub1); // 更新會員列表
      } catch (error) {
        console.error("刪除會員失敗:", error);
      }
    }
  };

  // 調整會員等級
  const updateMemberLevel = async (id, newLevel) => {
    if (honestClub1) {
      try {
        const tx = await honestClub1.adjustLevel(id, newLevel);
        await tx.wait();
        loadMembers(honestClub1); // 更新會員列表
      } catch (error) {
        console.error("調整會員等級失敗:", error);
      }
    }
  };

  // 切換簽到狀態
  const toggleCheckIn = async (id) => {
    if (honestClub1) {
      try {
        const tx = await honestClub1.toggleCheckIn(id);
        await tx.wait();
        loadMembers(honestClub1); // 更新會員列表
      } catch (error) {
        console.error("簽到失敗:", error);
      }
    }
  };

  return (
    <div>
      <h1>會員資料管理系統 DApp</h1>
      {account ? (
        <div>
          <p>已連接錢包: {account}</p>
          <MemberForm addMember={addMember} />
          <MemberList
            members={members}
            deleteMember={deleteMember}
            toggleCheckIn={toggleCheckIn}
            updateMemberLevel={updateMemberLevel}
          />
        </div>
      ) : (
        <button onClick={connectWallet}>連接 MetaMask</button>
      )}
    </div>
  );
};

export default App;
