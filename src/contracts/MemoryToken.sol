// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MemoryToken is ERC721 {
    constructor() public ERC721("Memory Token", "MEMORY") {}
}
