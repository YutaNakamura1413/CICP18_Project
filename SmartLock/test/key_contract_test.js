var KeyContract = artifacts.require("KeyContract");

contract('KeyContractTest', function(accounts) {
  it("should assert true", function(done) {
    var key_contract_test = KeyContract.deployed();
    assert.isTrue(true);
    done();
  });

  it("KeyContract should check that if msg.sender is owner ", function(){
    var strage;
    return KeyContract.deployed().then(function(instance){
      strage = instance;
      return strage.open.call({from: accounts[0]});
    }).then(function(expected){
      return assert.equal(expected, true);
    });
  });
});
