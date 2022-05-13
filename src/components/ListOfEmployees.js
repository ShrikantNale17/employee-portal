import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';


function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      margin: '0 auto',

    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

function ListOfEmployees() {

  const navigate = useNavigate()
  const empList = localStorage.getItem('empList') ? JSON.parse(localStorage.getItem('empList')) : []
  const [data, setData] = useState(empList)

  const confirmDelete = (emp) => {
    const confirm = window.confirm(`Deleting ${emp.name}?`)
    if (confirm) {
      const temp = data.filter(employee => employee.email !== emp.email)
      localStorage.setItem('empList', JSON.stringify(temp))
      setData(temp)
    }
  }

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={0}
      >
        <Typography variant="h4" sx={{ fontFamily: 'serif', fontWeight: 'bold' }} component='u'>
          List of Employees -
        </Typography>
        <Button variant="contained" onClick={() => navigate('/employees/add')}>
          Add Employee
        </Button>
      </Stack>
      {
        data.length > 0 ?
          <TableContainer component={Paper} sx={{ margin: '20px auto' }}>
            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ fontWeight: 'bold' }}>
                <TableRow sx={{ backgroundColor: 'aqua', fontFamily: 'serif', fontSize: '20px' }}>
                  <TableCell align='center'>Avatar</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Avatar {...stringAvatar(row.name)} />
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.mobile}</TableCell>
                    <TableCell>
                      <Link to={`/employees/update/${index}`} state={{ row: row, index: index }}><Tooltip title="Edit" placement='left-start'><EditRoundedIcon color='primary' /></Tooltip></Link>
                      <Link to={''} onClick={() => confirmDelete(row)}><Tooltip title="Delete" placement='right-start'><DeleteRoundedIcon color='warning' /></Tooltip></Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> :
          <Typography variant='h5' sx={{ margin: '30px auto', textAlign: 'center' }}>Your employee list is empty !</Typography>
      }
    </>
  );
}



// function ListOfEmployees() {
//   return (
//     <div>
//         ListOfEmployees
//         <nav>
//             <NavLink to={'add'}>Add Employee</NavLink>
//             <NavLink to={'update'}>Update Employee</NavLink>
//         </nav>
//     </div>
//   )
// }

export default ListOfEmployees