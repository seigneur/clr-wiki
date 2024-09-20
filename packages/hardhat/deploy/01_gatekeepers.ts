import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
<<<<<<< HEAD
import { ContractStorage, EContracts } from "maci-contracts";
import { GatekeeperContractName } from "../constants";
import { FreeForAllGatekeeper } from "../typechain-types/";

const storage = ContractStorage.getInstance();
=======
import { GatekeeperContractName } from "../constants";
>>>>>>> e44986c (Initial commit)

const deployContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();

  await hre.deployments.deploy(GatekeeperContractName, {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

<<<<<<< HEAD
  const gatekeeper = await hre.ethers.getContract<FreeForAllGatekeeper>(GatekeeperContractName, deployer);
  console.log(`The gatekeeper is deployed at ${await gatekeeper.getAddress()}`);

  await storage.register({
    id: EContracts.FreeForAllGatekeeper,
    contract: gatekeeper,
    network: hre.network.name,
    args: [],
  });
=======
  const gatekeeper = await hre.ethers.getContract(GatekeeperContractName, deployer);
  console.log(`The gatekeeper is deployed at ${await gatekeeper.getAddress()}`);
>>>>>>> e44986c (Initial commit)
};

export default deployContracts;

deployContracts.tags = ["Gatekeeper"];
