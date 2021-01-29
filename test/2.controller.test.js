const { expectRevert, time } = require('@openzeppelin/test-helpers');

const utils = require('./utils.js')

const toWei = web3.utils.toWei

contract('ControllerG4', (accounts) => {
    beforeEach(async () => {
        const artifacts = await utils.getArtifacts("main_fork");
        Object.assign(this, artifacts);
    });

    it('should be Comptroller', async () => {
        let ifIs = await this.controller.isComptroller();
        console.log('is comptroller ? '+ ifIs)
        assert.equal(true, ifIs)
    });

    it('should _setPriceOracle successfully', async() => {
        await this.controller._setPriceOracle(this.oracle.address)
        let storedOralce = await this.controller.oracle();
        assert.equal(storedOralce, this.oracle.address);
    })

    it('should _setCompAddress successfully', async() => {
        let compAddr = await this.controller.getCompAddress();
        if (compAddr != this.comp.address) {
            await this.controller._setCompAddress(this.comp.address);
            compAddr = await this.controller.getCompAddress();
        }
        assert.equal(compAddr, this.comp.address);
    });

    it('should _setCloseFactor successfully', async() => {
        await this.controller._setCloseFactor(toWei('0.5', 'ether'))
        let factor = await this.controller.closeFactorMantissa();
        assert.equal(factor, toWei('0.5', 'ether'));
    });

    it('should _supportMarket successfully', async() => {
        await this.controller._setMaxAssets('10')

        await this.controller._supportMarket(this.cusdt.address)
        await this.controller._supportMarket(this.ceth.address)
        await this.controller._supportMarket(this.cs_weth_usdt.address)

    });

    it('should _setCollateralFactor successfully', async() => {
        await this.controller._setCollateralFactor(this.cusdt.address, toWei('0.9', 'ether'))
        await this.controller._setCollateralFactor(this.ceth.address, toWei('0.8', 'ether'))
        await this.controller._setCollateralFactor(this.cs_weth_usdt.address, toWei('0.85', 'ether'))

        {
            let cusdtMarket = await this.controller.markets(this.cusdt.address);
            assert.equal(cusdtMarket.isListed, true)
            assert.equal(cusdtMarket.collateralFactorMantissa, toWei('0.9', 'ether'))
            assert.equal(cusdtMarket.isComped, false)
        }
    });
    it('should supply usdt successfully', async() => {
        await utils.swapEthTo(this, this.dconfig[this.dnetwork].usdt, toWei('0.1', 'ether'), accounts[0]);
        let usdtBalance = await this.usdt.balanceOf.call(accounts[0]);
        console.log("usdt balance = ", usdtBalance.toString());
        await this.usdt.approve(this.cusdt.address, '0');
        await this.usdt.approve(this.cusdt.address, usdtBalance);

        await this.cusdt.mint(usdtBalance);
        let cusdtBalance = await this.cusdt.balanceOf.call(accounts[0]);
        console.log("cusdt balance = ", cusdtBalance.toString());

    });


});