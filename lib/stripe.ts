import { loadStripe } from '@stripe/stripe-js'
import Stripe from 'stripe'

export const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2023-10-16'
})


export const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY as string)