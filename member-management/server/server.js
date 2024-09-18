const express = require('express');
const cors = require('cors'); // 引入 cors
const app = express();
const port = 5000;

app.use(cors()); // 使用 cors 中介軟件
app.use(express.json());

const membersRoute = require('./routes/members');
app.use('/api/members', membersRoute);

app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});
