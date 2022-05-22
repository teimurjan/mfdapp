require("@nomiclabs/hardhat-waffle");

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "/.env") });

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_NETWORK_URL,
      accounts: [process.env.ROPSTEN_NETWORK_ACCOUNT],
    },
  },
};
