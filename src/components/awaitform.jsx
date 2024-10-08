import React, { useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';

import QRCode from 'qrcode.react';

export const AwaitForm = (props) => {
    const location = useLocation();
    const { transaction } = location.state || {};
    const [loading, setLoading] = useState(false)
    const [txid, setTXID] = useState('')
    const [contactInfo, setContactInfo] = useState('');
    const isCashApp = transaction.sendValue === 'cashapp' ? true : false;
    console.log(transaction);
    const handleSubmitTXID = () => {
        if (!txid) {
            toast.error('You must enter the TXID');
            return;
        }
        setLoading(true)
        transaction.txid = txid;
        transaction.contactInfo = contactInfo;
        axios.post(`${process.env.REACT_APP_API_URL}/create-txid`, {
            txidData: transaction
        }).then(() => {

            try {
                const subject = 'New Transaction Requested';
                const text = `${contactInfo} requested ${transaction.amount} ${transaction.sendValue}  exchanging into ${transaction.recieveValue}.
            Here is TXID - ${txid} 
            Here is the user's contact info.
            Desired platform Username/Address: ${transaction.userName}
            Contact Info : ${contactInfo}
            `;
                axios.post(`${process.env.REACT_APP_API_URL}/send-email`, {
                    recipient: 'aaditakula2@gmail.com',
                    subject: subject,
                    text: text
                });
                setLoading(false)
                setTXID('')
            } catch (error) {
                console.error('Error sending email:', error);
                alert('Failed to send email');
            }
            console.log('success');

            toast("Please wait for your exchange to be automated");

        }).catch(function (error) {
            console.log(error)
        });
    };

    const cryptoURI = `bitcoin:bc1qrlskgumqmukj40fa8ysk94uz9vk4rwyq9ajqqf?amount=${transaction.amount}&label=Awaiting Deposit and Sending to you`;



    return (
        <div className="container">
            <div className="awaitform">
                <ToastContainer />
                <div className="transactionID">
                    {/* <label htmlFor="">TransactionID : asdlfjlasdjflasjflkasf{transaction.id}</label> */}
                </div>
                <br />
                <div className="awaitcontent">
                    <label htmlFor="" className="description">
                        Please send the funds you would like to exchange
                    </label>
                    <a className='btn btn-standard' href="/" style={{ float: 'right' }} >Back
                    </a>
                    <br />
                    <br />

                    <div className="qrsection row">
                        <div className="col col-md-6">
                            <p htmlFor="">Amount</p>
                            <h4>{transaction.amount} {transaction.sendValue} ($ {transaction.usdValue})</h4>
                            <p htmlFor="">To the Address</p>
                            <h6>bc1qrlskgumqmukj40fa8ysk94uz9vk4rwyq9ajqqf</h6>
                            <div className='send-label'>
                                <p htmlFor="recipientAddress">{isCashApp ? ('Enter Your Web Receipt') : ('Enter Your TXID')}</p>
                            </div>
                            <div className="input-group mb-3" >
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    aria-label="Text input"
                                    placeholder='f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16'
                                    onChange={(e) => { setTXID(e.target.value) }}
                                    value={txid}
                                    style={{ height: '30px' }}
                                />
                            </div>
                            <div className='send-label'>
                                <p htmlFor="recipientAddress">Enter your  Discord Username or Email Address</p>
                            </div>
                            <div className="input-group mb-3" >
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    aria-label="Text input"
                                    placeholder='joe@gmail.com'
                                    onChange={(e) => { setContactInfo(e.target.value) }}
                                    value={contactInfo}
                                    style={{ height: '30px' }}
                                />
                            </div>
                            <br />
                            <button className='btn btn-primary  gradient-border-button' onClick={handleSubmitTXID} >Submit
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
                            <br />

                        </div>
                        <div className="col col-md-6 qrcode">
                            <QRCode value={cryptoURI} size={200} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
