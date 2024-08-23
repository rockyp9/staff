import React, { useEffect, useState } from 'react';
import { FaBitcoin, FaEthereum, FaPaypal, FaApplePay } from 'react-icons/fa'; // Import icons from react-icons
import { SiLitecoin, SiCashapp, SiZelle } from "react-icons/si";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { SlRefresh } from "react-icons/sl";
import { BiLogoVenmo } from "react-icons/bi";
import { Oval } from 'react-loader-spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MovingDots from './movingdots';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ExchangeForm = () => {

  const options = [
    { value: 'btc', label: 'bitcoin', color: 'orange', placeholder: 'Your Bitcoin Address', icon: <FaBitcoin size={20} color='orange' /> },
    { value: 'eth', label: 'ethereum', color: 'silver', placeholder: 'Your Ethereum Address', icon: <FaEthereum size={20} color='silver' /> },
    { value: 'ltc', label: 'litecoin', color: 'blue', placeholder: 'Your litecoin Address', icon: <SiLitecoin size={20} color='blue' /> },
    { value: 'cashapp', label: 'Cashapp', color: 'green', placeholder: 'Your $cashtag', icon: <SiCashapp size={20} color='green' /> },
    { value: 'paypal', label: 'Paypal', color: 'lightblue', placeholder: 'Your Paypal Username/Email', icon: <FaPaypal size={20} color='lightblue' /> },
    { value: 'zelle', label: 'zelle', color: 'purple', placeholder: 'Your Zelle Username/Number', icon: <SiZelle size={20} color='purple' /> },
    { value: 'apple', label: 'Apple Pay', color: 'black', placeholder: 'Your Iphone number', icon: <FaApplePay size={20} color='black' /> },
    { value: 'venmo', label: 'Venmo', color: 'white', placeholder: 'Your Venmo Username', icon: <BiLogoVenmo size={20} color='white' /> },
  ];
  const [sendValue, setSendValue] = useState(options[0].value);
  const [sendUsdAmount, setSendUsdAmount] = useState('');
  const [sendLabel, setSendLabel] = useState(options[0].label)
  const [recieveValue, setRecieveValue] = useState(options[0].value);
  const [isSendOpen, setIsSendOpen] = useState(false);
  const [isOpenRecieve, setIsRecieveOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [txidSubmitted, setTxidSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [recieveAmount, setRecieveAmount] = useState('');
  const [transactionMessage, setTransactionMessage] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [txid, setTXID] = useState('');
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [rate, setRate] = useState('');
  const [currencies, setCurrencies] = useState({})
  const [validAddress, setValidAddress] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin&vs_currencies=usd`)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        var nowCurrenices = {};
        nowCurrenices.btc = response['bitcoin']['usd'];
        nowCurrenices.eth = response['ethereum']['usd'];
        nowCurrenices.ltc = response['litecoin']['usd'];
        nowCurrenices.cashapp = 1;
        nowCurrenices.zelle = 1;
        nowCurrenices.paypal = 1;
        nowCurrenices.apple = 1;
        nowCurrenices.venmo = 1;
        setCurrencies(nowCurrenices);
        console.log(nowCurrenices)
        setSendUsdAmount(nowCurrenices.btc);
        setRate(1)
      })
      .catch(err => console.error(err));
    axios.get(`${process.env.REACT_APP_API_URL}/get-transactions`
    ).then((response) => {
      setTransactions(response.data)
    }).catch(function (error) {

      console.log(error)
    });
  }, []);

  const handleOptionClick = (option) => {
    setSendValue(option.value);
    setSendLabel(option.label);
    console.log(option.value, recieveValue);
    console.log(currencies[option.value])
    setRecieveAmount(amount * currencies[option.value] / currencies[recieveValue]);
    setRate(currencies[option.value] / currencies[recieveValue]);
    setSendUsdAmount(currencies[option.value]);
    setIsSendOpen(false);
  };

  const handleRecieveOptionClick = (option) => {
    setRecieveValue(option.value);
    setRecieveAmount(amount * currencies[sendValue] / currencies[option.value]);
    setRate(currencies[sendValue] / currencies[option.value]);
    setIsRecieveOpen(false);
  };

  const handleChangeSendAmount = (e) => {
    setAmount(e.target.value);
    setRecieveAmount((e.target.value) * (rate))
  }

  const handleSend = (e) => {

    e.preventDefault();

    // if (!isTermsChecked) {
    //   toast.error('You must agree to the terms of service before exchanging.');
    //   return;
    // }
    if (!amount) {
      setTransactionMessage('Please enter a valid address and amount.');
      return;
    }
    setLoading(true);

    const newTransaction = {
      id: transactions.length + 1,
      amount,
      usdValue: sendUsdAmount * amount,
      recieveAmount,
      userName,
      sendValue,
      recieveValue,
      status: 'pending',
      timestamp: new Date().toLocaleString(),
    };

    axios.post(`${process.env.REACT_APP_API_URL}/create-transaction`, {
      newTransaction
    }).then(() => {
      console.log('success');
    const isValid = await validateAddress(recieveValue, userName);
    console.log(isValid);
    if (!isValid) {
      setLoading(false);
      // setShowModal(true);
      navigate('/await', { state: { transaction: newTransaction } });

    }).catch(function (error) {
      setLoading(false)
      console.log(error)
    });
  };

  const handleSubmitTXID = () => {
    if (!amount) {
      toast('You must fill the required fields before sending TXID ');
      return;
    }
    const txidData = {
      amount,
      recieveAmount,
      fullName,
      userName,
      email,
      number,
      txid,
      timestamp: new Date().toLocaleString(),
    };
    axios.post(`${process.env.REACT_APP_API_URL}/create-txid`, {
      txidData
    }).then(() => {

      try {
        const subject = 'New Transaction Requested';
        const text = `${fullName} requested ${amount} ${sendValue}  exchanging into ${recieveValue}.
        Here is TXID - ${txid} 
        Here is the user's contact info.
        Fullname: ${fullName}
        Desired platform Username/Address: ${userName}
        Email Address: ${email}
        Phone Number: ${number}
        `;
        axios.post(`${process.env.REACT_APP_API_URL}/send-email`, {
          recipient: 'aaditakula2@gmail.com',
          subject: subject,
          text: text
        });
      } catch (error) {
        console.error('Error sending email:', error);
        alert('Failed to send email');
      }
      console.log('success');
      setAmount('');
      setEmail('');
      setFullName('');
      setUserName('');
      setNumber('');
      setRecieveAmount('');
      setTXID('');
      // setShowModal(false);
      setTransactionMessage('');
      toast("Please wait for your exchange to be automated");

    }).catch(function (error) {
      console.log(error)
    });
  };

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleCheckboxChange = () => {
    setIsTermsChecked(!isTermsChecked);
  }

  return (
    <div id="exchangeform">
      <div className="container">
        <div className="row">
          <div className='intro-text' >
            <ToastContainer />
            <div className="title-movingdots">
              <MovingDots header={true} />
              <h1>Exchange Today</h1>
            </div>
            <br />
            <br />
            <br />
            <br />
            <form onSubmit={handleSend} >
              <div className='col-md-5'>
                <div className='send-label'>
                  <label htmlFor="recipientAddress">You Send</label>
                  <label htmlFor="recipientAddress">{sendValue}</label>
                </div>
                <div className="input-group mb-3" >
                  <input
                    style={{ borderColor: options.find(option => option.value === sendValue)?.color || '' }}
                    required
                    type="number"
                    className="form-control"
                    placeholder="50"
                    aria-label="Text input"
                    value={amount}
                    onChange={(e) => { handleChangeSendAmount(e) }}
                  />

                  <div className="input-group-append" >
                    <div className="custom-dropdown-container">
                      <div className="custom-dropdown" onClick={() => {
                        setIsSendOpen(!isSendOpen);
                      }}>
                        <span>{options.find(option => option.value === sendValue).icon}</span>
                        <span>&nbsp;</span>
                        <span style={{ textTransform: 'capitalize' }}>{options.find(option => option.value === sendValue).label}</span>
                      </div>
                      {isSendOpen && (
                        <div className="custom-dropdown-menu">
                          {options.map((option) => (
                            <div
                              key={option.value}
                              className="custom-dropdown-item"
                              onClick={() => handleOptionClick(option)}
                            >
                              <div>
                                {option.icon}<span>&nbsp;</span>
                                <span style={{ textTransform: 'capitalize' }}>
                                  {option.label}
                                </span>
                              </div>
                              <span style={{ textTransform: 'uppercase' }}>{option.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {amount && <div className="crypto-price">
                    <p>{amount} {sendValue} = {recieveAmount} {recieveValue} </p>
                    <p>${sendUsdAmount * amount}</p>
                  </div>}
                </div>
              </div>
              <div className="col-md-2 exchangeicon">
                <FaArrowRightArrowLeft />
              </div>
              <div className='col-md-5'>
                <div className='send-label'>
                  <label htmlFor="recipientAddress">You Recieve</label>
                  <label htmlFor="recipientAddress">{recieveValue}</label>
                </div>
                <div className="input-group mb-3" >
                  <input
                    style={{ borderColor: options.find(option => option.value === recieveValue)?.color || '' }}
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
                        <span style={{ textTransform: 'capitalize' }}>{options.find(option => option.value === recieveValue).label}</span>
                      </div>
                      {isOpenRecieve && (
                        <div className="custom-dropdown-menu">
                          {options.map((option) => (
                            <div
                              key={option.value}
                              className="custom-dropdown-item"
                              onClick={() => handleRecieveOptionClick(option)}
                            >
                              <div>
                                {option.icon}<span>&nbsp;</span>
                                <span style={{ textTransform: 'capitalize' }}>
                                  {option.label}
                                </span>
                              </div>
                              <span style={{ textTransform: 'uppercase' }}>{option.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className='col-md-6'>
                <div className='send-label'>
                  <label htmlFor="recipientAddress">Full Name</label>
                </div>
                <div className="input-group mb-3" >
                  <input
                    required
                    type="text"
                    className="form-control"
                    aria-label="Text input"
                    placeholder='John Doe'
                    onChange={(e) => { setFullName(e.target.value) }}
                    value={fullName}
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='send-label'>
                  <label htmlFor="recipientAddress">Desired Platform Username/Address</label>
                </div>
                <div className="input-group mb-3" >
                  <input
                    required
                    type="text"
                    className="form-control"
                    aria-label="Text input"
                    placeholder='$cashtag/Crypto Address'
                    onChange={(e) => { setUserName(e.target.value) }}
                    value={userName}
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
                    placeholder='joe@gmail.com'
                    onChange={(e) => { setEmail(e.target.value) }}
                    value={email}
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
                    placeholder='1234567890'
                    onChange={(e) => { setNumber(e.target.value) }}
                    value={number}
                  />
                </div>
              </div> */}

              <div className="col-md-12" style={{ margin: '50px 0' }}>
                <div className='send-label'>
                  <label htmlFor="recipientAddress">Desired Platform Username/Address</label>
                </div>
                <div className="input-group mb-3" >
                  <input
                    required
                    type="text"
                    className="form-control"
                    aria-label="Text input"
                    placeholder={` ${options.find(option => option.value === recieveValue).placeholder}`}
                    onChange={(e) => { setUserName(e.target.value) }}
                    value={userName}
                    style={{ textTransform: 'capitalize' }}
                  />
                </div>
              </div>
              <div className="col-md-12 terms-agree">
                {/* <input
                  type="checkbox"
                  id="terms"
                  checked={isTermsChecked}
                  onChange={handleCheckboxChange}
                /> */}
                <label htmlFor="terms">
                  I agree that by using PlusExchanges, I accept the  <a href="/terms" target="_blank">Terms of service</a>.
                </label>
              </div>
              <div className="col-md-12 form-submit-button">

                <button className='btn btn-primary submit-button gradient-border-button' type="submit" >Exchange Now
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
              </div>
            </form>
            {/* {transactionMessage && <p >{transactionMessage}</p>}
            <div className="modal-overlay">
              <div className={`modal my-modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1">
                <div className="modal-dialog">
                  <div className="modal-content custom-modal-content">
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
                        <div className="txid-input">
                          <label htmlFor="TXID">Please enter the Web Recipt/TXID/Number</label>
                          <input
                            required
                            type="text"
                            className="form-control"
                            aria-label="Text input"
                            placeholder='Enter the Web Recipt/TXID/Number'
                            onChange={(e) => { setTXID(e.target.value) }}
                            value={txid}
                          />
                          <button className='btn btn-primary ' onClick={handleSubmitTXID} >Send</button>
                          <button className='btn btn-default close-button' onClick={handleCloseModal} >Close</button>
                          {txidSubmitted && <p>Please wait for your exchange to be automated</p>}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div >
    </div >
  );

};

