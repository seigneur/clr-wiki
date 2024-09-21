import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { CLRContractName } from "../constants";
import { CLR } from "../typechain-types";

const deployContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();

  await hre.deployments.deploy(CLRContractName, {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  const CLR = (await hre.ethers.getContract(CLRContractName, deployer)) as CLR;
  console.log(`The CLR is deployed at ${await CLR.getAddress()}`);

  // Call the createResource method on the CLR contract
  const tx = await CLR.createResource("singapore", "bafybeihcovkiqiynmhxenz7qo5vhexqd6xs5jpe65nunlw2cgals4k2tey");
  console.log(`Transaction hash: ${tx.hash}`);

  // Wait for the transaction to be mined
  const receipt = await tx.wait();
  console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
};

export default deployContracts;

deployContracts.tags = ["CLR"];
