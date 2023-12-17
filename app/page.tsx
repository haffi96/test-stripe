'use client';
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '@/lib/stripe'
import PaymentForm from './components/PaymentForm'
import CustomerForm from './components/CustomerForm';
import ModifySubscription from './components/ModifySubscription';
import { useStore, StoreContext } from '@/lib/store';
import BillingPortal from './components/BillingPortal';


export default function Home() {
    const store = useStore();
    return (
        <main className="flex flex-col justify-center items-center w-full">
            <div className="m-auto w-2/3 lg:p-10">
                <StoreContext.Provider value={store}>
                    <Elements stripe={stripePromise}>
                        <div className='space-y-5'>
                            <CustomerForm />
                            <p>------------</p>
                            <PaymentForm />
                            <ModifySubscription />
                            <BillingPortal />
                        </div>
                    </Elements>
                </StoreContext.Provider>
            </div>
        </main>
    )
}
