const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 4321,
  secure: false,
  ignoreTLS: true,
});

transporter.verify((err, success) => {
  if(err) {
    console.error('Error connecting to SMTP server:', err);
  } else {
    console.log('SMTP server is ready to take messages');
  }
});

(async () => {
  await transporter.sendMail({
    from: 'test@example.com',
    to: 'you@example.com',
    subject: 'Test Email from Node.js',
    text: 'Hello! This is a test email sent using Nodemailer via a local SMTP server.',
  }, (err, info) => {
    if(err) {
      console.error('Error occurred while sending email:', err);
    } else {
      console.log('Email sent successfully:', info.response);
      console.log('Info object:', info);
    }
  });
})();
