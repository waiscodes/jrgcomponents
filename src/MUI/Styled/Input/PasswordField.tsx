import { TextField } from '@mui/material';
import React from 'react';

interface PasswordFieldProps {
  id?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  label?: string;
  name?: string;
  autoComplete?: string;
}

export default function PasswordField({
  id = 'password',
  value,
  onChange,
  helperText = 'Please enter your password.',
  name = 'password',
  label = 'Password',
  autoComplete = 'current-password',
}: PasswordFieldProps) {
  return (
    <TextField
      key={'field'}
      fullWidth
      name={name}
      id={id}
      label={helperText == null ? label : helperText}
      variant='outlined'
      type='password'
      autoComplete={autoComplete}
      required
      value={value}
      onChange={onChange}
    />
  );
}
