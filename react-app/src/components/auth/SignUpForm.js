import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { useModal } from '../../context/Modal';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [email, setEmail] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const { closeModal } = useModal()

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, city, state, zipcode, streetAddress, email, password));
      if (data) {
        setErrors(data)
      } else {
        await closeModal()
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateCity = (e) => {
    setCity(e.target.value)
  }

  const updateState = (e) => {
    setState(e.target.value)
  }

  const updateStreetAddress = (e) => {
    setStreetAddress(e.target.value)
  }

  const updateZipcode = (e) => {
    setZipcode(e.target.value)
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>First Name</label>
        <input
          type='text'
          name='firstName'
          onChange={updateFirstName}
          value={firstName}
          require={true}
        ></input>
      </div>
      <div>
        <label>Last Name</label>
        <input
          type='text'
          name='firstName'
          onChange={updateLastName}
          value={lastName}
          require={true}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          require={true}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          require={true}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          require={true}
          ></input>
          </div>
          <div>
            <label>City</label>
            <input
              type='text'
              name='city'
              onChange={updateCity}
              value={city}
              require={true}
            ></input>
          </div>
          <div>
        <label className="signup-input-label">State</label>
          <select
            name="gender"
            onChange={updateState}
            require={true}
            className='signup-input-field'
            >
            <option className='signup-input-field' value="AL">Alabama</option>
            <option className='signup-input-field' value="AK">Alaska</option>
            <option className='signup-input-field' value="AZ">Arizon</option>
            <option className='signup-input-field' value="AR">Arkansas</option>
            <option className='signup-input-field' value="CA">California</option>
            <option className='signup-input-field' value="CO">Colorado</option>
            <option className='signup-input-field' value="CT">Connecticut</option>
            <option className='signup-input-field' value="DE">Delaware</option>
            <option className='signup-input-field' value="FL">Florida</option>
            <option className='signup-input-field' value="GA">Georgia</option>
            <option className='signup-input-field' value="HI">Hawaii</option>
            <option className='signup-input-field' value="ID">Idaho</option>
            <option className='signup-input-field' value="IL">Illinois</option>
            <option className='signup-input-field' value="IN">Indiana</option>
            <option className='signup-input-field' value="IA">Iowa</option>
            <option className='signup-input-field' value="KS">Kansas</option>
            <option className='signup-input-field' value="KY">Kentucky</option>
            <option className='signup-input-field' value="LA">Louisiana</option>
            <option className='signup-input-field' value="ME">Maine</option>
            <option className='signup-input-field' value="MD">Maryland</option>
            <option className='signup-input-field' value="MA">Massachusetts</option>
            <option className='signup-input-field' value="MI">Michigan</option>
            <option className='signup-input-field' value="MN">Minnesota</option>
            <option className='signup-input-field' value="MS">Mississippi</option>
            <option className='signup-input-field' value="MO">Missouri</option>
            <option className='signup-input-field' value="MT">Montana</option>
            <option className='signup-input-field' value="NE">Nebraska</option>
            <option className='signup-input-field' value="NV">Nevada</option>
            <option className='signup-input-field' value="NH">New Hampshire</option>
            <option className='signup-input-field' value="NJ">New Jersey</option>
            <option className='signup-input-field' value="NM">New Mexico</option>
            <option className='signup-input-field' value="NY">New York</option>
            <option className='signup-input-field' value="NC">North Carolina</option>
            <option className='signup-input-field' value="ND">North Dakota</option>
            <option className='signup-input-field' value="OH">Ohio</option>
            <option className='signup-input-field' value="OK">Oklahoma</option>
            <option className='signup-input-field' value="OR">Oregon</option>
            <option className='signup-input-field' value="PA">Pennsylvania</option>
            <option className='signup-input-field' value="RI">Rhode Island</option>
            <option className='signup-input-field' value="SC">South Caroliina</option>
            <option className='signup-input-field' value="SD">South Dakota</option>
            <option className='signup-input-field' value="TN">Tennessee</option>
            <option className='signup-input-field' value="TX">Texas</option>
            <option className='signup-input-field' value="UT">Utah</option>
            <option className='signup-input-field' value="VT">Vermont</option>
            <option className='signup-input-field' value="VA">Virginia</option>
            <option className='signup-input-field' value="WA">Washington</option>
            <option className='signup-input-field' value="WV">West Virginia</option>
            <option className='signup-input-field' value="WI">Wisconsin</option>
            <option className='signup-input-field' value="WY">Wyoming</option>
          </select>
          </div>
          <div>
            <label>Street Address</label>
            <input
              type='text'
              name='street address'
              onChange={updateStreetAddress}
              value={streetAddress}
              require={true}
            ></input>
          </div>
          <div>
            <label>Zipcode</label>
            <input
              type='number'
              name='zipcode'
              onChange={updateZipcode}
              value={zipcode}
              require={true}
            ></input>
          </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
