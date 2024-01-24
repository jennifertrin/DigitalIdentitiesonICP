import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Address, CryptoAddressDetails, FiatAddressDetails, PaymentInformation, getPayStringAsync } from '@the-registry/tir';

const PaystringComponent: React.FC = () => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInformation | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prefix = 'allidoizcode'; // Replace with name (which starts before $ in a paystring)
        const domain = 'upayed.me'; // Replace with domain (which starts after $ in a paystring)
        const options = {
          chain: 'icp', // Replace with the actual chain
          environment: 'mainnet', // Replace with the actual environment
        };
        const result = await getPayStringAsync(prefix, domain, options);
        setPaymentInfo(result || undefined);
      } catch (error) {
        console.error('Error fetching payment information:', error);
      }
    };
    fetchData();
  }, []);

  return paymentInfo ? (
    <React.StrictMode>
      <div>
        <h1>Payment Information</h1>
        <div><span>Full paystring:</span>{paymentInfo.payId}</div>
        <div>
          <span>ICP address:</span>
          <ul>
            {paymentInfo.addresses.map((address: Address) => (
              <li key={(address.addressDetails as CryptoAddressDetails).address || (address.addressDetails as FiatAddressDetails).accountNumber}>
                {address.addressDetailsType === 'CryptoAddressDetails' && 'address' in address.addressDetails
                  ? `Crypto Address: ${(address.addressDetails as CryptoAddressDetails).address}`
                  : `Fiat Account Number: ${(address.addressDetails as FiatAddressDetails).accountNumber} 'Routing Number': ${(address.addressDetails as FiatAddressDetails).routingNumber}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </React.StrictMode>
  ) : null;
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <PaystringComponent />
);
