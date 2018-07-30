pragma solidity ^0.4.24;

contract KeyContract {

  address owner;      //Owner's address of this key
  address[] rights;   //Addresses that granted the right
  bool locked = true; //"true" is open, "false" is close

  constructor() public{
    owner = msg.sender;
  }

  function open() public returns(bool){
    require(msg.sender == owner || checkRight(msg.sender));
    locked == true;
    return locked;
  }

  function close() public returns(bool){
    require(msg.sender == owner || checkRight(msg.sender));
    locked == false;
    return locked;
  }

  function grantRight(address _granted) public{
    require(msg.sender == owner);
    rights.push(_granted);
  }

  function checkRight(address _target) private returns(bool){
    for(uint i = 0; i < rights.length; i++){
      if(rights[i] == _target){
        return true;
      }
    }
    return false;
  }
}
