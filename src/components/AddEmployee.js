import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Autocomplete, Button, Card, CardContent, Checkbox, Container, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, Radio, RadioGroup, Slider, Stack, TextareaAutosize, Typography } from '@mui/material';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {

  const navigate = useNavigate()

  const [auth_token, setAuth_token] = useState()
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    state: '',
    city: '',
    DOB: null,
    gender: '',
    password: '',
    hobbies: { reading: false, writing: false, playing: false },
    cs: ''
  })

  useEffect(() => {

    axios.get('https://www.universal-tutorial.com/api/getaccesstoken', {
      headers: {
        "Accept": "application/json",
        "api-token": "fhMkJuqVB4Ph8adRLNY7YlVbDpPTCrxua4FMM_Uq9je5ef8qDIubCw3KVMxb0INVI-g",
        "user-email": "shrikantnale17071999@gmail.com"
      }
    })
      .then(res => {
        setAuth_token(res.data.auth_token)
        getStates(res.data.auth_token)
      })
  }, [])
  useEffect(() => {
    if (employee.state !== '') {
      getCities()

    }

  }, [employee.state])

  const getStates = async (auth_token) => {
    const res = await axios.get('https://www.universal-tutorial.com/api/states/India', {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        "Accept": "application/json"
      }
    })
    console.log(res.data)
    setStates(res.data)
  }

  const getCities = async () => {
    const res = await axios.get(`https://www.universal-tutorial.com/api/cities/${employee.state}`, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        "Accept": "application/json"
      }
    })
    console.log(res.data)
    setCities(res.data)
  }

  const handleChange = (e) => {
    console.log(e.target.value)
  }

  const handleSubmit = (e) => {

    e.preventDefault();
    let arr = localStorage.getItem('empList') ? JSON.parse(localStorage.getItem('empList')) : []
    arr.push(employee)
    localStorage.setItem('empList', JSON.stringify(arr))
    console.log(e)
    navigate('/')
    window.alert('Data added successFully!')

  }

  console.log(employee)

  return (
    <Card sx={{ minWidth: 450, maxWidth: 700, margin: '0 auto' }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={false}
                type='text'
                id="outlined-error"
                label="Name"
                placeholder='Enter full name'
                value={employee.name}
                onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={false}
                type='email'
                id="outlined-error"
                label="Email"
                placeholder='Enter your email'
                value={employee.email}
                onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                error={false}
                type='number'
                id="outlined-error"
                label="Mobile"
                placeholder='Enter your mobile number'
                value={employee.mobile}
                onChange={(e) => setEmployee({ ...employee, mobile: e.target.value })}
                fullWidth
                required
              />
            </Grid>
            {/* <Grid item xs={12} sm={12}>
              <TextField
                id="outlined-multiline-flexible"
                type='text'
                label="Address"
                placeholder='Enter your address'
                value={employee.address}
                onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
                multiline
                fullWidth
                minRows={2}
                maxRows={4}
                required
              />
            </Grid> */}
            <Grid item xs={12} sm={12}>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Enter your address"
                value={employee.address}
                onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
                style={{ width: '100%' }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={states.map(states => ({ ...states, label: states.state_name }))}
                // sx={{ width: 300 }}
                value={employee.state ? employee.state : ''}
                onChange={(e, val) => setEmployee({ ...employee, state: val.state_name })}
                renderInput={(params) => <TextField {...params} label="State" required />}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={cities.map(city => ({ ...city, label: city.city_name }))}
                // sx={{ width: 300 }}
                value={employee.city ? employee.city : ''}
                onChange={(e, val) => setEmployee({ ...employee, city: val.city_name })}
                renderInput={(params) => <TextField {...params} label="City" required />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="date"
                label="Date of Birth"
                type="date"
                // defaultValue="1999-04-16"
                // sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setEmployee({...employee, DOB: e.target.value})}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={employee.gender}
                  onChange={(e) => setEmployee({ ...employee, gender: e.target.value })}
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                error={false}
                type='password'
                id="outlined-error"
                label="Password"
                placeholder='Enter password'
                value={employee.password}
                onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="" variant="standard">
                <FormLabel component="">Hobbies:-</FormLabel>
                <FormGroup sx={{ margin: '0 30px' }}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={employee.hobbies.reading} onChange={() => setEmployee({ ...employee, hobbies: { ...employee.hobbies, reading: !employee.hobbies.reading } })} name="reading" />
                    }
                    label="Reading"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={employee.hobbies.writing} onChange={() => setEmployee({ ...employee, hobbies: { ...employee.hobbies, writing: !employee.hobbies.writing } })} name="jason" />
                    }
                    label="Writing"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={employee.hobbies.playing} onChange={() => setEmployee({ ...employee, hobbies: { ...employee.hobbies, playing: !employee.hobbies.playing } })} name="antoine" />
                    }
                    label="Playing"
                  />
                </FormGroup>
                {/* <FormHelperText>Be careful</FormHelperText> */}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>Rate your communication skills:-</FormLabel>
              <Slider
                sx={{margin: '20px 0'}}
                aria-label="CS"
                defaultValue={0}
                // getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                onChange={(e) => setEmployee({ ...employee, cs: e.target.value })}
                step={1}
                marks
                min={0}
                max={5}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button type='submit' variant='contained' color='primary' >Submit</Button>
            </Grid>

          </Grid>
        </form>
      </CardContent>
    </Card>


  )
}

export default AddEmployee