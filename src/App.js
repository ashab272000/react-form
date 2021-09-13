import './App.css';
import {TextField, Grid, Button} from '@material-ui/core'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import valid from 'card-validator'; 

const schema = yup.object().shape({
  username: yup.string().required(),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  address: yup.string(),
  email: yup.string().email(),
  country: yup.string(),
  cardnumber: yup.string().matches(/([0-9]{16}|^$)/, "Invalid Credit card number"),
  cardmonth: yup.string().matches(/([1-9]|0[1-9]|1[1-2]|^$)/, "Must be a valid month"),
  cardyear: yup.string().matches(/(20[2-9][1-9]|^$)/, "Must be between 2021 and 2100"),
  cvv: yup.string().max(3).matches(/[0-9]*/, "Must contain three digits")
});


function App() {
  const {register, handleSubmit, formState:{ errors }} = useForm({
    resolver: yupResolver(schema),
  });
  const [response, setResponse] = useState(<div></div>)

  const options = ['United Arab Emirates', "United States", 'United Kingdom']

  const onSubmitForm = (data) => {
    console.log(data)
    setResponse( <h2>Welcome {data.firstname} {data.lastname}</h2> )
  }


  return (
    <div className="app">
      <Grid className="app__container" alignItems="center" container justifyContent="center" lg='auto'>
        <form onSubmit={handleSubmit((data) => {onSubmitForm(data)}, (e) => console.log(e))}>
          <TextField required {...register('username')} id="form__username" label="Username" variant="filled" />
          <p>{errors.username?.message}</p>
          <Grid container>
            <Grid item xs={6}>
              <TextField required {...register('firstname')} id="form__firstname" label="First Name" variant="filled" />
              <p>{errors.firstname?.message}</p>
            </Grid> 
            <Grid item xs={6}>
              <TextField required {...register('lastname')}  id="form__lastname" label="Last Name" variant="filled" />
              <p>{errors.lastname?.message}</p>
            </Grid>
          </Grid>
          <TextField {...register('address')} id="form__address" label="Address" variant="filled" />
          <p>{errors.address?.message}</p>
          <TextField {...register('email')} id="form__email" label="Email" variant="filled" />
          <p>{errors.email?.message}</p>
          {/* <Dropdown options={options} onChange={(e) => {console.log(e)}} value={options[0]} placeholder="Select an option" /> */}
          
          <TextField select {...register('country')} id="form__country" label="Country" variant="filled" >
              {options.map((option) => (
                <option key={option} value={option}>{option}</option>
                ))}
          </TextField>
          <TextField {...register('cardnumber')} id="form__cardnumber" label="Card Number" variant="filled" />
          <p>{errors.cardnumber?.message}</p>
          <Grid container justifyContent="center">
            <Grid item xs={3}>
              <TextField id="form__cardmonth" {...register('cardmonth')} label="Month" variant="filled" />
              <p>{errors.cardmonth?.message}</p>
            </Grid>
            <Grid item xs={3}>
              <TextField id="form__cardyear" {...register('cardyear')}label="Year" variant="filled" />
              <p>{errors.cardyear?.message}</p>
            </Grid>
            <Grid item xs={6}>
              <TextField id="form__cardcvv" {...register('cardcvv')} label="CVV" variant="filled" />
              <p>{errors.cardcvv?.message}</p>
            </Grid>
          </Grid>
          <Button type='submit'> 
            Submit
          </Button>
          {response}
        </form>
      </Grid>

    </div>
  );
}

export default App;
