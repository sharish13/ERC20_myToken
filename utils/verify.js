const { run } = require("hardhat")

module.exports.verify = async (contractAdress, args) => {
    console.log("Verifying the contract .....")
    try {
        await run("verify:verify", {
            address: contractAdress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("contract already verified")
        } else {
            console.log(e)
        }
    }
}
