const Token = artifacts.require("MyToken.sol");
const TokenSale = artifacts.require("myTokenSale.sol");
const kyc = artifacts.require("KycContract.sol");

const chai = require("./setupChai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("TokenSale", async function (accounts) {
  const [initialHolder, recipient, anotherAccount] = accounts;

  it("there shouldnt be any coins in my account", async () => {
    let instance = await Token.deployed();
    return expect(
      instance.balanceOf.call(initialHolder)
    ).to.eventually.be.a.bignumber.equal(new BN(0));
  });

  it("All coins should be in tokenSale contract", async () => {
    let instance = await Token.deployed();
    let balanceOfTokenSaleAccount = await instance.balanceOf.call(
      TokenSale.address
    );
    let totalSupply = await instance.totalSupply.call();

    return expect(balanceOfTokenSaleAccount).to.be.a.bignumber.equal(
      totalSupply
    );
  });

  it("should be possible to buy a token by simply making a payment in ether", async () => {
    let tokenInstance = await Token.deployed();
    let tokenSaleInstance = await TokenSale.deployed();
    let balanceBeforeTransaction = await tokenInstance.balanceOf.call(
      recipient
    );

    let kycInstance = await kyc.deployed();
    await kycInstance.setKycCompleted(recipient);
    
    await expect(
      tokenSaleInstance.sendTransaction({
        from: recipient,
        value: web3.utils.toWei("1", "Wei"),
      })
    ).to.be.fulfilled;
    return expect(balanceBeforeTransaction + 1).to.be.a.bignumber.equal(
      await tokenInstance.balanceOf.call(recipient)
    );
  });
});
