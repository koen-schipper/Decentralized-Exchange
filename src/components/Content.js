import React, { Component } from "react";
import { connect } from 'react-redux';
import { loadAllOrders, subscribeToEvents } from "../store/interactions";
import { exchangeSelector } from "../store/selectors";
import Balance from './Balance';
import NewOrder from './NewOrder';
import OrderBook from './OrderBook';
import PriceChart from './PriceChart';
import MyTransactions from './MyTransactions';
import Trades from './Trades';

class Content extends Component {
    componentDidMount() {
        this.loadBlockchainData(this.props.dispatch)
    }

    async loadBlockchainData(dispatch) {
        await loadAllOrders(this.props.exchange, dispatch)
        await subscribeToEvents(this.props.exchange, dispatch)
    }

    render() {
        return (
            <div className="content">
                <div className="vertical-split">
                    <Balance />
                    <NewOrder />
                </div>
                <OrderBook />
                <div className="vertical-split">
                    <PriceChart />
                    <MyTransactions />
                </div>
                <Trades />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        exchange: exchangeSelector(state)
    }
}

export default connect(mapStateToProps)(Content);