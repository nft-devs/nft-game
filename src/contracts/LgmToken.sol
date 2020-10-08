// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LgmToken is ERC20 {
    uint256 total = 1000000000000000000000000; // 1 million tokens

    constructor() public ERC20("Lgm Token", "LGM") {
        _mint(msg.sender, total);
    }
}
