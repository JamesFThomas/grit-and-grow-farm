export const SubscriptionConfirmationEmail = (logoContentId: string) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; color: #1f2419;">
    <img
      src="cid:${logoContentId}"
      alt="Grit And Grow Farm"
      width="200"
      height="122"
      style="display:block; width:200px; max-width:200px; height:122px; margin: 0 auto 28px auto;"
    />

    <h1 style="font-size: 22px; font-weight: 600; margin: 0 0 16px 0;">
      Welcome to the farm.
    </h1>

    <p>You're on the list, and we're glad to have you.</p>

    <p>
      Once a month we send a letter from the farm: what is in the ground, what
      is being harvested, what worked this season and what did not, along with
      recipes for cooking it once it reaches your kitchen.
    </p>

    <p>
      Our plan is to teach what we learn, because everybody should learn how to
      feed themselves.
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
