const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');
const documentRouter = require('./routers/documentRouter');
const onboardingRouter = require('./routers/onboardingRouter');
const visaStatusRouter = require('./routers/visaStatusRouter');
const notificationRouter = require('./routers/notificationRouter');
const registrationRouter = require('./routers/registrationRouter');
const connectDB = require('./database');
const port = 8000;

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/documents', documentRouter);
app.use('/api/onboarding', onboardingRouter);
app.use('/api/visa-statuses', visaStatusRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/registration', registrationRouter);
app.use('/uploads', express.static('uploads')); // dowload url: http://localhost:8000/uploads/filename
app.use('/downloads', express.static('downloads'));


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});