const { getNamedAccounts, network, deployments } = require("hardhat")
const {
    developmetChains,
    INTIAL_SUPPLY,
} = require("../helper-hardhat-config.js")
const { verify } = require("../utils/verify.js")

module.exports = async () => {
    console.log("deploying.......")
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
    const ourToken = await deploy("OurToken", {
        from: deployer,
        args: [INTIAL_SUPPLY],
        log: true,
        waitConfirmations: 1,
    })
    console.log(`ourtoken deployed to ${ourToken.address}  address`)

    if (
        !developmetChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(ourToken.address, INTIAL_SUPPLY)
    }
}

module.exports.tags = ["all", "token"]
