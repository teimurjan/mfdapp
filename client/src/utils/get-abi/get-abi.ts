const getAbi = async () => {
  const {
    default: { abi },
  } = await import(
    "../../../../smart_contract/artifacts/contracts/Transactor.sol/Transactor.json"
  );

  return abi;
};

export default getAbi;
