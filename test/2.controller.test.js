const { expectRevert, time } = require('@openzeppelin/test-helpers');

const utils = require('./utils.js')

const toWei = web3.utils.toWei

contract('ControllerG4', ([admin, alice]) => {
    beforeEach(async () => {
        const artifacts = await utils.getArtifacts("main_fork");
        Object.assign(this, artifacts);
        console.log("Controller.address = ", this.controller.address)        
    });

    it('should be Comptroller', async () => {
        let ifIs = await this.controller.isComptroller();
        console.log('is comptroller ? '+ ifIs)
        assert.equal(true, ifIs)
    });

    it('should setTokenConfigs successfully', async() => {
        
    })


});