import { ContactConfirmationEmail } from "@/components/shared/ContactConfirmationEmail/ContactConfirmationEmail";
import { SubmissionNotificationEmail } from "@/components/shared/SubmissionNotificationEmail/SubmissionNotificationEmail";
import { notificationRecipients } from "@/lib/email/client";
import { sendSubmissionEmails, type SubmissionEmail } from "@/lib/email/send";
import { isHoneypotFilled, isSameOrigin } from "@/lib/security/formGuards";
import path from "path";
import fs from "fs";
import type { NextRequest } from "next/server";

// fs is used to read the lockup off disk, so this route cannot run on edge.
export const runtime = "nodejs";

type GoogleSheetsResponse = {
  status: "success" | "error";
};

// Recorded against the row in the shared spreadsheet, so one Contacts tab can
// hold every site's entries. Convention across the sites: slimkat_,
// foundation_, farm_.
const submissionType = "farm_contact";

const googleSheetsEndpoint =
  "https://script.google.com/macros/s/AKfycbxMKuWhC3PoJjj1t00WmwRaBy3K-a37eDx6x1D3gmCYdNEvDcBRBr1Dp1RYc8Z_yvoDCg/exec";

const sender = "Grit And Grow Farm <no-reply@gritandgrowfarm.com>";

// Read once at module load rather than per request. Attached and referenced by
// content id rather than by URL, so the lockup always renders even in clients
// that block remote images.
const logoPath = path.join(
  process.cwd(),
  "public",
  "logo",
  "gg-lockup-full-name-tight.png",
);

const logoAttachment = fs.readFileSync(logoPath).toString("base64");

// Shown in the notification email, so the team reads "Wholesale" rather than
// the value stored in the sheet.
const serviceLabels: Record<string, string> = {
  general: "General question",
  delivery: "Delivery",
  wholesale: "Wholesale",
  events: "Classes and events",
};

const errorResponse = (status: number, message: string) =>
  new Response(JSON.stringify({ status: "error", message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const successResponse = (message: string) =>
  new Response(JSON.stringify({ status: "success", message }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

export async function POST(request: NextRequest) {
  try {
    // 1) Turn away anything that is not a browser on this site. The only one
    //    of these checks a scripted POST cannot satisfy.
    if (!isSameOrigin(request)) {
      console.warn("CONTACT_REJECTED_ORIGIN", {
        origin: request.headers.get("origin"),
      });

      return errorResponse(403, "Contact submission failed");
    }

    const body = await request.json().catch(() => null);

    // 2) Answered as a success so a bot learns nothing, while no row is
    //    written and no email is sent. Logged so the volume is visible.
    if (isHoneypotFilled(body)) {
      console.warn("CONTACT_REJECTED_HONEYPOT");

      return successResponse("Contact submission successful");
    }

    const firstName = body?.firstName;
    const lastName = body?.lastName;
    const email = body?.email;
    const phone = body?.phone ?? "";
    const service = body?.service;
    const message = body?.message;

    // 3) Validate the required fields. Phone is the one optional field.
    if (!firstName || !lastName || !email || !service || !message) {
      return errorResponse(400, "Missing required fields");
    }

    // 4) Call Apps Script from the server, so there is no browser CORS. The
    //    key names match the Contacts tab's columns, shared with the other
    //    two sites.
    const upstreamResponse = await fetch(googleSheetsEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: submissionType,
        firstName,
        lastName,
        email,
        phone,
        service,
        message,
      }),
      cache: "no-store",
    });

    // 5) Read text first so a non-JSON response can be logged and handled
    //    cleanly rather than thrown.
    const upstreamText = await upstreamResponse.text();

    if (!upstreamResponse.ok) {
      console.error("Apps Script error", {
        status: upstreamResponse.status,
        statusText: upstreamResponse.statusText,
        body: upstreamText,
      });

      return errorResponse(502, "Contact submission failed");
    }

    let upstreamJson: GoogleSheetsResponse | null = null;

    try {
      upstreamJson = JSON.parse(upstreamText) as GoogleSheetsResponse;
    } catch {
      console.error("Apps Script returned non-JSON success response", {
        status: upstreamResponse.status,
        body: upstreamText,
      });

      return errorResponse(502, "Contact submission failed");
    }

    if (upstreamJson?.status !== "success") {
      console.error(
        "Apps Script responded without success status",
        upstreamJson,
      );

      return errorResponse(502, "Contact submission failed");
    }

    // 6) The row is recorded, so now send the emails raised by it. Sending
    //    happens here rather than from the browser, so there is no public
    //    endpoint that will send mail to an arbitrary address on request.
    const emails: SubmissionEmail[] = [
      {
        from: sender,
        to: email,
        subject: "Grit And Grow Farm: we got your message",
        html: ContactConfirmationEmail("gg_lockup", String(firstName)),
        attachments: [
          {
            content: logoAttachment,
            filename: "gg-lockup-full-name-tight.png",
            contentId: "gg_lockup",
          },
        ],
      },
    ];

    const recipients = notificationRecipients();

    if (recipients.length > 0) {
      emails.push({
        from: sender,
        to: recipients,
        // Replying in Outlook answers the sender rather than the mailbox.
        replyTo: email,
        subject: "New message from gritandgrowfarm.com",
        html: SubmissionNotificationEmail("New Farm Message", [
          { label: "Name", value: `${firstName} ${lastName}` },
          { label: "Email", value: String(email) },
          { label: "Phone", value: phone ? String(phone) : "Not given" },
          {
            label: "About",
            value: serviceLabels[String(service)] ?? String(service),
          },
          { label: "Message", value: String(message) },
        ]),
      });
    }

    await sendSubmissionEmails("CONTACT", emails);

    return successResponse("Contact submission successful");
  } catch (error) {
    console.error("Error processing contact submission:", error);

    return errorResponse(500, "Contact submission failed");
  }
}
