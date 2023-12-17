'use client';

import { useStripe } from '@stripe/react-stripe-js';
import { MouseEventHandler, useState } from 'react';
import { useContext } from 'react';
import { StoreContext } from '@/lib/store';

const ModifySubscription = () => {
    const stripe = useStripe();
    const store = useContext(StoreContext);
    const [seats, setSeats] = useState('');
    const [updated, setUpdated] = useState(false);

    const handleSubmit = async (event: any) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe) {
            return;
        }

        const resp = await fetch('/api/modifySubscription', {
            method: 'POST',
            body: JSON.stringify({
                quantity: seats,
                subscription_id: store.subscriptionId,
                subscription_item_id: store.subscriptionItemId,
            })
        });

        if (resp.status === 201) {
            const { status, client_secret } = await resp.json();
            console.log(status);
            console.log(client_secret);

            if (status === 'requires_action') {
                const result = await stripe.handleNextAction({ clientSecret: client_secret });
                if (result.error) {
                    setUpdated(false);
                    console.log(result.error.message);
                } else {
                    setUpdated(true);
                    console.log('🔔 Payment succeeded!');
                }
            } else {
                return
            }
        } else {
            console.log(resp.status);
        }
    };

    return (
        <div>
            <div className='flex flex-col justify-center items-center space-y-2'>
                <input
                    type='number'
                    placeholder='3'
                    className='w-1/2 text-black rounded p-2'
                    onChange={(e) => setSeats(e.target.value)}
                />
                {
                    updated && <p className='text-green-400'>Subscription updated</p>
                }
                <button
                    className='p-2 rounded-lg bg-blue-700 m-auto w-1/2 hover:bg-blue-900'
                    disabled={!stripe}
                    onClick={handleSubmit}
                >
                    Update
                </button>
            </div>
        </div>
    )
};

export default ModifySubscription;