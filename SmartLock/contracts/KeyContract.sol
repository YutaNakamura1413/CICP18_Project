pragma solidity ^0.4.24;

contract KeyContract {

  address owner;      //Owner's address of this key
  address[] rights;   //Addresses that granted the right
  bool locked = false; //"true" is open, "false" is close

  constructor() public{
    owner = msg.sender;
  }

  function open() public returns(bool){
    /* require(msg.sender == owner || checkRight(msg.sender)); */
    if(msg.sender == owner || checkRight(msg.sender)){
      locked = true;
    }else{
      revert("you cant open");
    }
    return locked;
  }

  function close() public returns(bool){
    /* require(msg.sender == owner || checkRight(msg.sender)); */
    if(msg.sender == owner || checkRight(msg.sender)){
      locked = false;
    }else{
      revert("you cant close");
    }
    return locked;
  }

  function grantRight(address _granted) public{
    require(msg.sender == owner);
    rights.push(_granted);
  }

  function checkRight(address _target) private view returns(bool){
    for(uint i = 0; i < rights.length; i++){
      if(rights[i] == _target){
        return true;
      }
    }
    return false;
  }
}
