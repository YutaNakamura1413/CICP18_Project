pragma solidity ^0.4.24;

contract KeyContract {

  event OpenClose(bool lock, address sender);

  address owner;      //Owner's address of this key
  address[] rights;   //Addresses that granted the right
  bool locked = true; //"true" is closed, "false" is open

  constructor() public{
    owner = msg.sender;
  }

  function getStatus() public returns(bool){
      return locked;
  }

  function open() public returns(bool){
    /* require(msg.sender == owner || checkRight(msg.sender)); */
    if(msg.sender == owner || checkRight(msg.sender)){
      locked = false;
    }else{
      revert("you cant open");
    }
    emit OpenClose(locked, msg.sender);
    return locked;
  }

  function close() public returns(bool){
    /* require(msg.sender == owner || checkRight(msg.sender)); */
    if(msg.sender == owner || checkRight(msg.sender)){
      locked = true;
    }else{
      revert("you cant close");
    }
    emit OpenClose(locked, msg.sender);
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
