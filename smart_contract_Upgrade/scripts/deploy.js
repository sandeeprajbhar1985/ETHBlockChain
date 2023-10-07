const main = async () => {
    const MyBox = await ethers.getContractFactory('MySolidityBox');
    console.log('Deploying MySolidityBox...');
    const mybox = await MyBox.deploy();
  
    await mybox.deployed();
  
    console.log("MySolidityBox address: ", mybox.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    }
    catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
  
  runMain();