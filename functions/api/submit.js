export async function onRequestPost(context) {

  try {

    const formData = await context.request.formData();

    const name = String(
      formData.get("name") || ""
    ).trim();

    const email = String(
      formData.get("email") || ""
    ).trim();

    const service = String(
      formData.get("service") || ""
    ).trim();

    const message = String(
      formData.get("project-description") || ""
    ).trim();

    const file = formData.get("project-file");


    /* =========================
       VALIDATION
       ========================= */

    if (!name || !email || !service || !message) {

      return jsonResponse(
        {
          success: false,
          message: "Please complete all required fields."
        },
        400
      );

    }


    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

      return jsonResponse(
        {
          success: false,
          message: "Please enter a valid email address."
        },
        400
      );

    }


    const validServices = [
      "3D Printing",
      "3D Modeling",
      "3D Modeling + Printing"
    ];

    if (!validServices.includes(service)) {

      return jsonResponse(
        {
          success: false,
          message: "Invalid service selected."
        },
        400
      );

    }


    /* =========================
       FILE
       ========================= */

    let attachment = null;

    if (
      file &&
      typeof file.size === "number" &&
      file.size > 0
    ) {

      const fileName = String(
        file.name || ""
      );

      const lowerFileName =
        fileName.toLowerCase();


      const validExtension =
        lowerFileName.endsWith(".stl") ||
        lowerFileName.endsWith(".3mf");


      if (!validExtension) {

        return jsonResponse(
          {
            success: false,
            message:
              "Only STL and 3MF files are allowed."
          },
          400
        );

      }


      const maxSize =
        15 * 1024 * 1024;


      if (file.size > maxSize) {

        return jsonResponse(
          {
            success: false,
            message:
              "The file must be smaller than 15 MB."
          },
          400
        );

      }


      const arrayBuffer =
        await file.arrayBuffer();

      const bytes =
        new Uint8Array(arrayBuffer);

      let binary = "";

      const chunkSize = 0x8000;


      for (
        let i = 0;
        i < bytes.length;
        i += chunkSize
      ) {

        const chunk =
          bytes.subarray(
            i,
            Math.min(
              i + chunkSize,
              bytes.length
            )
          );

        binary += String.fromCharCode(
          ...chunk
        );

      }


      const base64 =
        btoa(binary);


      attachment = {
        filename: fileName,
        content: base64
      };

    }


    /* =========================
       EMAIL
       ========================= */

    const safeName =
      escapeHtml(name);

    const safeEmail =
      escapeHtml(email);

    const safeService =
      escapeHtml(service);

    const safeMessage =
      escapeHtml(message)
        .replace(/\n/g, "<br>");


    const emailData = {

      from:
        "NordLab <onboarding@resend.dev>",

      to: [
        "arturodburin95@gmail.com"
      ],

      subject:
        `NordLab inquiry — ${service}`,

      html: `

        <div style="
          font-family: Arial, sans-serif;
          max-width: 700px;
          margin: 0 auto;
          color: #222;
        ">

          <h2>
            New NordLab Inquiry
          </h2>

          <p>
            <strong>Name</strong><br>
            ${safeName}
          </p>

          <p>
            <strong>Email</strong><br>
            ${safeEmail}
          </p>

          <p>
            <strong>Service</strong><br>
            ${safeService}
          </p>

          <hr>

          <p>
            <strong>Project details</strong>
          </p>

          <p>
            ${safeMessage}
          </p>

          <hr>

          <p style="color:#777">

            <strong>Attachment:</strong>

            ${
              attachment
                ? escapeHtml(
                    attachment.filename
                  )
                : "None"
            }

          </p>

        </div>

      `
    };


    if (attachment) {

      emailData.attachments = [
        attachment
      ];

    }


    /* =========================
       RESEND
       ========================= */

      console.log(
      "RESEND_API_KEY:",
      context.env.RESEND_API_KEY
        ? `exists (${context.env.RESEND_API_KEY.length} chars)`
        : "MISSING"
    );

    const response = await fetch(
      "https://api.resend.com/emails",
      {

        method: "POST",

        headers: {

          "Authorization":
            `Bearer ${context.env.RESEND_API_KEY}`,

          "Content-Type":
            "application/json"

        },

        body:
          JSON.stringify(emailData)

      }
    );


    const result =
      await response.json();


    if (!response.ok) {

  console.error("Resend error:", result);

  return jsonResponse(
    {
      success: false,
      message:
        result?.message ||
        result?.error ||
        "Unable to send the message."
    },
    500
  );

}


    return jsonResponse(
      {
        success: true,
        message:
          "Message sent successfully."
      },
      200
    );


  } catch (error) {

    console.error(
      "Contact form error:",
      error
    );

    return jsonResponse(
      {
        success: false,
        message:
          "Something went wrong. Please try again."
      },
      500
    );

  }

}


/* =========================
   HELPERS
   ========================= */

function jsonResponse(data, status = 200) {

  return new Response(
    JSON.stringify(data),
    {

      status,

      headers: {
        "Content-Type":
          "application/json"
      }

    }
  );

}


function escapeHtml(value) {

  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}