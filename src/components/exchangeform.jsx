import React, { useState } from 'react';

export const ExchangeForm = (props) => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionMessage, setTransactionMessage] = useState('');
  const [transactions, setTransactions] = useState([]);
  const handleSend = (e) => {
    e.preventDefault();

    if (!recipientAddress || !amount) {
      setTransactionMessage('Please enter a valid address and amount.');
      return;
    }

    // Simulate sending a transaction
    const newTransaction = {
      id: transactions.length + 1,
      recipientAddress,
      amount,
      timestamp: new Date().toLocaleString(),
    };

    setTransactions([...transactions, newTransaction]);
    setTransactionMessage('Transaction sent successfully!');
    setRecipientAddress('');
    setAmount('');
  };

  return (
    <div id="exchangeform">
      <div className="container">
        <div className="row">
          <div >
            <h2>Exchange Cryptocurreny</h2>
            <form onSubmit={handleSend} >
              <div className='col-md-6'>
                <div className='send-label'>
                  <label htmlFor="recipientAddress">Send</label>
                  <label htmlFor="recipientAddress">Tether (TRC20)</label>
                </div>
                <div className="input-group mb-3" >
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Amount"
                    aria-label="Text input"

                  />
                  <div className="input-group-append" >
                    <select className="form-select">
                      <option value="usdt">USDT</option>
                      <option value="option2">BTC</option>
                      <option value="option3">ETH</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='send-label'>
                  <label htmlFor="recipientAddress">Recieve</label>
                  <label htmlFor="recipientAddress">USD</label>
                </div>
                <div className="input-group mb-3" >
                  <input
                    type="number"
                    disabled
                    className="form-control"
                    aria-label="Text input"

                  />
                  <div className="input-group-append" >
                    <select className="form-select">
                      <option value="usdt">USD</option>
                      <option value="usdt">USDT</option>
                      <option value="option2">BTC</option>
                      <option value="option3">ETH</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className='col-md-6'>
                <div className='send-label'>
                  <label htmlFor="recipientAddress">Full Name</label>
                </div>
                <div className="input-group mb-3" >
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Text input"
                    placeholder='Enter your full name'
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='send-label'>
                  <label htmlFor="recipientAddress">UserName</label>
                </div>
                <div className="input-group mb-3" >
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Text input"
                    placeholder='Enter your username'
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='send-label'>
                  <label htmlFor="recipientAddress">Email</label>
                </div>
                <div className="input-group mb-3" >
                  <input
                    type="email"
                    className="form-control"
                    aria-label="Text input"
                    placeholder='Enter your email'
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='send-label'>
                  <label htmlFor="recipientAddress">Phone Number</label>
                </div>
                <div className="input-group mb-3" >
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Text input"
                    placeholder='Enter your Number'
                  />
                </div>
              </div>

              <button className='btn btn-primary' type="submit" >Exchange Now</button>
            </form>
            {transactionMessage && <p >{transactionMessage}</p>}

          </div>
        </div>
      </div>
    </div>
  );

};

