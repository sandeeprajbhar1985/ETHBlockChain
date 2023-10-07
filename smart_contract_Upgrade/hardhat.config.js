require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');
require('@nomiclabs/hardhat-etherscan');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: "0.8.10",
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/npBjxKc2JBga23l7Kx9YkHCDibvLwzsW',
      accounts: ['fe778247a9df5c6d88526425e367d9a486bc836be523389f0996782d404e7901']
    }
  },
  etherscan:{
    apiKey : 'HUVN78S5XG7PCDNVVJFZ8H2JWAM88AY4Y2'
  },
};

// require('@nomiclabs/hardhat-waffle');

// /**
//  * @type import('hardhat/config').HardhatUserConfig
//  */
//  module.exports = {
//   solidity: "0.8.10",
//   networks: {
//     ropsten: {
//       url: 'https://eth-ropsten.alchemyapi.io/v2/npBjxKc2JBga23l7Kx9YkHCDibvLwzsW',
//       accounts: ['fe778247a9df5c6d88526425e367d9a486bc836be523389f0996782d404e7901']
//     }
//   }
// };



