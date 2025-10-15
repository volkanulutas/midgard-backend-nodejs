import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

// Gmail transporter ayarı
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "midgardoffice@gmail.com",   // kendi gmail adresin
    pass: "ispw iqbr vypq kpxt"        // Google uygulama şifresi
  }
});

async function sendMail(messageData) {

   const msg = {
    to: "volkanulutas@gmail.com", 
    from: "midgardoffice@gmail.com",
    subject: messageData.subject,
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
  };

  try {
    await sgMail.send(msg);
    console.log("Email başarıyla gönderildi!");
  } catch (error) {
    console.error("Email gönderilirken hata:", error);
    if (error.response) console.error(error.response.body);
  }
  
}

module.exports = { sendMail };
