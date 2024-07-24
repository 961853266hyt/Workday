// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState, AppDispatch } from '../redux/store';
// import { fetchVisaStatus } from '../redux/visaStatusSlice';
// import VisaStatusItem from './VisaStatusItem';
// import { List, ListItem, TextField, Typography} from '@mui/material';


// interface VisaStatusListProps {
//   status: 'In Progress' | 'All';
// }

// const fakeEmployees = [
//     {
//       id: '1',
//       name: 'John Doe',
//       workAuthorization: {
//         title: 'Software Engineer',
//         startDate: new Date('2022-01-01'),
//         endDate: new Date('2023-01-01'),
//       },
//       daysRemaining: 180,
//       nextStep: 'Submit next document',
//       visaStatusId: '101',
//       onboardingApplication: {
//         id: '201',
//         status: 'Pending',
//         documents: [
//           {
//             id: '301',
//             name: 'OPT Receipt',
//             url: 'http://example.com/opt-receipt',
//             status: 'Pending',
//             feedback: '',
//           },
//         ],
//       },
//     },
//     {
//       id: '2',
//       name: 'Jane Smith',
//       workAuthorization: {
//         title: 'Data Analyst',
//         startDate: new Date('2021-05-01'),
//         endDate: new Date('2022-05-01'),
//       },
//       daysRemaining: 60,
//       nextStep: 'Waiting for HR approval',
//       visaStatusId: '102',
//       onboardingApplication: {
//         id: '202',
//         status: 'Submitted',
//         documents: [
//           {
//             id: '302',
//             name: 'I-20',
//             url: 'http://example.com/i-20',
//             status: 'Pending',
//             feedback: '',
//           },
//         ],
//       },
//     },
//   ];

// const VisaStatusList: React.FC<VisaStatusListProps> = ({ status }) => {
//     const dispatch: AppDispatch = useDispatch();
//     const employees = useSelector((state: RootState) => state.visaStatus.employees);
//     const loading = useSelector((state: RootState) => state.visaStatus.loading);
//     const error = useSelector((state: RootState) => state.visaStatus.error);

//     const [data, setData] = useState(fakeEmployees);
//     const [searchTerm, setSearchTerm] = useState('');
  
//     useEffect(() => {
//       dispatch(fetchVisaStatuses());
//     }, [dispatch]);
  
//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error}</p>;

//     const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchTerm(event.target.value);
//       };
    
  
//     // const filteredEmployees = Array.isArray(data)
//     //   ? data.filter(emp => {
//     //       if (status === 'In Progress') {
//     //         return emp.nextStep !== 'Completed';
//     //       }
//     //       return true;
//     //     })
//     //   : [];

//     const filteredEmployees = Array.isArray(data)
//     ? data.filter(emp => {
//         const matchSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
//         if (status === 'In Progress') {
//           return matchSearch && emp.nextStep !== 'Completed';
//         }
//         return matchSearch;
//       })
//     : [];
  
//     return (
//         <div>
//         <TextField
//           label="Search Employees"
//           variant="outlined"
//           value={searchTerm}
//           onChange={handleSearch}
//           fullWidth
//           margin="normal"
//         />
//         <List>
//           {filteredEmployees.map((emp) => (
//             <ListItem key={emp.id}>
//               <VisaStatusItem employee={emp} />
//               <Typography variant="body2">
//                 Start Date: {emp.workAuthorization.startDate.toLocaleDateString()}
//               </Typography>
//               <Typography variant="body2">
//                 End Date: {emp.workAuthorization.endDate.toLocaleDateString()}
//               </Typography>
//             </ListItem>
//           ))}
//         </List>
//       </div>
//     );
//   };
  

// export default VisaStatusList;