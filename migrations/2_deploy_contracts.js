// eslint-disable-next-line no-undef
const Token = artifacts.require("LgmToken");
// eslint-disable-next-line no-undef
const EthSwap = artifacts.require("EthSwap");

module.exports = async function (deployer) {
  await deployer.deploy(Token);
  await deployer.deploy(EthSwap);

  const token = await Token.deployed();
  const ethSwap = await EthSwap.deployed();

  await token.transfer(ethSwap.address, "1000000000000000000000000");
};
