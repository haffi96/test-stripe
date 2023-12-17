'use client';

import { useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useContext } from 'react';
import { StoreContext } from '@/lib/store';

const PaymentForm = () => {
    const stripe = useStripe();
    const store = useContext(StoreContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [subscriptionId, setSubscriptionId] = useState('');
    const [subscriptionItemId, setSubscriptionItemId] = useState('');
    const [clientSecret, setClientSecret] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        const formData = new FormData()
        formData.append('name', name);
        formData.append('email', email);


        if (!stripe) {
            return;
        }

        const resp = await fetch('/api/createCustomer', {
            method: 'POST',
            body: formData
        });

        if (resp.status === 201) {
            const data = await resp.json();
            setCustomerId(data.customer_id);
            setSubscriptionId(data.subscription_id);
            setSubscriptionItemId(data.subscription_item_id);
            setClientSecret(data.client_secret);


            store.customerId = data.customer_id;
            store.subscriptionId = data.subscription_id;
            store.subscriptionItemId = data.subscription_item_id;
            store.createSubClientSecret = data.client_secret;
        } else {
            console.log(resp.status);
        }
    };

    return (
        <div>
            {
                customerId && subscriptionId ? (
                    <div>
                        <p> Customer ID: {customerId}</p>
                        <p> Subscription ID: {subscriptionId}</p>
                        <p> Subscription Item ID: {subscriptionItemId}</p>
                        <p> Client Secret: {clientSecret}</p>
                    </div>
                ) :
                    <form onSubmit={handleSubmit} className='flex flex-col w-full outline-dotted rounded-lg p-5 space-y-5'>
                        <p>
                            Customer Information
                        </p>
                        <input type='text' placeholder='Name' className='w-full text-black p-1 rounded' onChange={(e) => setName(e.target.value)} />
                        <input type='email' placeholder='Email' className='w-full text-black text-sm p-2 rounded' onChange={(e) => setEmail(e.target.value)} />
                        <button className='p-2 rounded-lg bg-blue-700' disabled={!stripe}>Submit</button>
                    </form >
            }
        </div>
    )
};

export default PaymentForm;