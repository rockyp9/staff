import React, { useState } from 'react';
import { FaBitcoin, FaEthereum, FaPaypal, FaApplePay } from 'react-icons/fa'; // Import icons from react-icons
import { SiLitecoin, SiCashapp, SiZelle } from "react-icons/si";
import { SlRefresh } from "react-icons/sl";
import { BiLogoVenmo } from "react-icons/bi";
import { Oval } from 'react-loader-spinner';
import axios from 'axios';


export const ExchangeForm = (props) => {

  const options = [
    { value: 'btc', label: 'Bitcoin', icon: <FaBitcoin color='orange' /> },
    { value: 'eth', label: 'Ethereum', icon: <FaEthereum color='blue' /> },
    { value: 'ltc', label: 'LTC', icon: <SiLitecoin color='blue' /> },
    { value: 'cashapp', label: 'Cashapp', icon: <SiCashapp color='green' /> },
    { value: 'paypal', label: 'Paypal', icon: <FaPaypal color='blue' /> },
    { value: 'zelle', label: 'zelle', icon: <SiZelle color='duck' /> },
    { value: 'apple', label: 'Apple Pay', icon: <FaApplePay color='black' /> },
    { value: 'venmo', label: 'Venmo', icon: <BiLogoVenmo color='black' /> },
  ];
  const [sendValue, setSendValue] = useState(options[0].value);
  const [recieveValue, setRecieveValue] = useState(options[0].value);
  const [isSendOpen, setIsSendOpen] = useState(false);
  const [isOpenRecieve, setIsRecieveOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleOverlayClick = () => setShowModal(false);


  const handleOptionClick = (value) => {
    setSendValue(value);
    setIsSendOpen(false);
  };
  const handleRecieveOptionClick = (value) => {
    setRecieveValue(value);
    setIsRecieveOpen(false);
  };
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [recieveAmount, setRecieveAmount] = useState('');
  const [transactionMessage, setTransactionMessage] = useState('');
  const [transactions, setTransactions] = useState([]);

  const handleSend = (e) => {
    e.preventDefault();

    if (!amount) {
      setTransactionMessage('Please enter a valid address and amount.');
      return;
    }

    // setRecieveAmount(amount * 4)


    // Simulate sending a transaction
    const newTransaction = {
      id: transactions.length + 1,
      recipientAddress,
      amount,
      recieveAmount,
      fullName,
      userName,
      email,
      number,
      status: 'pending',
      timestamp: new Date().toLocaleString(),
    };
    setLoading(true);

    axios.post("http://localhost:3001/create-transaction", {
      newTransaction
    }).then(() => {
      console.log('success');
      setLoading(false)
      setShowModal(true)
    }).catch(function (error) {
      console.log(error)
    });
  };
  //   axios.post("https://plusexchanges.com/api/create-transaction", {
  //     newTransaction
  //   }).then(() => {
  //     console.log('success');
  //     setLoading(false)
  //     setShowModal(true)
  //   }).catch(function (error) {
  //     console.log(error)
  //   });
  // };

  return (
    <div id="exchangeform">
      <div className="container">
        <div className="row">
          <div >

            <h2>Exchange Today</h2>

            <form onSubmit={handleSend} >
              <div className='col-md-6'>
                <div className='send-label'>
                  <label htmlFor="recipientAddress">Send</label>
                  <label htmlFor="recipientAddress">{sendValue}</label>
                </div>
                <div className="input-group mb-3" >
                  <input
                    required
                    type="number"
                    className="form-control"
                    placeholder="Enter Amount"
                    aria-label="Text input"
                    onChange={(e) => { setAmount(e.target.value); setRecieveAmount(e.target.value * 4) }}
                  />
                  <div className="input-group-append" >
                    <div className="custom-dropdown-container">
                      <div className="custom-dropdown" onClick={() => setIsSendOpen(!isSendOpen)}>
                        <span>{options.find(option => option.value === sendValue).icon}</span>
                        <span>&nbsp;</span>
                        <span>{options.find(option => option.value === sendValue).label}</span>
                      </div>
                      {isSendOpen && (
                        <div className="custom-dropdown-menu">
                          {options.map((option) => (
                            <div
                              key={option.value}
                              className="custom-dropdown-item"
                              onClick={() => handleOptionClick(option.value)}
                            >
                              {option.icon}<span>&nbsp;</span>
                              {option.label}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='send-label'>
                  <label htmlFor="recipientAddress">Recieve</label>
                  <label htmlFor="recipientAddress">{recieveValue}</label>
                </div>
                <div className="input-group mb-3" >
                  <input
                    required
                    type="number"
                    disabled
                    className="form-control"
                    aria-label="Text input"
                    value={recieveAmount}

                  />
                  <div className="input-group-append" >
                    <div className="custom-dropdown-container">
                      <div className="custom-dropdown" onClick={() => setIsRecieveOpen(!isOpenRecieve)}>
                        <span>{options.find(option => option.value === recieveValue).icon}</span>
                        <span>&nbsp;</span>
                        <span>{options.find(option => option.value === recieveValue).label}</span>
                      </div>
                      {isOpenRecieve && (
                        <div className="custom-dropdown-menu">
                          {options.map((option) => (
                            <div
                              key={option.value}
                              className="custom-dropdown-item"
                              onClick={() => handleRecieveOptionClick(option.value)}
                            >
                              {option.icon}<span>&nbsp;</span>
                              {option.label}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-md-6'>
                <div className='send-label'>
                  <label htmlFor="recipientAddress">Full Name</label>
                </div>
                <div className="input-group mb-3" >
                  <input
                    required
                    type="text"
                    className="form-control"
                    aria-label="Text input"
                    placeholder='Enter your full name'
                    onChange={(e) => { setFullName(e.target.value) }}
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='send-label'>
                  <label htmlFor="recipientAddress">UserName</label>
                </div>
                <div className="input-group mb-3" >
                  <input
                    required
                    type="text"
                    className="form-control"
                    aria-label="Text input"
                    placeholder='Enter your username'
                    onChange={(e) => { setUserName(e.target.value) }}

                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='send-label'>
                  <label htmlFor="recipientAddress">Email</label>
                </div>
                <div className="input-group mb-3" >
                  <input
                    required
                    type="email"
                    className="form-control"
                    aria-label="Text input"
                    placeholder='Enter your email'
                    onChange={(e) => { setEmail(e.target.value) }}

                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='send-label'>
                  <label htmlFor="recipientAddress">Phone Number</label>
                </div>
                <div className="input-group mb-3" >
                  <input
                    required
                    type="text"
                    className="form-control"
                    aria-label="Text input"
                    placeholder='Enter your Number'
                    onChange={(e) => { setNumber(e.target.value) }}

                  />
                </div>
              </div>

              <button className='btn btn-primary submit-button' type="submit" >Exchange Now
                {loading ? <Oval
                  height={20}
                  width={20}
                  color="white"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#f3f3f3"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                /> : ''}
              </button>
            </form>
            {transactionMessage && <p >{transactionMessage}</p>}
            <div className="modal-overlay" onClick={handleOverlayClick}>
              <div className={`modal my-modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-body">
                      <p className='transaction-label'>Transaction ID:</p>
                      <p className='transaction-id'>aujt0q3429uapojasglk34ltyn3lnlnga</p>
                      <h3 className="status-label">Transaction Status</h3>
                      <div className="transaction-status"> <SlRefresh />
                        <span>IN-PROGRESS</span>
                      </div>
                      <div className="next-steps">
                        <h4 className='steps-label'>Next Steps</h4>
                        <p className="step-description">
                          1. Congrats! You're almost there to finishing your exchange! Deposit the allocated funds to your desired platform, our information is listed below:

                        </p>
                        <span>
                          Cashapp Tag - $payments006
                          <br />
                          Apple Pay Number - 5188058067
                          <br />
                          BTC Address - bc1qrlskgumqmukj40fa8ysk94uz9vk4rwyq9ajqqf
                          <br />
                          LTC Address - LaBTZwQmdL2NjRn9oiuYs56tpXx1nGZW4o
                          <br />
                          ETH Address - 0xAc4b8dB681366272df454d1d02D55E319e5374E5
                          <br />
                          Zelle/Venmo/Paypal - Currently Down, We Apologize for the inconvenience
                          <br />
                        </span>
                        <br />
                        <p className="step-description">
                          2. Once you've sent the funds to the allocated address, make sure to input the web receipt if you used Cashapp/ TXID if you used crypto/ Your Number if you used Apple Pay.
                        </p>
                        <p className="step-description">
                          3. Our Team will be sending you the allocated funds to the username or address you provided.
                        </p>
                        <p className="step-description">
                          4. When the transaction is complete, We'll text you with a confirmation text to make sure you've received your money, Thank you for using PlusExchanges!
                        </p>
                        <span>If you have any issues please contact us through email or phone
                          <br />
                          Phone number - 5188058067
                          <br />
                          Email - sbqzyt@gmail.com
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

