import React, { Component } from "react";
import { Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import Spinner from './Spinner';
import {
    exchangeSelector,
    tokenSelector,
    accountSelector,
    web3Selector,
    buyOrderSelector,
    sellOrderSelector
} from "../store/selectors";
import {
    buyOrderAmountChanged,
    buyOrderPriceChanged,
    sellOrderAmountChanged,
    sellOrderPriceChanged
} from "../store/actions";

const showForm = (props) => {
    return(
        <Tabs defaultActiveKey="buy" className="bg-dark text-white">
            <Tab eventKey="buy" title="Buy" className="bg-dark">

            </Tab>
            <Tab eventKey="sell" title="Sell" className="bg-dark">

            </Tab>
        </Tabs>
    )
}

class NewOrder extends Component {
    render() {
        return(
            <div className="card bg-dark text-white">
                <div className="card-header">
                    New Order
                </div>
                <div className="card-body">
                    { showForm(this.props) }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const buyOrder = buyOrderSelector(state)
    const sellOrder = sellOrderSelector(state)

    return{
        account: accountSelector(state),
        exchange: exchangeSelector(state),
        token: tokenSelector(state),
        web3: web3Selector(state),
        buyOrder,
        sellOrder,
        showForm: !buyOrder.making && !sellOrder.making
    }
}

export default connect(mapStateToProps)(NewOrder)