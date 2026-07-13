# Sassy Vintage Tee

A single-product pre-order landing page with Stripe Checkout integration for a graphic t-shirt brand.

## Description

This is a lightweight e-commerce landing page selling one t-shirt design ("Speak Your Mind. Wear Your Attitude.") in two colourways. Visitors can pre-order the black or white tee, which triggers a Stripe Checkout session for payment. The site also includes standard legal pages (refunds, privacy, terms).

## Tech Stack

- Node.js / Express (static file server + checkout API)
- Stripe (payment processing)
- Plain HTML/CSS front end

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Set the `STRIPE_SECRET_KEY` environment variable with your Stripe secret key.
3. Start the server:
   ```
   npm start
   ```
4. Visit `http://localhost:3000` (or the configured `PORT`) to view the site.

## Project Structure

- `index.html` / `preorder.html` — storefront and pre-order pages
- `terms.html`, `privacy.html`, `Refunds.html` — legal pages
- `server.js` — Express server and Stripe Checkout session creation
