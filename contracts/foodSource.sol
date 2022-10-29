// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FoodSource is ERC721, ERC721URIStorage, Ownable{
    
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    mapping(uint => string[]) public idToUris;
    mapping(uint => uint[]) public idToMonths;

    constructor() ERC721("FoodSource", "FS") {
        _tokenIdCounter.increment();
    }

    function mint(address _to, string[] memory _uris, uint[] memory _validMonths) 
        external 
        returns (uint256) 
    {
        uint256 tokenId = _tokenIdCounter.current();
        _mint(_to, tokenId);
        idToUris[tokenId][0] = _uris[0];
        idToUris[tokenId][1] = _uris[1];
        idToMonths[tokenId] = _validMonths;
        _tokenIdCounter.increment();
        return tokenId;
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory result)
    {
        uint currentMonth = getCurrentMonth();
        uint[] memory validMonths = idToMonths[tokenId];

        uint arr_length = validMonths.length;

        for (uint idx = 0; idx < arr_length; ){
            if(validMonths[idx] == currentMonth){
                result = idToUris[tokenId][0];
            }
            unchecked { ++idx;}
        }
        if(bytes(result).length == 0){
            result = idToUris[tokenId][1];
        }
    }

    function getCurrentMonth() 
        internal 
        view 
        returns (uint256 month) 
    {
        int256 __days = int256(block.timestamp / (24 * 60 * 60));
        int256 L = __days + 68569 + 2440588;
        int256 N = (4 * L) / 146097;
        L = L - (146097 * N + 3) / 4;
        int256 _year = (4000 * (L + 1)) / 1461001;
        L = L - (1461 * _year) / 4 + 31;
        int256 _month = (80 * L) / 2447;
        L = _month / 11;
        _month = _month + 2 - 12 * L;
        month = uint256(_month);
    }
}