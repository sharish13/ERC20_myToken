const networkconfig = {
    31337: {
        name: "localhost",
    },
    42: {
        name: "rinkeby",
    },
}

const INTIAL_SUPPLY = "1000000000000000000000"

const developmetChains = ["localhost", "hardhat"]

module.exports = { networkconfig, INTIAL_SUPPLY, developmetChains }
