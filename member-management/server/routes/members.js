const express = require('express');
const router = express.Router();

// 假設有一些會員資料
let members = [
  { id: 1, name: 'John Brown', email: 'john@example.com', level: 3, checkedIn: false },
  { id: 2, name: 'Jim Green', email: 'jim@example.com', level: 4, checkedIn: true },
];

// 獲取會員列表
router.get('/', (req, res) => {
  res.json(members);
});

// 新增會員
router.post('/', (req, res) => {
  const newMember = { ...req.body, id: Date.now() };
  members.push(newMember);
  res.json(newMember);
});

// 更新會員資料 (簽到狀態或等級)
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedMember = req.body;
  members = members.map((member) =>
    member.id == id ? { ...member, ...updatedMember } : member
  );
  res.json({ message: '會員更新成功' });
});

// 刪除會員
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  members = members.filter((member) => member.id != id);
  res.json({ message: '會員刪除成功' });
});

module.exports = router;
