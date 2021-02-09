const { expectRevert, time } = require('@openzeppelin/test-helpers');
const EIP20Interface = artifacts.require("EIP20Interface")
const CErc20Delegate = artifacts.require("CErc20Delegate")

const utils = require('./utils.js')

const toWei = web3.utils.toWei

contract('CToken', (accounts) => {
    beforeEach(async () => {
        const artifacts = await utils.getArtifacts("main_fork");
        Object.assign(this, artifacts);
        console.log("usdt.address = ", this.usdt.address)
        console.log("cusdt.address = ", this.cusdt.address)
    });

    it('should be CToken', async () => {
        let ifIs = await this.cusdt.isCToken();
        console.log('is ctoken ? '+ ifIs)
        assert.equal(true, ifIs)
    });

    it('should be normal erc20', async() => {
        console.log('usdt.address ', this.usdt.address)
        console.log('this.controller.address ', this.controller.address)
        console.log('this.usdt_interest_model.address ', this.usdt_interest_model.address)

        {
            let name = await this.cusdt.name.call();
            console.log("name: ", name);
            
            let symbol = await this.cusdt.symbol.call();
            console.log("symbol: ", symbol.toString())

            let decimals = await this.cusdt.decimals.call();
            console.log("decimals: ", decimals.toString())

            let supply = await this.cusdt.totalSupply.call();
            console.log("total supply: ", supply.toString());

            // let bal1 = await this.cudt.balanceOf(accounts[1]);
            // console.log('before transfer, bal: ', bal1.toString())
            // await this.cusdt
        }
    })

    it('should have empty farm coin info', async () => {
        let farmCoin = await this.controller.getFarmCoin(this.cusdt.address);
        console.log("farmCoin.coinBase: ", farmCoin.coinBase.toString())
        console.log("farmCoin.farmRatio: ", farmCoin.farmRatio.toString())
        console.log("farmCoin.vault: ", farmCoin.vault)
    });
    it('check env before supply', async () => {
        let ifMintPaused = await this.controller.mintGuardianPaused(this.cusdt.address);
        console.log("ifMintPaused: ", ifMintPaused)
        let market = await this.controller.markets(this.cusdt.address)
        console.log("isListed: ", market.isListed)
        let exchangeRateStored = await this.cusdt.exchangeRateStored();
        console.log("exchangeRateStored: ", exchangeRateStored.toString())
    });

    it('should supply usdt successfully', async() => {
        let usdtBalance = await this.usdt.balanceOf(accounts[0]);
        console.log("usdt balance = ", usdtBalance.toString());
        if (usdtBalance.toString() == "0") {
            await utils.swapEthTo(this, this.dconfig[this.dnetwork].usdt, toWei('0.1', 'ether'), accounts[0]);
        }
        
        usdtBalance = await this.usdt.balanceOf(accounts[0]);
        console.log("usdt balance = ", usdtBalance.toString());
        await this.usdt.approve(this.cusdt.address, '0');
        await this.usdt.approve(this.cusdt.address, usdtBalance);

        await this.cusdt.mint(usdtBalance, {from: accounts[0]});
        let cusdtBalance = await this.cusdt.balanceOf(accounts[0]);
        console.log("cusdt balance = ", cusdtBalance.toString());

    });
    


});