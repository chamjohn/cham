const { expectRevert, time } = require('@openzeppelin/test-helpers');

const utils = require('./utils.js')

const toWei = web3.utils.toWei

contract('ChainlinkPriceOracleProxy', ([admin, alice]) => {
    beforeEach(async () => {
        const artifacts = await utils.getArtifacts("main_fork");
        Object.assign(this, artifacts);
        console.log("ChainlinkPriceOracleProxy.address = ", this.oracle.address)        
    });

    it('should be PriceOracle', async () => {
        let ifIs = await this.oracle.isPriceOracle();
        console.log('is oracle ? '+ ifIs)
        assert.equal(true, ifIs)
    });

    it('should setTokenConfigs successfully', async() => {
        
    })


});