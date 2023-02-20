// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract ERC20Token is ERC20   {

   constructor(uint _totalSupply) ERC20("AchyutERC20" , "A_CR7"){
 _mint(msg.sender ,_totalSupply*(10**decimals()) );
}

}
