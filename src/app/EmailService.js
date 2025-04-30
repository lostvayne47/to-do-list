import emailjs from "emailjs-com";

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const sendEmail = (
  recipient,
  productName,
  serialNumber,
  purchaseDate,
  expiryDate,
  websiteUrl
) => {
  const templateParams = {
    email: recipient, // The recipient's email address
    productName: productName,
    serialNumber: serialNumber,
    purchaseDate: purchaseDate,
    expiryDate: expiryDate,
    websiteUrl: websiteUrl,
  };

  emailjs
    .send(serviceId, templateId, templateParams, publicKey)
    .then((response) => {
      console.log("Email sent successfully:", response);
    })
    .catch((error) => {
      console.error("Error sending email:", error);
    });
};

// // Example usage
// sendEmail(
//   "aayushkamtikar@gmail.com", // recipient email address
//   "JBL Headphones", // product name
//   "EF235XXX", // serial number
//   "2022-01-01", // purchase date
//   "2023-01-01", // expiry date
//   "https://yourwebsite.com" // website URL
// );
export default sendEmail;
