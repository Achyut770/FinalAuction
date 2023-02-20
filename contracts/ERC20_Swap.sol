// pragma solidity ^0.8.0;


pragma solidity ^0.8.0;
 import "./ERC721Token.sol";
 import "./ERC20Token.sol";



contract ERC20Swap {
    ERC20Token private immutable token;

    event SwapEvent(address indexed swapper , string from , string to  , uint amount);

    uint public reserve0;
    uint public reserve1;

    uint public totalSupply;
    mapping(address => uint) public balanceOf;

    constructor(ERC20Token _token) {
        token = _token;
    }

    function _mint(address _to, uint _amount) private {
        balanceOf[_to] += _amount;
        totalSupply += _amount;
    }

    function RemoveShares(address _from, uint _amount) private {
        balanceOf[_from] -= _amount;
        totalSupply -= _amount;
    }

    function UpdateBalance(uint _reserve0, uint _reserve1) private {
        reserve0 = _reserve0;
        reserve1 = _reserve1;
    }


function Swap(uint from , uint to , uint value) private pure  returns(uint y) {

   uint z = to*value/(value+from);
   uint a = z*3/1000;
    y=z-a; // 0.3 percent fee
    

}


function swapTokenFromhEth() external payable  {
 uint amountOut= Swap(reserve1,reserve0, msg.value);
     token.transfer( msg.sender , amountOut);
  UpdateBalance(token.balanceOf(address(this)), address(this).balance);
    emit SwapEvent(msg.sender, "eth", "token" , amountOut);
} 

function swapEthFromToken(uint amount) external payable  {
  
    token.transferFrom(msg.sender , address(this) , amount);
   uint amountOut= Swap(reserve0,reserve1, amount);
     payable(msg.sender).transfer(amountOut);
     UpdateBalance(token.balanceOf(address(this)), address(this).balance);
     emit SwapEvent(msg.sender, "token", "eth" , amountOut);
} 

    function addLiquidity(uint _amount) external payable returns (uint shares) {     
        if(msg.value==0 &&  _amount ==0) revert Errors() ;
        if (reserve0 > 0 || reserve1 > 0) {
            if(reserve0 * msg.value != reserve1 * _amount) revert Errors();
        }
        token.transferFrom(msg.sender, address(this), _amount);
        if (totalSupply == 0) {
            shares = squareRoot(_amount * msg.value);
        } else {
            shares = _min(
                (_amount * totalSupply) / reserve0,
                (msg.value * totalSupply) / reserve1
            );
        }
        if(shares <= 0) revert Errors();
        _mint(msg.sender, shares);

        UpdateBalance(token.balanceOf(address(this)), address(this).balance);
    }

    function removeLiquidity(
        uint _shares
    ) external returns (uint amount0 , uint amount1) {
        if(_shares > balanceOf[msg.sender]) revert Errors();
       amount1 = (_shares * reserve1)/ totalSupply;
        amount0 = (_shares * reserve0)/ totalSupply;
        if(amount0 < 0 || amount1 < 0) revert Errors();
        RemoveShares(msg.sender, _shares);
        UpdateBalance(token.balanceOf(address(this)) - amount0, address(this).balance - amount1);

        token.transfer(msg.sender, amount0);
        payable(msg.sender).transfer(amount1);
    }

   error Errors();

    function squareRoot(uint y) private pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }

    function _min(uint x, uint y) private pure returns (uint) { 
        return x <= y ? x : y;
    }
}
