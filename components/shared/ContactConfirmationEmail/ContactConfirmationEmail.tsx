export const ContactConfirmationEmail = (
  logoContentId: string,
  firstName: string,
) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; color: #1f2419;">
    <img
      src="cid:${logoContentId}"
      alt="Grit And Grow Farm"
      width="200"
      height="122"
      style="display:block; width:200px; max-width:200px; height:122px; margin: 0 auto 28px auto;"
    />

    <h1 style="font-size: 22px; font-weight: 600; margin: 0 0 16px 0;">
      Thanks for reaching out.
    </h1>

    <p>Hi ${firstName}, your message reached the farm and we will get back to you.</p>

    <p>
      We are a two person operation working the field most days, so a reply may
      take a little longer than it would from a business with someone at a desk.
      It is coming.
    </p>

    <hr style="border:none; border-top:1px solid #4a6b3a; margin: 28px 0 20px 0;" />

    <p style="color:#4a6b3a; font-weight:600; letter-spacing:0.04em; margin:0 0 20px 0;">
      Grow it. Cook it. Share it.
    </p>

    <p style="margin:0;">
      See you at the table,<br />
      <strong>James and Kayla Thomas</strong><br />
      <span style="color:#6b6559;">Grit And Grow Farm &middot; Byram, Mississippi</span>
    </p>
  </div>
`;
