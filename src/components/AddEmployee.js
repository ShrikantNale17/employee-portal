import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Autocomplete, Box, Button, Card, CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, Radio, RadioGroup, Slider, Typography } from '@mui/material';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/lab';
// import { DatePicker } from '@mui/x-date-pickers';

function AddEmployee() {

  const navigate = useNavigate()
  const { register, handleSubmit, control, formState: { errors }, getValues, setValue } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      address: '',
      state: '',
      city: '',
      DOB: null,
      gender: '',
      password: '',
      hobbies: [],
      cs: ''
    }
  })

  const [auth_token, setAuth_token] = useState()
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])

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
    if (getValues('state') !== '') {
      getCities()
    } else {
      setCities([])
    }
  }, [getValues('state')])

  const getStates = async (auth_token) => {
    const res = await axios.get('https://www.universal-tutorial.com/api/states/India', {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        "Accept": "application/json"
      }
    })
    setStates(res.data)
  }

  const getCities = async () => {
    const res = await axios.get(`https://www.universal-tutorial.com/api/cities/${getValues('state')}`, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        "Accept": "application/json"
      }
    })
    setCities(res.data)
  }

  const submitHandler = (data) => {
    // console.log(data)
    // console.log(errors);
    let arr = localStorage.getItem('empList') ? JSON.parse(localStorage.getItem('empList')) : []
    arr.push(data)
    localStorage.setItem('empList', JSON.stringify(arr))
    navigate('/')
    window.alert('Data added successFully!')

  }

  console.log(errors);
  console.log(getValues())

  const handleState = (props, val) => {
    if (val) {
      props.field.onChange(val?.state_name);
    } else {
      setValue('city',)
      props.field.onChange(val?.state_name);
    }
  }

  return (
    <Card sx={{ minWidth: 450, maxWidth: 700, margin: '0 auto', boxShadow: 15, borderRadius: 2 }}>
      <Typography variant='h4' fontFamily={'serif'} textAlign={'center'} m={1} fontWeight={20}>Add Details</Typography>
      <CardContent>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                type='text'
                // id="outlined-error"
                label="Name"
                placeholder='Enter full name'
                // value={employee.name}
                // onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                {...register('name', {
                  required: 'please enter your name',
                  pattern: {
                    value: /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/,
                    message: 'please enter valid full name'
                  }
                })}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                fullWidth

              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                // type='email'
                // id="outlined-error"
                label="Email"
                placeholder='Enter your email'
                // value={employee.email}
                // onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                {...register('email', {
                  required: 'please enter your email',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'invalid email address'
                  }
                })}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                fullWidth

              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                // error={false}
                type='text'
                // id="outlined-error"
                label="Mobile"
                placeholder='Enter your mobile number'
                InputProps={{ inputProps: { maxLength: 10 } }}
                // value={employee.mobile}
                // onChange={(e) => setEmployee({ ...employee, mobile: e.target.value })}
                {...register('mobile', {

                  required: 'please enter valid mobile number',
                  pattern: {
                    value: /^[7-9][0-9]{9}$/,
                    message: 'please enter valid mobile number'
                  }
                })}
                error={Boolean(errors.mobile)}
                helperText={errors.mobile?.message}
                fullWidth

              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="outlined-multiline-flexible"
                type='text'
                label="Address"
                placeholder='Enter your address'
                multiline
                fullWidth
                minRows={2}
                maxRows={4}
                {...register('address', {
                  required: 'required'
                })}
                error={Boolean(errors.address)}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12}>
              <FormControl error={errors.address}>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={3}
                  placeholder="Enter your address"
                  // value={employee.address}
                  // onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
                  {...register('address', {
                    required: 'required'
                  })}
                  style={{ width: '100%' }}

                />
                <FormHelperText>{errors.address?.message}</FormHelperText>
              </FormControl>
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <Controller
                render={(props) =>
                  <Autocomplete
                    disablePortal
                    // id="combo-box-demo"
                    options={states.map(states => ({ ...states, label: states.state_name }))}
                    // sx={{ width: 300 }}
                    value={getValues('state') ? getValues('state') : ''}
                    onChange={(e, val) => { handleState(props, val) }}
                    renderInput={(params) => <TextField {...params} label="State" error={Boolean(errors.state)} helperText={errors.state?.message} />}
                  />
                }
                {...register('state', {
                  required: 'please select your state'
                })}
                control={control}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                render={(props, ref) =>
                  <Autocomplete
                    disablePortal
                    // id="combo-box-demo"
                    options={cities.map(city => ({ ...city, label: city.city_name }))}
                    // sx={{ width: 300 }}
                    value={getValues('state') ? getValues('city') : ''}
                    // defaultValue={''}
                    onChange={(e, val) => { props.field.onChange(val?.city_name) }}

                    renderInput={(params) => <TextField {...params} label="City" error={Boolean(errors.city)} helperText={errors.city?.message} />}
                  />
                }
                {...register('city', {
                  required: 'please select your city'
                })}
                control={control}

              />

            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                id="date"
                label="Date of Birth"
                type="date"
                // defaultValue="1999-04-16"
                // sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                // onChange={(e) => setEmployee({ ...employee, DOB: e.target.value })}
                {...register('DOB', {
                  required: 'date of birth is required'
                })}
                error={Boolean(errors.DOB)}
                helperText={errors.DOB?.message}
                fullWidth

              />
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <FormControl error={Boolean(errors.DOB)}>
                  <Controller
                    render={({ field }) =>
                      <DatePicker
                        // disableFuture
                        label="Date of Birth"
                        openTo="year"
                        views={['year', 'month', 'day']}
                        value={getValues('DOB')}
                        onChange={field.onChange}

                        renderInput={(params) => <TextField {...params} />}
                      />
                    }
                    {...register('DOB', {
                      required: 'please enter your DOB'
                    })}
                    control={control}
                  />
                  <FormHelperText>{errors.DOB?.message}</FormHelperText>
                </FormControl>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl error={Boolean(errors.gender)}>
                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                // value={employee.gender}
                // onChange={(e) => setEmployee({ ...employee, gender: e.target.value })}
                >
                  <FormControlLabel value="female" checked={getValues('gender') === 'female'} control={<Radio {...register('gender', {
                    required: 'required'
                  })} />} label="Female" />
                  <FormControlLabel value="male" checked={getValues('gender') === 'male'} control={<Radio {...register('gender', {
                    required: 'required'
                  })} />} label="Male" />
                  <FormControlLabel value="other" checked={getValues('gender') === 'other'} control={<Radio {...register('gender', {
                    required: 'please chose your gender'
                  })} />} label="Other" />
                  <FormHelperText>{errors.gender?.message}</FormHelperText>
                </RadioGroup>

              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                // error={false}
                type='password'
                id="outlined-error"
                label="Password"
                placeholder='Enter password'
                // defaultValue={getValues('password')}
                // value={employee.password}
                // onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
                {...register('password', {
                  required: 'password is required'
                })}
                fullWidth
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="" variant="standard" error={Boolean(errors.hobbies)}>
                <FormLabel component="">Hobbies:-</FormLabel>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox defaultChecked={getValues('hobbies').includes('Reading')} value={'Reading'} {...register('hobbies', {
                        required: 'required'
                      })} />
                    }
                    label="Reading"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox defaultChecked={getValues('hobbies').includes('Writing')} value={'Writing'} {...register('hobbies', {
                        required: 'required'
                      })} />
                    }
                    label="Writing"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox defaultChecked={getValues('hobbies').includes('Playing')} value={'Playing'} {...register('hobbies', {
                        required: 'Please select at least on hobby'
                      })} />
                    }
                    label="Playing"
                  />
                </FormGroup>
                <FormHelperText>{errors.hobbies?.message}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl error={Boolean(errors.cs)}>
                <FormLabel>Rate your communication skills:-</FormLabel>
                <Slider
                  sx={{ margin: '5px 0' }}
                  aria-label="CS"
                  defaultValue={Number(getValues('cs'))}
                  // getAriaValueText={valuetext}
                  valueLabelDisplay="auto"
                  // onChange={(e) => setEmployee({ ...employee, cs: e.target.value })}
                  step={1}
                  marks
                  min={0}
                  max={5}
                  {...register('cs', {
                    required: 'please rate your skills'
                  })}
                />
                <FormHelperText>{errors.cs?.message}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Button type='submit' variant='contained' color='secondary' >Submit</Button>
              </Box>
            </Grid>

          </Grid>
        </form>
      </CardContent>
    </Card>


  )
}

export default AddEmployee