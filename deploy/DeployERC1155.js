const { network } = require("hardhat");
const { ERC1155_PRESET_MINTER_PAUSER } = require("../helper-hardhat-config");

let networkToUse = network.name;

if (!!process.env.HARDHAT_FORK) {
  networkToUse = process.env.HARDHAT_FORK;
}

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer, admin } = await getNamedAccounts();
  const accounts = await ethers.getSigners();

  let paymentTokenAddress;

  if (networkToUse != "mumbai" && networkToUse != "polygon") {
    console.log(networkToUse);
  } else if (networkToUse === "polygon") {
    console.log(networkToUse);
  } else if (networkToUse === "mumbai") {
    console.log(networkToUse);
  } else {
    throw new Error(`network ${networkToUse} un-accounted for`);
  }

  console.log("Deploying contracts with the account:", deployer);
  console.log("Admin Account:", admin);

  let erc1155 = await deploy(ERC1155_PRESET_MINTER_PAUSER, {
    from: deployer,
    args: [],
    log: true,
  });
  // args: [admin],

  console.log("erc1155", erc1155.address);
};
module.exports.tags = ["erc1155"];
