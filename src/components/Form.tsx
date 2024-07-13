import axios from 'axios';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Popup from './Poput';
import './component.scss';

interface FormProps {
  title: string;
  desc: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  dob: string;
}

const Form: React.FC = () => {
  const [isSubmit, setSubmit] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormProps>();

  const onSubmit: SubmitHandler<FormProps> = (data) => {
    console.log(data);
    setSubmit(true);
    axios({
      method: 'post',
      url: 'http://localhost:3000/posts',
      data: {
        title: data.title,
        desc: data.desc,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        dob: data.dob,
      },
    })
      .then(function (response) {
        console.log(response);
        setSubmit(false);
        reset();
        setShowPopup(true); // Показываем попап после успешной отправки
      })
      .catch(function (error) {
        setSubmit(false);
        reset();
        console.log(error);
      });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Form Create In DataBase</h1>
        <label htmlFor="firstName">First Name:</label>
        <input
          minLength={3}
          maxLength={19}
          placeholder="firstName"
          type="text"
          id="firstName"
          {...register('firstName', { required: 'First name is required' })}
        />
        {errors.firstName && (
          <p style={{ color: 'green', fontSize: 19 }}>{errors.firstName.message}</p>
        )}

        <label htmlFor="lastName">Last Name:</label>
        <input
          minLength={4}
          maxLength={19}
          placeholder="lastName"
          type="text"
          id="lastName"
          {...register('lastName', { required: 'Last name is required' })}
        />
        {errors.lastName && (
          <p style={{ color: 'green', fontSize: 19 }}>{errors.lastName.message}</p>
        )}

        <label htmlFor="email">Email:</label>
        <input
          minLength={5}
          maxLength={40}
          placeholder="Email"
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
          })}
        />
        {errors.email && (
          <p style={{ color: 'green', fontSize: 19 }}>{errors.email.message}</p>
        )}

        <label htmlFor="phone">Phone:</label>
        <input
          minLength={4}
          maxLength={9}
          placeholder="Number phone"
          type="number"
          id="phone"
          {...register('phone', { required: 'Phone number is required' })}
        />
        {errors.phone && (
          <p style={{ color: 'green', fontSize: 19 }}>{errors.phone.message}</p>
        )}

        <label htmlFor="dob">Date of Birth:</label>
        <input
          minLength={2}
          maxLength={19}
          type="date"
          id="dob"
          {...register('dob', { required: 'Date of birth is required' })}
        />
        {errors.dob && (
          <p style={{ color: 'green', fontSize: 19 }}>{errors.dob.message}</p>
        )}

        <button type="submit" className="button" disabled={isSubmit}>
          {isSubmit ? 'Loading...' : 'Add'}
        </button>
      </form>

      {showPopup && <Popup onClose={closePopup} />}
    </div>
  );
};

export default Form;
