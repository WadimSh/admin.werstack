Для отправки электронной почты через Yandex SMTP-сервер, вы можете использовать библиотеку nodemailer. Вам также потребуется настроить SMTP-конфигурацию для Yandex.

Приведенный ниже пример кода включает основные элементы для отправки электронной почты с использованием Yandex SMTP, а также пример фронтенд-кода на React. Пожалуйста, учтите, что это всего лишь основа, и вы должны адаптировать его под свои потребности и безопасность.

Backend (Node.js с использованием Express):
Структура проекта:
java
Copy code
├── node_modules
├── src
│   ├── controllers
│   │   ├── authController.js
│   │   ├── emailController.js
│   ├── services
│   │   ├── authService.js
│   │   ├── emailService.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── emailRoutes.js
│   ├── models
│   │   ├── User.js
│   ├── middlewares
│   │   ├── authMiddleware.js
│   ├── utils
│   │   ├── validation.js
│   ├── app.js
├── package.json
Пример кода:
javascript
Copy code
// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const emailRoutes = require('./routes/emailRoutes');

mongoose.connect('mongodb://localhost:27017/crm', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/emails', emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
javascript
Copy code
// emailRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const emailController = require('../controllers/emailController');

router.post('/send', authMiddleware.authenticate, emailController.sendEmail);

module.exports = router;
javascript
Copy code
// emailController.js
const emailService = require('../services/emailService');

exports.sendEmail = async (req, res) => {
  try {
    const { to, subject, message } = req.body;
    await emailService.sendEmail(req.user.email, to, subject, message);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
javascript
Copy code
// emailService.js
const nodemailer = require('nodemailer');
const { emailTemplate } = require('../utils/emailTemplates');

exports.sendEmail = async (from, to, subject, message) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'your-yandex-email@yandex.ru',
      pass: 'your-yandex-password',
    },
  });

  const mailOptions = {
    from,
    to,
    subject,
    html: emailTemplate(message),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
Frontend (React.js):
Структура проекта:
java
Copy code
├── public
├── src
│   ├── components
│   │   ├── EmailForm.js
│   │   └── ...
│   ├── App.js
│   ├── index.js
├── package.json
Пример кода:
javascript
Copy code
// App.js
import React from 'react';
import EmailForm from './components/EmailForm';

function App() {
  return (
    <div className="App">
      <h1>Email Campaign Manager</h1>
      <EmailForm />
    </div>
  );
}

export default App;
javascript
Copy code
// EmailForm.js
import React, { useState } from 'react';
import axios from 'axios';

const EmailForm = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/emails/send', { to, subject, message });
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please check the console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} required />
      <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
      <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required />
      <button type="submit">Send Email</button>
    </form>
  );
};

export default EmailForm;
javascript
Copy code
// utils/emailTemplates.js
exports.emailTemplate = (message) => {
  // Customize the email template with the provided message
  return `
    <html>
      <body>
        <p>${message}</p>
      </body>
    </html>
  `;
};