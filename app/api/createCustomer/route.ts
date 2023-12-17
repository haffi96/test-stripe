import type { NextApiResponse } from 'next'
import { stripeClient } from '@/lib/stripe'

export async function POST(req: Request, res: NextApiResponse) {
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    const customer = await stripeClient.customers.create({
        name: name,
        email: email,
    });

    const subscription = await stripeClient.subscriptions.create({
        customer: customer.id,
        payment_behavior: 'default_incomplete',
        payment_settings: {
            save_default_payment_method: 'on_subscription'
        },
        items: [
            {
                price: 'price_1ONxCpIUeyQYXqSCKQoC9ROb',
            },
        ],
        expand: ['latest_invoice.payment_intent'],
    });

    return Response.json(
        {
            customer_id: customer.id,
            name: customer.name,
            email: customer.email,
            subscription_id: subscription.id,
            subscription_item_id: subscription.items.data[0].id,
            // @ts-ignore
            client_secret: subscription?.latest_invoice?.payment_intent.client_secret,
        },
        {
            status: 201,
        },
    );
}