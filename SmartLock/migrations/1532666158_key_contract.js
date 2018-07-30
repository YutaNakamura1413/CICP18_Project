var KeyContract = artifacts.require("KeyContract");

module.exports = function(deployer) {
  deployer.deploy(KeyContract);
};
