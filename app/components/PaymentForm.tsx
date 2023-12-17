'use client';

import { StoreContext } from '@/lib/store';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useContext, useState } from 'react';
import { CircularProgress } from '@mui/material';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const store = useContext(StoreContext);
    const [added, setAdded] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardNumberElement);

        const result = await stripe.confirmCardPayment(store.createSubClientSecret, {
            payment_method: {
                card: cardElement!,
                billing_details: {
                    address: {
                        line1: "16 Lindis Road",
                        postal_code: "pe219rs",
                        city: "boston",
                        state: "lincolnshire",
                        country: "UK"
                    }
                }
            }
        });


        if (result.error) {
            console.log(result.error.message);
            setAdded(false);
        } else {
            console.log(result);
            setLoading(false);
            setAdded(true);
        }
    };

    return (
        <div>
            {
                added ? <p className='text-green-400'>Card payment confirmed</p> :
                    <form onSubmit={handleSubmit} className='flex flex-col w-full outline-dotted rounded-lg p-5 space-y-5'>
                        <p>Card information</p>
                        {
                            elements && (
                                <div className='w-full space-y-2'>
                                    <CardNumberElement className='bg-white w-full p-2 rounded' />
                                    <CardExpiryElement className='bg-white w-full p-2 rounded' />
                                    <CardCvcElement className='bg-white w-full p-2 rounded' />
                                </div>
                            )
                        }
                        <div className='flex flex-col'>
                            <button
                                className='p-2 rounded-lg bg-blue-700 hover:bg-blue-900'
                                disabled={!stripe}
                            >
                                Subscribe
                            </button>
                            {
                                loading && <CircularProgress />
                            }
                        </div>
                    </form >
            }
        </div>
    )
};

export default PaymentForm;