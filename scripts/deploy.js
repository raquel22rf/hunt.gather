const { ethers } = require("hardhat");

const main = async () => {
    const FoodSource = await ethers.getContractFactory("FoodSource");
    const foodSource = await FoodSource.deploy();
    const foodSourceContractAddress = await foodSource.address
    await foodSource.deployed();
    console.log("FoodSource Contract  deployed to:", foodSource.address);
    
    const FoodSourceFactory = await ethers.getContractFactory("FoodSourceFactory");
    const foodSourceFactory = await FoodSourceFactory.deploy(foodSourceContractAddress);

    await foodSourceFactory.deployed();

    console.log("FoodSourceFactory contract deployed to:", foodSourceFactory.address);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain()