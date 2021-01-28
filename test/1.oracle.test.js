const { expectRevert, time } = require('@openzeppelin/test-helpers');

const utils = require('./utils.js')

const toWei = web3.utils.toWei

contract('ChainlinkPriceOracleProxy', (accounts) => {
    beforeEach(async () => {
        const artifacts = await utils.getArtifacts("main_fork");
        Object.assign(this, artifacts);
        console.log("ChainlinkPriceOracleProxy.address = ", this.oracle.address)        
        this.admin = accounts[0];
    });

    it('should be PriceOracle', async () => {
        let ifIs = await this.oracle.isPriceOracle();
        console.log('is oracle ? '+ ifIs)
        assert.equal(true, ifIs)
        
        let ethUsdChainlink = await this.oracle.ethUsdChainlinkAggregatorAddress();
        assert.equal(ethUsdChainlink, this.dconfig[this.dnetwork].usd_per_eth);
    });

    it('should setTokenConfigs successfully', async() => {
        let cTokenAddress = [
            this.cusdt.address,
            this.cweth.address,
            this.cs_weth_usdt.address
        ];
        let chainlinkAggregatorAddress = [
            this.dconfig[this.dnetwork].eth_per_usdt,
            this.s_weth_usdt.address,
        ];
        // 0: Invalid, 1: USD, 2: ETH, 3: LP
        let chainlinkPriceBase = [
            '1',
            '1',
            '3'
        ];
        let underlyingTokenDecimals = [
            '6',
            '18'
        ];
        
        await this.oracle.setTokenConfigs(
            cTokenAddress,
            chainlinkAggregatorAddress,
            chainlinkPriceBase,
            underlyingTokenDecimals,
            {from: this.admin}
        );

        {
            let cusdtConfig = await this.oracle.tokenConfig(this.cusdt.address);
            assert.equal(cusdtConfig[0], this.dconfig[this.dnetwork].eth_per_usdt);
            assert.equal(cusdtConfig[1], '2');
            assert.equal(cusdtConfig[2], '6');

            let usdtPriceInWeth = await this.oracle.getUnderlyingPrice(this.cusdt.address);
            console.log('usdt price in weth = ', usdtPriceInWeth.toString());

        }

        {
            let cConfig = await this.oracle.tokenConfig(this.cs_weth_usdt.address);
            assert.equal(cConfig[0], this.dconfig[this.dnetwork].sushi_weth_usdt_pair);
            assert.equal(cConfig[1], '3');
            assert.equal(cConfig[2], '18');

            let wethUsdtLpPriceInWeth = await this.oracle.getUnderlyingPrice(this.cs_weth_usdt.address);
            console.log('sushi weth_usdt pair lp price = ', wethUsdtLpPriceInWeth.toString());

        }


    });


});