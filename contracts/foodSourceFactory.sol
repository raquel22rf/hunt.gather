// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./foodSource.sol";

contract FoodSourceFactory {

    FoodSource private foodSourceContract;
    uint256 public lastFSCounter;

    constructor(address _foodSourceContract) {
        foodSourceContract = FoodSource(_foodSourceContract);
    }

    function createFoodSource(string[] memory _uris, uint[] memory _validMonths)
        external
        returns(uint256 foodId)
    {
        foodId = foodSourceContract.mint(address(this), _uris, _validMonths);
        lastFSCounter = foodId;
    }

    function getLastFSCounter()
        view
        external
        returns(uint256)
    {
        return lastFSCounter;
    }
}