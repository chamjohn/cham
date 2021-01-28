const utils = require('./utils')
const Unitroller = artifacts.require("Unitroller")
const ComptrollerG4 = artifacts.require("ComptrollerG4")
const CErc20 = artifacts.require("CErc20")
const CErc20Delegate = artifacts.require("CErc20Delegate")
const CErc20DelegatorUsdt = artifacts.require("CErc20Delegator")
const CErc20DelegatorSushiWethUsdt = artifacts.require("CErc20Delegator")


CERC20_DELEGATE = "cerc20_delegate"
CERC20_DELEGATOR_USDT = "cerc20_delegator_usdt"
CERC20_DELEGATOR_SUSHI_WETH_USDT = "cerc20_delegator_sushi_weth_usdt"
const toWei = web3.utils.toWei


module.exports = async function (deployer, network, accounts) {
    console.log("5_deploy_ctoken.js, network: ", network)
    let deployedConfig = utils.getConfigContractAddresses();
    let config = utils.getContractAddresses();
    
    if (network == "main_fork") {
        // deploy CErc20Delegate
        let cerc20Admin = accounts[0];
        await deployer.deploy(CErc20Delegate, {from: cerc20Admin});
        config[network][CERC20_DELEGATE] = CErc20Delegate.address
        
        // deploy usdt through CErc20Delegator
        await deployer.deploy(CErc20DelegatorUsdt, 
            deployedConfig.mainnet.usdt,
            config[network].unitroller,
            config[network].usdt_interest_rate_model.address,
            deployedConfig.config.cusdt.initial_exchange_rate_mantissa,
            deployedConfig.config.cusdt.name,
            deployedConfig.config.cusdt.symbol,
            deployedConfig.config.cusdt.decimals,
            cerc20Admin,
            CErc20Delegate.address,
            '0x0', {from: cerc20Admin});
        config[network][CERC20_DELEGATOR_USDT] = CErc20DelegatorUsdt.address
        
        // deploy usdt through CErc20Delegator
        await deployer.deploy(CErc20DelegatorSushiWethUsdt, 
            deployedConfig.mainnet.sushi_weth_usdt_pair,
            config[network].unitroller,
            config[network].usdt_interest_rate_model.address,
            deployedConfig.config.sushi_weth_usdt_pair.initial_exchange_rate_mantissa,
            deployedConfig.config.sushi_weth_usdt_pair.name,
            deployedConfig.config.sushi_weth_usdt_pair.symbol,
            deployedConfig.config.sushi_weth_usdt_pair.decimals,
            cerc20Admin,
            CErc20Delegate.address,
            '0x0', {from: cerc20Admin});
        config[network][CERC20_DELEGATOR_SUSHI_WETH_USDT] = CErc20DelegatorSushiWethUsdt.address
        

        // save config
        utils.writeContractAddresses(config);

    } else {
        return
    }
    
    


}