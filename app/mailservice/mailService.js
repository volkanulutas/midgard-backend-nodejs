const nodemailer = require("nodemailer");

// Gmail transporter ayarı
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "midgardoffice@gmail.com",   // kendi gmail adresin
    pass: "ispw iqbr vypq kpxt"        // Google uygulama şifresi
  }
});

async function sendMail(messageData) {
  try {
    let info = await transporter.sendMail({
      from: `"Web Form" <midgardoffice@gmail.com>`,  // Gönderen
      to: "info@midgardoffice.com",                  // Nereye gidecek
      subject: messageData.subject,               // Konu
      text: `
        Yeni bir mesaj var!
        İsim: ${messageData.name}
        Telefon: ${messageData.telephone}
        Email: ${messageData.email}
        Konu: ${messageData.subject}
        Mesaj: ${messageData.content}
      `,
      html: `
        <h3>Yeni Mesaj</h3>
        <p><b>İsim:</b> ${messageData.name}</p>
        <p><b>Telefon:</b> ${messageData.telephone}</p>
        <p><b>Email:</b> ${messageData.email}</p>
        <p><b>Konu:</b> ${messageData.subject}</p>
        <p><b>Mesaj:</b> ${messageData.content}</p>
      `
    });

    console.log("Mail gönderildi: %s", info.messageId);
    return info;
  } catch (err) {
    console.error("Mail gönderilemedi:", err);
    throw err;
  }
}

module.exports = { sendMail };
