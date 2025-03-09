import { Resend } from "resend";
import { NextResponse } from "next/server";
import ShippedEmail from "@/emails/ShippedEmail";
import ArrivedEmail from "@/emails/ArrivedEmail";
import CancelledEmail from "@/emails/CancelledEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, name, type, trackingNumber } = await req.json();

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
      case "cancelled":
        EmailComponent = CancelledEmail;
        subject = "❌ Your Package Has Been Cancelled";
        break;
      default:
        return NextResponse.json({ error: "Invalid email type" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "Salma Cargo <noreply@salmacargo.com>",
      to: email,
      subject,
      react: EmailComponent({ name, trackingNumber }),
    });

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
