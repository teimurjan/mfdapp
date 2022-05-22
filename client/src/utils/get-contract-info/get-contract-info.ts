import getAbi from "../get-abi";

const getContractInfo = async () => ({
  address: import.meta.env.VITE_CONTRACT_ADDRESS,
  abi: await getAbi(),
});

export default getContractInfo;
