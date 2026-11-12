/**
 * Germin8 — Razorpay Payment Gateway Helper
 * Provides order creation, HMAC-SHA256 signature verification, and refund handling.
 * In production, replace simulated responses with real Razorpay REST API calls.
 */

import crypto from "node:crypto";

export const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "rzp_test_Germin8Live2026";
export const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "rzp_secret_Germin8_2026_secure_key";

/**
 * Create a Razorpay order.
 * In production: POST https://api.razorpay.com/v1/orders
 * @param {number} amount - Amount in paise (INR smallest unit)
 * @param {string} currency - e.g. "INR"
 * @param {string} receipt - Unique receipt identifier
 * @returns {object} Razorpay order object
 */
export function createOrder(amount, currency = "INR", receipt = "") {
  // Simulate Razorpay order creation
  const orderId = `order_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
  return {
    id: orderId,
    entity: "order",
    amount,
    amount_paid: 0,
    amount_due: amount,
    currency,
    receipt: receipt || `rcpt_${Date.now()}`,
    status: "created",
    created_at: Math.floor(Date.now() / 1000),
    keyId: RAZORPAY_KEY_ID
  };
}

/**
 * Verify Razorpay payment signature using HMAC-SHA256.
 * Razorpay signs: orderId + "|" + paymentId with the key secret.
 * @param {string} orderId - razorpay_order_id from checkout
 * @param {string} paymentId - razorpay_payment_id from checkout
 * @param {string} signature - razorpay_signature from checkout
 * @param {string} secret - Razorpay key secret (defaults to env var)
 * @returns {boolean} true if signature is valid
 */
export function verifySignature(orderId, paymentId, signature, secret = RAZORPAY_KEY_SECRET) {
  if (!orderId || !paymentId || !signature) return false;
  const payload = `${orderId}|${paymentId}`;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  // Constant-time comparison to prevent timing attacks
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, "hex"),
      Buffer.from(signature.length === expected.length ? signature : expected, "hex")
    );
  } catch {
    return false;
  }
}

/**
 * Initiate a refund for a Razorpay payment.
 * In production: POST https://api.razorpay.com/v1/payments/:paymentId/refund
 * @param {string} paymentId - Razorpay payment ID to refund
 * @param {number} amount - Amount in paise to refund (optional; full refund if omitted)
 * @returns {object} Simulated refund object
 */
export function createRefund(paymentId, amount = null) {
  const refundId = `rfnd_${crypto.randomBytes(8).toString("hex")}`;
  return {
    id: refundId,
    entity: "refund",
    amount,
    currency: "INR",
    payment_id: paymentId,
    notes: {},
    receipt: null,
    acquirer_data: { arn: null },
    created_at: Math.floor(Date.now() / 1000),
    batch_id: null,
    status: "processed",
    speed_processed: "normal",
    speed_requested: "normal"
  };
}
