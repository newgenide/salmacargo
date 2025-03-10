import { Resend } from "resend";
import { NextResponse } from "next/server";
import ShippedEmail from "@/emails/ShippedEmail";
import ArrivedEmail from "@/emails/ArrivedEmail";
import CancelledEmail from "@/emails/CancelledEmail";
import DamagedEmail from "@/emails/DamagedEmail";
import OnHoldEmail from "@/emails/OnHoldEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ email, name, type, trackingNumber, pdfBuffer }:{
    email: string;
    name: string;
    type: 'shipped' | 'arrived' | 'damaged' | 'on hold';
    trackingNumber: string;
    pdfBuffer?: Buffer
}) {
  try {
    let EmailComponent;
    let subject;

    switch (type) {
      case "shipped":
        EmailComponent = ShippedEmail;
        subject = "📦 Your Package Has Been Shipped!";
        break;
      case "arrived":
        EmailComponent = ArrivedEmail;
        subject = "✅ Your Package Has Arrived!";
        break;
      case "on hold":
        EmailComponent = OnHoldEmail;
        subject = "📦 Your Package Is On Hold";
        break;
      case "damaged":
        EmailComponent = DamagedEmail;
        subject = "❌ Your Package Was Damaged";
        break;
      default:
        throw new Error("Invalid email type");
    }


    const { data, error } = await resend.emails.send({
      from: "Salma Cargo <noreply@salmacargo.com>",
      to: email,
      subject,
      react: EmailComponent({ name, trackingNumber }),
      attachments: type === 'shipped'
      ?  [
        {
          filename: `Shipment_Receipt_${trackingNumber}.pdf`,
          content: pdfBuffer?.toString("base64"), // Convert buffer to base64 string
          contentType: "application/pdf",
        },
      ]
      :[]
    });

    if (error) throw error;

    return { success: true, data };
  } catch (error:any) {
    console.log(error)
    return { error: error.message };
  }
}
