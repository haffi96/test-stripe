import { StoreContext } from '@/lib/store';
import React, { useContext } from 'react'
import { stripeClient } from '@/lib/stripe';

export default function BillingPortal() {
    const store = useContext(StoreContext);

    const handleCreatePortal = async () => {
        if (!stripeClient) {
            return;
        }

        const session = await stripeClient.billingPortal.sessions.create({
            customer: store.customerId,
        });

        window.open(session.url);
    }

    return (
        <div>
            {
                <button
                    className='p-2 rounded-lg bg-zinc-400 hover:bg-zinc-600'
                    onClick={handleCreatePortal}>
                    Go to customer portal
                </button>
            }
        </div>
    )
}
