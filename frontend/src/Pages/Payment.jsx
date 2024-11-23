import React, { useState, useEffect,useContext } from 'react';
import { useLocation ,useNavigate} from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCreditCard, FaUniversity, FaWallet, FaCheck } from 'react-icons/fa';
import '../Pages/CSS/Payment.css';
import { ShopContext } from '../Context/ShopContext';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount } = location.state || { totalAmount: 0 };
  const { clearCart } = useContext(ShopContext);

  const [paymentAmount, setPaymentAmount] = useState(totalAmount);
  const [paymentDescription, setPaymentDescription] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentDestination, setPaymentDestination] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [bankNumber, setBankNumber] = useState('');
  const [bankPassword, setBankPassword] = useState('');
  const [walletPin, setWalletPin] = useState('');

  const paymentMethods = [
    { id: 'card', name: 'Credit Card', icon: <FaCreditCard /> },
    { id: 'bank', name: 'Bank Transfer', icon: <FaUniversity /> },
    { id: 'wallet', name: 'Digital Wallet', icon: <FaWallet /> },
  ];
  const bankOptions = ['Bank A', 'Bank B', 'Bank C', 'Bank D', 'Bank E'];
  const walletOptions = ['Wallet X', 'Wallet Y', 'Wallet Z', 'Wallet A', 'Wallet B'];

  useEffect(() => {
    setPaymentAmount(totalAmount);
  }, [totalAmount]);

  const handlePayment = async () => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0 || !paymentDestination) {
      setPaymentError('Please enter valid amount and payment destination.');
      return;
    }

    setIsLoading(true);
    setPaymentError(null);

    
    setTimeout(() => {
      setIsLoading(false);
      setPaymentSuccess(true);
      clearCart();
    }, 2000);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'amount':
        if (!isNaN(value) && parseFloat(value) >= 0) {
          setPaymentAmount(value);
          setPaymentError(null);
        }
        break;
      case 'description':
        setPaymentDescription(value);
        break;
      case 'method':
        setPaymentMethod(value);
        break;
      case 'destination':
        setPaymentDestination(value);
        break;
      case 'bank':
        setSelectedBank(value);
        setBankNumber('');
        setBankPassword('');
        break;
      case 'wallet':
        setSelectedWallet(value);
        setWalletPin('');
        break;
      case 'cardNumber':
        setCardNumber(value);
        break;
      case 'expiryDate':
        setExpiryDate(value);
        break;
      case 'cvv':
        setCvv(value);
        break;
      case 'bankNumber':
        setBankNumber(value);
        break;
      case 'bankPassword':
        setBankPassword(value);
        break;
      case 'walletPin':
        setWalletPin(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="payment-container">
      <AnimatePresence>
        {!paymentSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="payment-form"
          >
            <h2 className="payment-title">Make a Payment</h2>
            <div className="payment-field">
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={paymentAmount}
                onChange={handleInputChange}
                placeholder="Enter amount"
                required
              />
            </div>
            <div className="payment-field">
              <label htmlFor="description">Address:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={paymentDescription}
                onChange={handleInputChange}
                placeholder="Enter Your Address"
              />
            </div>
            <div className="payment-field">
              <label htmlFor="destination">Payment Destination:</label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={paymentDestination}
                onChange={handleInputChange}
                placeholder="Enter payment destination"
                required
              />
            </div>
            <div className="payment-method">
              <label>Payment Method:</label>
              <div className="payment-method-options">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    className={`payment-method-button ${paymentMethod === method.id ? 'active' : ''}`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    {method.icon}
                    <span>{method.name}</span>
                  </button>
                ))}
              </div>
            </div>
            {paymentMethod === 'card' && (
              <div className="payment-details">
                <div className="payment-field">
                  <label htmlFor="cardNumber">Card Number:</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={cardNumber}
                    onChange={handleInputChange}
                    placeholder="Enter card number"
                  />
                </div>
                <div className="payment-field-group">
                  <div className="payment-field">
                    <label htmlFor="expiryDate">Expiry Date:</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YYYY"
                    />
                  </div>
                  <div className="payment-field">
                    <label htmlFor="cvv">CVV:</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={cvv}
                      onChange={handleInputChange}
                      placeholder="Enter CVV"
                    />
                  </div>
                </div>
              </div>
            )}
            {paymentMethod === 'bank' && (
              <div className="payment-details">
                <div className="payment-field">
                  <label htmlFor="bank">Select Bank:</label>
                  <select
                    id="bank"
                    name="bank"
                    value={selectedBank}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Bank</option>
                    {bankOptions.map((bank, index) => (
                      <option key={index} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedBank && (
                  <>
                    <div className="payment-field">
                      <label htmlFor="bankNumber">Bank Account Number:</label>
                      <input
                        type="text"
                        id="bankNumber"
                        name="bankNumber"
                        value={bankNumber}
                        onChange={handleInputChange}
                        placeholder="Enter bank account number"
                      />
                    </div>
                    <div className="payment-field">
                      <label htmlFor="bankPassword">Bank Password:</label>
                      <input
                        type="password"
                        id="bankPassword"
                        name="bankPassword"
                        value={bankPassword}
                        onChange={handleInputChange}
                        placeholder="Enter bank password"
                      />
                    </div>
                  </>
                )}
              </div>
            )}
            {paymentMethod === 'wallet' && (
              <div className="payment-details">
                <div className="payment-field">
                  <label htmlFor="wallet">Select Wallet:</label>
                  <select
                    id="wallet"
                    name="wallet"
                    value={selectedWallet}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Wallet</option>
                    {walletOptions.map((wallet, index) => (
                      <option key={index} value={wallet}>
                        {wallet}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedWallet && (
                  <div className="payment-field">
                    <label htmlFor="walletPin">Wallet PIN:</label>
                    <input
                      type="password"
                      id="walletPin"
                      name="walletPin"
                      value={walletPin}
                      onChange={handleInputChange}
                      placeholder="Enter wallet PIN"
                    />
                  </div>
                )}
              </div>
            )}
            {paymentError && <p className="payment-error">{paymentError}</p>}
            <button
              onClick={handlePayment}
              className={`payment-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Pay Now'}
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="payment-success"
          >
            <div className="success-icon">
              <FaCheck />
            </div>
            <h2>Thank You!</h2>
            <p>Your payment was successful.</p>
            <p>Amount: ₹{paymentAmount}</p>
            <p>Address: {paymentDescription}</p>

            <button onClick={() => {setPaymentSuccess(false);
            navigate('/');
            }} className="payment-button">
              Make Another Payment
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Payment;

