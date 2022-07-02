const { deployments, ethers } = require("hardhat")
const { INTIAL_SUPPLY } = require("../../helper-hardhat-config")
const { assert, expect } = require("chai")

describe("OurToken Unit test", function () {
    let OurToken, deployer, player1

    beforeEach(async () => {
        const accounts = await ethers.getSigners()
        deployer = accounts[0]
        player1 = accounts[1]
        await deployments.fixture(["all"])
        OurToken = await ethers.getContract("OurToken", deployer)
    })

    it("shud have crct value of intial supply", async () => {
        const intial_supply = await OurToken.totalSupply()
        assert.equal(intial_supply.toString(), INTIAL_SUPPLY)
    })

    it("shud be able to transfer money to an address", async () => {
        const amount = ethers.utils.parseEther("0.00001")
        await OurToken.transfer(player1.address, amount)
        assert.equal(
            (await OurToken.balanceOf(player1.address)).toString(),
            amount
        )
    })

    it("shud approve other address to spend ours token", async () => {
        const amount = ethers.utils.parseEther("0.0000001")
        await OurToken.approve(player1.address, amount)
        //await OurToken.connect(player1)
        const ourToken1 = await ethers.getContract("OurToken", player1.address)
        await ourToken1.transferFrom(deployer.address, player1.address, amount)
        assert.equal(
            (await OurToken.balanceOf(player1.address)).toString(),
            amount
        )
        // const tokensToSpend = ethers.utils.parseEther("5")
        // await OurToken.approve(player1.address, tokensToSpend)
        // const OurToken1 = await ethers.getContract("OurToken", player1.address)
        // await OurToken1.transferFrom(
        //     deployer.address,
        //     player1.address,
        //     tokensToSpend
        // )
        // expect(await OurToken1.balanceOf(player1.address)).to.equal(
        //     tokensToSpend
        // )
    })
})
