import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

pragma solidity 0.8.17;

contract ERC721Token is ERC721URIStorage   {
  using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Achyut", "A_CR7")  { }

    function Mint(string calldata tokenURI)  public  returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    function totalSupply()external view returns(uint){
      return _tokenIds.current();
    }

    
}