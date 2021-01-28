const ChainlinkPriceOracleProxy = artifacts.require("ChainlinkPriceOracleProxy")
const Unitroller = artifacts.require("Unitroller")
const ComptrollerG4 = artifacts.require("ComptrollerG4")
const CErc20 = artifacts.require("CErc20")
const CErc20Delegate = artifacts.require("CErc20Delegate")
const CErc20Delegator = artifacts.require("CErc20Delegator")
const EIP20Interface = artifacts.require("EIP20Interface")
const IUniswapV2Pair = artifacts.require("IUniswapV2Pair")

const utils = require('../migrations/utils');
const { time } = require('@openzeppelin/test-helpers');

async function getArtifacts(network) {
    const dconfig = utils.getConfigContractAddresses();
    let dnetwork;
    if (network == "main_fork") {
        dnetwork = "mainnet"
        const config = utils.getContractAddresses();

        const [oracle, controller, 
            usdt, cusdt,
            s_weth_usdt, cs_weth_usdt
        ] = await Promise.all([
            ChainlinkPriceOracleProxy.at(config[network].oracle),
            ComptrollerG4.at(config[network].unitroller),
            
            EIP20Interface.at(dconfig[dnetwork].usdt),
            CErc20Delegate.at(config[network].cerc20_delegator_usdt),

            IUniswapV2Pair.at(dconfig[dnetwork].sushi_weth_usdt_pair),
            CErc20Delegate.at(config[network].cerc20_delegator_sushi_weth_usdt)
        ]);
        res = {
            dconfig,
            config,
            network,
            dnetwork,

            oracle,
            controller,

            usdt,
            cusdt,

            weth,
            cweth,

            s_weth_usdt,
            cs_weth_usdt

        }

        return res;
    }
    

}



// async function swapEthTo(to, amount, account) {
//     const config = utils.getContractAddresses();
//     let weth = await IWETH.at(config.contracts.tokens.WETH.address);
//     await weth.deposit({from: account, value: amount})
//     let factory = await IUniswapV2Factory(config.contracts.factory);
//     // let pairAddr = await factory.getPair(weth.address, to);
//     // let pair = await IUniswapV2Pair.at(pairAddr);
//     await weth.approve(config.contracts.router, amount, {from: account});
//     let router = await IUniswapV2Router.at(config.contracts.router);
//     let amountOut = await router.getAmountsOut(amount, [weth.address, to]);
//     let deadline = (await time.latest()).add(time.duration.days(1));
//     await router.swapTokensForExactTokens(amountOut[1], amount, [weth.address, to], account, deadline, {from: account});
//     let tt = await TestToken.at(to);
//     console.log("to token name", await tt.name());
//     console.log("to acct  bala:", (await tt.balanceOf(account)).toString())
// }

module.exports = {
    getArtifacts,
    // swapEthTo
}