// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./foodSource.sol";

contract FoodSourceFactory {

    FoodSource private foodSourceContract;

    constructor(address _foodSourceContract) {
        foodSourceContract = FoodSource(_foodSourceContract);
    }

    function createFoodSource(string[] memory _uris, uint[] memory _validMonths)
        external
    {
        uint256 foodId = foodSourceContract.mint(address(this), _uris, _validMonths);
    }
}