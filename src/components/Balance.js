import React, { Component } from "react";
import { Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    loadBalances,
    depositEther
} from "../store/interactions";
import Spinner from './Spinner';
import {
    web3Selector,
    exchangeSelector,
    tokenSelector,
    accountSelector,
    etherBalanceSelector,
    tokenBalanceSelector,
    exchangeEtherBalanceSelector,
    exchangeTokenBalanceSelector,
    balancesLoadingSelector,
    etherDepositAmountSelector
} from '../store/selectors';
import { etherDepositAmountChanged } from '../store/actions';

const showForm = (props) => {
    const {
        dispatch,
        etherBalance,
        tokenBalance,
        exchangeEtherBalance,
        exchangeTokenBalance,
        etherDepositAmount,
        web3,
        exchange,
        token,
        account
    } = props

    return(
        <Tabs defaultActiveKey="deposit" className="bg-dark text-white">
            <Tab eventKey="deposit" title="Deposit" className="bg-dark">
                <table className="table table-dark table-sm small">
                    <thead>
                        <tr>
                            <th>Token</th>
                            <th>Wallet</th>
                            <th>Exchange</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ETH</td>
                            <td>{etherBalance}</td>
                            <td>{exchangeEtherBalance}</td>
                        </tr>
                        <tr>
                        </tr>
                        <tr>
                            <td>DEX</td>
                            <td>{tokenBalance}</td>
                            <td>{exchangeTokenBalance}</td>
                        </tr>
                    </tbody>
                </table>

                <form className="row" onSubmit={(event) => {
                    event.preventDefault()
                    depositEther(dispatch, exchange, web3, etherDepositAmount, account)
                    console.log("form submitting...")
                }}>
                    <div className="col-12 col-sm pr-sm-2">
                        <input
                            type="text"
                            placeholder="ETH Amount"
                            onChange={(e) => dispatch( etherDepositAmountChanged(e.target.value) ) }
                            className="form-control form-control-sm bg-dark text-white"
                            required />
                    </div>
                    <div className="col-12 col-sm-auto pl-sm-0">
                        <button type="submit" className="btn btn-primary btn-block btn-sm">Deposit</button>
                    </div>
                </form>
            </Tab>
            <Tab eventKey="withdraw" title="Withdraw" className="bg-dark">
                <table className="table table-dark table-sm small">
                    <thead>
                    <tr>
                        <th>Token</th>
                        <th>Wallet</th>
                        <th>Exchange</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>ETH</td>
                        <td>{etherBalance}</td>
                        <td>{exchangeEtherBalance}</td>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                        <td>DEX</td>
                        <td>{tokenBalance}</td>
                        <td>{exchangeTokenBalance}</td>
                    </tr>
                    </tbody>
                </table>
            </Tab>
        </Tabs>
    )
}

class Balance extends Component {
    componentDidMount() {
        this.loadBlockchainData()
    }

    async loadBlockchainData() {
        const { dispatch, web3, exchange, token, account } = this.props
        await loadBalances(dispatch, web3, exchange, token, account)
    }

    render() {
        return(
            <div className="card bg-dark text-white">
                <div className="card-header">
                    Balance
                </div>
                <div className="card-body">
                    {this.props.showForm ? showForm(this.props) : <Spinner />}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    const balancesLoading = balancesLoadingSelector(state)

    return{
        web3: web3Selector(state),
        exchange: exchangeSelector(state),
        token: tokenSelector(state),
        account: accountSelector(state),
        etherBalance: etherBalanceSelector(state),
        tokenBalance: tokenBalanceSelector(state),
        exchangeEtherBalance: exchangeEtherBalanceSelector(state),
        exchangeTokenBalance: exchangeTokenBalanceSelector(state),
        balancesLoading,
        showForm: !balancesLoading,
        etherDepositAmount: etherDepositAmountSelector(state)
    }
}

export default connect(mapStateToProps)(Balance)