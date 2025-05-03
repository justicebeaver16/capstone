const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

// Create transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Read email templates
const invitationTemplate = handlebars.compile(
  fs.readFileSync(path.join(__dirname, '../templates/invitation.html'), 'utf8')
);

const declineTemplate = handlebars.compile(
  fs.readFileSync(path.join(__dirname, '../templates/decline.html'), 'utf8')
);

const reminderTemplate = handlebars.compile(
  fs.readFileSync(path.join(__dirname, '../templates/reminder.html'), 'utf8')
);

// Send invitation email
exports.sendInvitation = async (email, name, eventTitle, eventDate, qrCode, rsvpUrl) => {
  const formattedDate = new Date(eventDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `You're Invited to ${eventTitle}!`,
    html: invitationTemplate({
      name,
      eventTitle,
      eventDate: formattedDate,
      qrCode,
      rsvpUrl
    }),
    attachments: [
      {
        filename: 'invitation-qr.png',
        content: qrCode.split('base64,')[1],
        encoding: 'base64'
      }
    ]
  };

  await transporter.sendMail(mailOptions);
};

// Send decline message with payment link
exports.sendDeclineMessage = async (email, name, eventTitle, paymentLink) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `We'll Miss You at ${eventTitle}`,
    html: declineTemplate({
      name,
      eventTitle,
      paymentLink
    })
  };

  await transporter.sendMail(mailOptions);
};

// Send RSVP reminder
exports.sendReminder = async (email, name, eventTitle, eventDate, qrCode, rsvpUrl) => {
  const formattedDate = new Date(eventDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Reminder: Please RSVP for ${eventTitle}`,
    html: reminderTemplate({
      name,
      eventTitle,
      eventDate: formattedDate,
      qrCode,
      rsvpUrl
    })
  };

  await transporter.sendMail(mailOptions);
};