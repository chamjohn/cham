const { expectRevert, time } = require('@openzeppelin/test-helpers');

const utils = require('./utils.js')

const toWei = web3.utils.toWei

contract('CToken', ([admin, alice]) => {
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

    it('should setTokenConfigs successfully', async() => {
        
    })


});