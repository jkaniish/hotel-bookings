import Stripe from "stripe";
import Booking from "../models/Booking.js";

// API to handle Stripe Webhooks
// POST /api/stripe
export const stripeWebhooks = async (request, response) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const event = stripe.webhooks.constructEvent(
      request.body,
      request.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const bookingId = session.metadata?.bookingId;

      if (bookingId) {
        await Booking.findByIdAndUpdate(bookingId, {
          isPaid: true,
          status: "confirmed",
          paymentMethod: "Stripe",
        });
      }
    }

    return response.json({ received: true });
  } catch (err) {
    console.error("Stripe webhook error:", err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }
};
