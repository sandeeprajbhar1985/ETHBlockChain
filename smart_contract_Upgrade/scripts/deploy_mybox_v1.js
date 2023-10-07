const { ethers, upgrades } = require("hardhat");

async function main () {
  const MyBox = await ethers.getContractFactory('MySolidityBox');
  console.log('Deploying MySolidityBox...');
  const mybox = await upgrades.deployProxy(MyBox, [42], { initializer: 'initializesandeep' });
  await mybox.deployed();
  console.log('MyBox deployed address:', mybox.address);
}

main();