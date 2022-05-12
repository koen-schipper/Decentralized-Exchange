import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Content from './Content';
import { connect } from 'react-redux';
import {
    loadWeb3,
    loadAccount,
    loadToken,
    loadExchange
} from '../store/interactions';
import { contractsLoadedSelector } from "../store/selectors";

class App extends Component {
    componentDidMount() {
        this.loadBlockchainData(this.props.dispatch)
    }

    async loadBlockchainData(dispatch) {
        const web3 = await loadWeb3(dispatch)
        const networkId = await web3.eth.net.getId()
        const token = await loadToken(web3, networkId, dispatch)
        if(!token) {
            window.alert('Token smart contract not detected on the current network. Please select another network within MetaMask.')
            return
        }
        await loadAccount(web3, dispatch)
        const exchange = await loadExchange(web3, networkId, dispatch)
        if(!exchange) {
            window.alert('Exchange smart contract not detected on the current network. Please select another network within MetaMask.')
            return
        }
    }

    render() {
        return (
            <div>
                <Navbar />
                { this.props.contractsLoaded ? <Content /> : <div className="content"></div> }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        contractsLoaded: contractsLoadedSelector(state)
    }
}
export default connect(mapStateToProps)(App);