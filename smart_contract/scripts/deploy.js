const main = async () => {
  const Transactor = await hre.ethers.getContractFactory("Transactor");
  const transactor = await Transactor.deploy();

  await transactor.deployed();

  console.log("Transactor deployed to:", transactor.address);
};

const run = async () => {
  try {
    await main();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

run();
