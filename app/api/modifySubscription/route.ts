import type { NextApiResponse } from 'next'
import { stripeClient } from '@/lib/stripe'

export async function POST(req: Request, res: NextApiResponse) {
    const { quantity, subscription_id, subscription_item_id } = await req.json();

    const subscription = await stripeClient.subscriptions.update(subscription_id, {
        payment_behavior: 'pending_if_incomplete',
        proration_behavior: 'always_invoice',
        items: [
            {
                id: subscription_item_id,
                quantity: quantity,
            },
        ],
        expand: ['latest_invoice.payment_intent'],
    });

    return Response.json(
        {
            // @ts-ignore
            status: subscription?.latest_invoice?.payment_intent.status,
            // @ts-ignore
            client_secret: subscription?.latest_invoice?.payment_intent.client_secret,
        },
        {
            status: 201,
        },
    );
}