import express from "express";
import Stripe from "stripe";
import { enrollment } from "../models/enrollment.model.js";
import { auth } from "../middleware/auth.middleware.js";
import { createCheckoutSession } from "../controllers/paymentController.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


router.post("/create", auth, createCheckoutSession);

// WEBHOOK 
router.post(
    "/webhook", async (req, res) => {
        const sig = req.headers["stripe-signature"];

        let event;

        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (err) {
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        if (event.type === "checkout.session.completed") {

            const session = event.data.object;

            const userId = session.metadata.userId;
            const courseId = session.metadata.courseId;

            let enroll = await enrollment.findOne({
                user: userId,
                courseID: courseId,
            });

            if (!enroll) {
                enroll = new enrollment({
                    user: userId,
                    courseID: courseId,
                    paymentStatus: "paid",
                });
            } else {
                enroll.paymentStatus = "paid";
            }

            await enroll.save();
        }

        res.json({ received: true });
    }
);

export default router; 