import emailjs from "emailjs-com";

const serviceId = "service_f7qub8t";
const templateId = "template_4gr7cwl";
const publicKey = "R4nRW5_8c-FEMPYgz";

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

  //   console.log(process.env.REACT_APP_EMAILJS_SERVICE_ID);
  //   console.log(process.env.REACT_APP_EMAILJS_TEMPLATE_ID);
  //   console.log(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);
  emailjs.init(publicKey); // ✅ Correct initialization

  emailjs
    .send(serviceId, templateId, templateParams)
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
