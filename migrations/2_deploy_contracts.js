var MyTokens = artifacts.require("MyToken.sol")
var myTokenSale = artifacts.require("myTokenSale")
var kyc = artifacts.require("KycContract")
require('dotenv').config({path: '../.env'});

module.exports = async function(deployer){
  let addr =await web3.eth.getAccounts();
  // let initialSupply = 1000000;
  await deployer.deploy(MyTokens, process.env.INITIAL_TOKENS);
  await deployer.deploy(kyc);
  await deployer.deploy(myTokenSale, 1, addr[0], MyTokens.address, kyc.address);
  let instance = await MyTokens.deployed();
  await instance.transfer(myTokenSale.address, process.env.INITIAL_TOKENS);
  
}