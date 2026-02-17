// server.js
const express = require('express');
const path = require('path');
const Stripe = require('stripe');

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // set in Railway

const PORT = process.env.PORT || 3000;

// Serve static files (index.html, images, other pages)
app.use(express.static(path.join(__dirname)));

app.use(express.json());

// One tee, two colours, same price ($34.95)
const PRODUCTS = {
  'tee-black': {
    name: 'Sassy Vintage Tee – Black',
    price_cents: 3495,
  },
  'tee-white': {
    name: 'Sassy Vintage Tee – White',
    price_cents: 3495,
  },
};

// Create Stripe Checkout Session
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { productId } = req.body;
    const product = PRODUCTS[productId];

    if (!product) {
      return res.status(400).json({ error: 'Invalid product' });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: product.name,
              description:
                'Limited pre‑order tee. Orders go to print end of February 2026 and are expected to ship in the second week of March 2026.',
            },
            unit_amount: product.price_cents,
          },
          quantity: 1,
        },
      ],
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['AU'],
      },
      success_url: `${process.env.BASE_URL}/?success=true`,
      cancel_url: `${process.env.BASE_URL}/?canceled=true`,
      metadata: {
        productId,
        drop: 'Feb-2026-preorder',
      },
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error('Stripe session error', err);
    res.status(500).json({ error: 'Unable to create checkout session' });
  }
});

// Basic fallback route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
