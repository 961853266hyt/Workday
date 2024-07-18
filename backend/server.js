const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');
const documentRouter = require('./routers/documentRouter');
const onboardingRouter = require('./routers/onboardingRouter');
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
app.use('/uploads', express.static('uploads')); // dowload url: http://localhost:8000/uploads/filename

// Define some fake data
// const fakeEmployees = [
//   {
//     id: '1',
//     name: 'John Doe',
//     workAuthorization: {
//       title: 'Software Engineer',
//       startDate: new Date('2022-01-01'),
//       endDate: new Date('2023-01-01'),
//     },
//     daysRemaining: 180,
//     nextStep: 'Submit next document',
//     visaStatusId: '101',
//     onboardingApplication: {
//       id: '201',
//       status: 'Pending',
//       documents: [
//         {
//           id: '301',
//           name: 'OPT Receipt',
//           url: 'http://example.com/opt-receipt',
//           status: 'Pending',
//           feedback: '',
//         },
//       ],
//     },
//   },
//   {
//     id: '2',
//     name: 'Jane Smith',
//     workAuthorization: {
//       title: 'Data Analyst',
//       startDate: new Date('2021-05-01'),
//       endDate: new Date('2022-05-01'),
//     },
//     daysRemaining: 60,
//     nextStep: 'Waiting for HR approval',
//     visaStatusId: '102',
//     onboardingApplication: {
//       id: '202',
//       status: 'Submitted',
//       documents: [
//         {
//           id: '302',
//           name: 'I-20',
//           url: 'http://example.com/i-20',
//           status: 'Pending',
//           feedback: '',
//         },
//       ],
//     },
//   },
// ];

// // Define the route
// app.get('/api/visa-statuses', (req, res) => {
//   res.json(fakeEmployees);
// });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});