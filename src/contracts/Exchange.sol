// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "./Token.sol";

// TODO:
// [X] Set the fee account
// [ ] Deposit Ether
// [ ] Withdraw Ether
// [ ] Deposit tokens
// [ ] Withdraw tokens
// [ ] Check balances
// [ ] Make order
// [ ] Cancel order
// [ ] Fill order
// [ ] Charge fees

contract Exchange {
    // Variables
    address public feeAccount; // the account that recieves exchange fees
    uint256 public feePercent; // the fee percentage

    constructor (address _feeAccount, uint256 _feePercent) public {
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }

    function depositToken(address _token, uint _amount) public {
        Token(_token).transferFrom(msg.sender, address(this), _amount);
        // Send tokens to this contract
        // Manage deposit - update balance
        // Emit event
    }
}