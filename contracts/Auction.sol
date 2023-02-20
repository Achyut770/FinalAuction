pragma solidity 0.8.17;

import "./ERC721Token.sol";
import "./ERC20Token.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Auction is Ownable {
    ERC721Token private immutable erc721token;

    constructor(ERC721Token addr) {
        erc721token = addr;
    }

    event soldAuctionEth(
        address indexed auctioner,
        uint256 indexed minimum_Price,
        uint256 indexed Token_id,
        uint256 ending_Date
    );
    event soldAuctionToken(
        address indexed auctioner,
        uint256 indexed minimum_Price,
        uint256 indexed Token_id,
        uint256 ending_Date,
        address tokenAddress
    );
    event boughtAuction(
        address indexed auctioner,
        address indexed buyer,
        uint256 indexed Token_id,
        uint256 amount
    );

    error WhilePurchasing(
        uint256 amount,
        uint256 min_price,
        uint256 starting_Price
    );
    error NotStarted();
    error AlreadyEnded();
    error Ended();
    error NotAuthorised();
    error TimeHasNotFinished();
    error Denied();

    struct AuctionDetails {
        address tokenAddress;
        string name;
        uint256 startingPrice;
        uint256 max_Price;
        uint256 EndingDate;
        address max_Pricer;
        address payable auctionMaker;
        bool eth;
        bool started;
        bool ended;
    }
    mapping(uint256 => mapping(address => uint256)) private investors;

    mapping(uint256 => AuctionDetails) private AuctionContainer;

    function getAuctionDetails(uint256 Token_id)
        external
        view
        returns (AuctionDetails memory)
    {
        return AuctionContainer[Token_id];
    }

    function getInvestorDetails(uint256 id, address _add)
        external
        view
        returns (uint256 investorValue)
    {
        return investors[id][_add];
    }

    function sellToAuctionWithEth(
        string calldata _uri,
        string calldata _name,
        uint256 _amount,
        uint256 _endingDate
    ) external {
        uint256 id = setAuctionWhileSelling(
            _uri,
            address(0),
            _name,
            _amount,
            true,
            _endingDate
        );
        emit soldAuctionEth(
            msg.sender,
            _amount,
            id,
            block.timestamp + _endingDate
        );
    }

    function setAuctionWhileSelling(
        string calldata _uri,
        address _tokenAddress,
        string calldata _name,
        uint256 _amount,
        bool _eth,
        uint256 _endingDate
    ) private returns (uint256 id) {
        id = erc721token.Mint(_uri);
        AuctionContainer[id].startingPrice = _amount;
        AuctionContainer[id].auctionMaker = payable(msg.sender);
        AuctionContainer[id].eth = _eth;
        AuctionContainer[id].tokenAddress = _tokenAddress;
        AuctionContainer[id].started = true;
        AuctionContainer[id].name = _name;
        AuctionContainer[id].EndingDate = block.timestamp + _endingDate;
    }

    function sellToAuctionWithToken(
        string calldata _uri,
        address _tokenAddress,
        string calldata _name,
        uint256 _amount,
        uint256 _endingDate
    ) external {
        uint256 id = setAuctionWhileSelling(
            _uri,
            _tokenAddress,
            _name,
            _amount,
            false,
            _endingDate
        );
        emit soldAuctionToken(
            msg.sender,
            _amount,
            id,
            block.timestamp + _endingDate,
            _tokenAddress
        );
    }

    function setTheAuctionDetails(
        uint256 amount,
        uint256 Token_id,
        bool eth
    ) private {
        AuctionDetails storage indv = AuctionContainer[Token_id];
        if (investors[Token_id][msg.sender] == 0) {
            if (amount < indv.startingPrice) {
                revert WhilePurchasing(
                    amount,
                    indv.max_Price,
                    indv.startingPrice
                );
            }
        }
        if (investors[Token_id][msg.sender] + amount <= indv.max_Price) {
            revert WhilePurchasing(amount, indv.max_Price, indv.startingPrice);
        }
        if (!eth) {
            ERC20Token(indv.tokenAddress).transferFrom(
                msg.sender,
                address(this),
                amount
            );
        }
        indv.max_Price = investors[Token_id][msg.sender] + amount;
        investors[Token_id][msg.sender] += amount;
    }

    function getTheItem(uint256 token_id, uint256 amount) external payable {
        AuctionDetails storage indv = AuctionContainer[token_id];
        //reverts
        if (indv.ended) revert Ended();
        if (!indv.started) revert NotStarted();
        if (block.timestamp > indv.EndingDate) revert AlreadyEnded();
        if (indv.eth) {
            setTheAuctionDetails(msg.value, token_id, indv.eth);
        } else {
            setTheAuctionDetails(amount, token_id, indv.eth);
        }
        indv.max_Pricer = payable(msg.sender);
    }

    function SubmitItem(uint256 token_id) external {
        AuctionDetails storage indv = AuctionContainer[token_id];
        if (indv.EndingDate > block.timestamp) revert TimeHasNotFinished();
        if (indv.ended) revert Ended();
        if (indv.max_Pricer != msg.sender && indv.auctionMaker != msg.sender)
            revert NotAuthorised();

        if (indv.max_Price == 0) {
            erc721token.transferFrom(
                address(this),
                indv.auctionMaker,
                token_id
            );
        } else {
            erc721token.transferFrom(address(this), indv.max_Pricer, token_id);

            indv.ended = true;
            if (indv.eth) {
                indv.auctionMaker.transfer(indv.max_Price);
            } else {
                ERC20Token(indv.tokenAddress).transfer(
                    indv.auctionMaker,
                    indv.max_Price
                );
            }
            emit boughtAuction(
                indv.auctionMaker,
                indv.max_Pricer,
                token_id,
                indv.max_Price
            );
        }
    }

    function takeAmountFromAuction(uint256 Token_id) external {
        if (AuctionContainer[Token_id].EndingDate > block.timestamp)
            revert TimeHasNotFinished();
        if (AuctionContainer[Token_id].max_Pricer == msg.sender)
            revert Denied();
        uint256 amount = investors[Token_id][msg.sender];
        investors[Token_id][msg.sender] = 0;
        if (AuctionContainer[Token_id].eth) {
            payable(msg.sender).transfer(amount);
        } else {
            ERC20Token(AuctionContainer[Token_id].tokenAddress).transfer(
                msg.sender,
                amount
            );
        }
    }

    function sendEth(uint256 amount) external onlyOwner {
        payable(msg.sender).transfer(amount);
    }
}
