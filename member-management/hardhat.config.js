require('@nomiclabs/hardhat-ethers');
require('dotenv').config(); // 加載 .env 文件

module.exports = {
  solidity: "0.8.26",
  networks: {
    sepolia: {
      url: "https://rpc.sepolia.org", // Sepolia 測試網的 RPC URL
      accounts: [`0x${process.env.PRIVATE_KEY}`] // 從環境變數中讀取私鑰
    }
  }
};

