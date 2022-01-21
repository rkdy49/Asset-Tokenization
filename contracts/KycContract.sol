pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract KycContract is Ownable {
    mapping(address => bool) allowed;

    function setKycCompleted(address _adr) public onlyOwner{
        allowed[_adr] = true;
    } 

    function setKycRevoked(address _adr) public onlyOwner{
        allowed[_adr] = false;
    }

    function kycCompleted(address _adr) public view returns(bool) {
        return allowed[_adr];
    }
}