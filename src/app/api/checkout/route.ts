import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import Stripe from 'stripe';
import { client } from '@/sanity/lib/client';
import { v4 as uuidv4 } from 'uuid';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { userId } = getAuth(req as any);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { items, shippingAddress, sessionId, orderId } = await req.json();

    // ✅ If sessionId & orderId exist, update the order (Payment Success)
    if (sessionId && orderId) {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (!session || session.payment_status !== "paid") {
        return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
      }

      const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent as string);

      // ✅ Update Order in Sanity
      const updatedOrder = await client.patch(orderId).set({
        paymentStatus: "paid",
        paymentDetails: {
          id: paymentIntent.id,
          status: paymentIntent.status,
          amount: session.amount_total ? session.amount_total / 100 : 0,
          currency: session.currency,
        },
      }).commit();

      console.log("✅ Order updated:", updatedOrder);
      return NextResponse.json({ success: true, orderId: updatedOrder._id });
    }

    // ✅ Before creating order, ensure user exists in Sanity
    const existingUser = await client.fetch(`*[_type == "user" && _id == $userId][0]`, { userId });

    if (!existingUser) {
      await client.createIfNotExists({
        _id: userId,
        _type: "user",
      });
      console.log("✅ User created in Sanity:", userId);
    }

    // ✅ Create Order Before Payment
    const totalPrice = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

    const orderData = {
      _type: 'orders',
      user: { _type: 'reference', _ref: userId }, // Reference to user
      items: items.map((item: any) => ({
        _key: uuidv4(),
        _type: 'orderItem',
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image || null,
        slug: item.currentSlug,
      })),
      shippingAddress: { ...shippingAddress, _type: 'shippingAddress' },
      paymentStatus: 'not paid',
      total: totalPrice,
    };

    const createdOrder = await client.create(orderData);
    console.log("✅ Order saved in Sanity:", createdOrder);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: item.image?.asset?.url ? [item.image.asset.url] : [],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}&order_id=${createdOrder._id}`,
      cancel_url: `${req.headers.get('origin')}/cart`,
      metadata: {
        orderId: createdOrder._id,
      },
    });

    return NextResponse.json({ id: session.id });

  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message || 'Error processing request' }, { status: 500 });
  }
}
