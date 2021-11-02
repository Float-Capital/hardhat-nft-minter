// SPDX-License-Identifier: BUSL-1.1

pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";

contract WildEarthNFT is ERC1155Pausable {
    
    constructor (string memory name, string memory symbol, string memory baseTokenURI
    ) ERC721PresetMinterPauserAutoId(name, symbol, baseTokenURI) {}

    /*
      Function for handling secondary market fees.

      Reqs: 
        - 40% of the initial sale price will be paid to the custodian (handled off chain)
        - This function will handle the provision of 10% of the sale price every time the NFT is resold,
          hereafter referred to as 'provision'.
        - 80% of provision goes to the custodian and remaining 20% of provision goes to WildEarth. 
    */

    function transfer(
      address from, 
      address to, 
      uint256 tokenId, 
      uint256 price
    ) public {
      _transfer(from, to, tokenId); // includes 'ownerOf(tokenId) == from' check
      
      // secondary sale logic here  

    }
}



