var KeyContract = artifacts.require("KeyContract");

contract('KeyContractTest', function(accounts) {
  it("No.1: should assert true", function(done) {
    var key_contract_test = KeyContract.deployed();
    assert.isTrue(true);
    done();
  });

  it("No.2: KeyContract should check that if msg.sender is owner ", function(){
    var strage;
    return KeyContract.deployed().then(function(instance){
      strage = instance;
      return strage.open.call({from: accounts[0]});
    }).then(function(expected){
      assert.equal(expected, true);
    }).then(function(){
      return strage.close.call({from: accounts[0]});
    }).then(function(expected){
      assert.equal(expected, false);
    });
  });

  it("No3: user who don't have right should be deny", function(){
    var strage;
    return KeyContract.deployed().then(function(instance){
      strage = instance;
    }).then(function(){
      return strage.open.call({from: accounts[2]});
    });
  });

  it("No.4: user who is granted right can open and close", function(){
    var strage;
    return KeyContract.deployed().then(function(instance){
      strage = instance;
      return strage.grantRight(accounts[2], {from: accounts[0]});
    }).then(function(){
      return strage.open.call({from: accounts[2]});
    }).then(function(expected){
      assert.equal(expected, true);
    }).then(function(){
      return strage.close.call({from: accounts[2]});
    }).then(function(expected){
      assert.equal(expected, false);
    });
  });
});
