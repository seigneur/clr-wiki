import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { CLRContractName } from "../constants";

const deployContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();

  await hre.deployments.deploy(CLRContractName, {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  const CLR = await hre.ethers.getContract(CLRContractName, deployer);
  console.log(`The CLR is deployed at ${await CLR.getAddress()}`);
};

export default deployContracts;

deployContracts.tags = ["CLR"];
