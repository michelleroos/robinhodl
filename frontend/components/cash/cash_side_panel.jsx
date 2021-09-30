import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function CashSidePanel({ dispatch }) {

  const currentUser = useSelector((state) => state.session.currentUser.id)

  const [transfer, setTransfer] = useState({
    transfer_type: 'deposit',
    amount: null,
    user_id: currentUser
  });

  const [to, setTo] = useState('Robinhodl');

  const handleTransfer = (e) => {
    e.preventDefault();
    dispatch(makeTransfer(transfer))
    console.log('transfer clicked');
  }

  const changeOption = (val) => {
    if (val === 'deposit') {
      setTo('Robinhodl')
      setTransfer({ ...transfer, transfer_type: 'withdraw' })
    } else {
      setTo('Universal Bank')
    }
  }

  return (
    <div id="side-panel-container">
      <h3>Transfer</h3>
      <form onSubmit={handleTransfer}>
        <div id="from" className="options">
          <p>From</p>
          <div id="select-container">
            <select name="from" id="from-select" onChange={(e) => changeOption(e.target.value)}>
              <option value="deposit">Universal Bank</option>
              <option value="withdraw">Robinhodl</option>
            </select>
          </div>
        </div>

        <div id="to" className="options">
          <p>To</p>
          <div id="to-container">
            <p>{to}</p>
            {/* <select name="from" id="from-select" onChange={(e) => setTransfer({ ...transfer, transfer_type: e.target.value })}>
              <option value="robinhodl">Robinhodl</option>
              <option value="universal-bank">Universal Bank</option>
            </select> */}
          </div>
        </div>

        <div id="amount" className="options">
          <p>Amount</p>
          <input type="text" placeholder="$0.00" required onChange={(e) => setTransfer({ ...transfer, amount: e.target.value })} />
        </div>
        <button id={transfer.amount ? 'green': 'gray'}>Transfer</button>
      </form>
    </div>
  )
}
