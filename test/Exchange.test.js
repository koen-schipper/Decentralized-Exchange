import { tokens, EVM_REVERT } from './helpers';

const Token = artifacts.require('./Token');
const Exchange = artifacts.require('./Exchange');

require('chai').use(require('chai-as-promised')).should()

contract('Exchange', ([deployer, feeAccount, user1]) => {
    let token
    let exchange
    const feePercent = 10

    beforeEach(async () => {
        token = await Token.new()
        exchange = await Exchange.new(feeAccount, feePercent)
    })

    describe('deployment', () => {
        it('tracks the feeAccount', async () => {
            const result = await exchange.feeAccount()
            result.should.equal(feeAccount)
        })

        it('tracks the feePercent', async () => {
            const result = await exchange.feePercent()
            result.toString().should.equal(feePercent.toString())
        })
    })

    describe('depositing tokens', () => {
        let result
        let amount

        beforeEach(async () => {
            amount = tokens(10)
            await token.approve(exchange.address, tokens(10), { from: user1 })
            const result = await exchange.depositToken(token.address, amount, { from: user1 })
        })

        describe('success', () => {
            it('tracks the token deposit', async () => {
                // Check exchange token balance
                let balance
                balance = await token.balanceOf(exchange.address)
                balance.toString().should.equal(amount.toString())
            })
        })

        describe('failure', () => {

        })
    })
})