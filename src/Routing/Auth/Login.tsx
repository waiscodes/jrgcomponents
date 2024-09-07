'use client';
import { ContentCopyOutlined } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { FormEvent, ReactNode, useState } from 'react';
import QRCode from 'react-qr-code';
import { useAuthentication } from './Router';
import PasswordField from '../../MUI/Styled/Input/PasswordField';
import { validateURI } from '../../utils/Validation';
import { useAssertion } from '../../utils/Assert';
import ReCAPTCHA from 'react-google-recaptcha';
import TextField from '../../MUI/Styled/Input/TextField';

export type LoginProps = {
  userLoginEndpoint?: string;
};
export default function Login({
  searchParams,
  userLoginEndpoint = '/v1/login',
}: { searchParams: any } & LoginProps): ReactNode {
  const [responseMessage, setResponseMessage] = useState('');
  const authConfig = useAuthentication();
  const router = useRouter();
  const [captcha, setCaptcha] = useState<string | null>(null);

  useAssertion(validateURI(authConfig.authServer + userLoginEndpoint), 'Invalid login endpoint.', [
    authConfig.authServer,
    userLoginEndpoint,
  ]);
  const submitForm = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (authConfig.recaptchaSiteKey && !captcha) {
      setResponseMessage('Please complete the reCAPTCHA.');
      return;
    }

    const formData = Object.fromEntries(new FormData((event.currentTarget as HTMLFormElement) ?? undefined));
    try {
      const response = await axios
        .post(`${authConfig.authServer}${userLoginEndpoint}`, {
          ...formData,
          referrer: getCookie('href') ?? window.location.href.split('?')[0],
        })
        .catch((exception: AxiosError) => exception.response);
      if (response.status !== 200) {
        setResponseMessage(response.data.detail);
      } else {
        if (!validateURI(response.data.detail)) {
          console.log('Is URI.');
          router.push(response.data.detail);
        } else {
          console.log('Is not URI.');
          setResponseMessage(response.data.detail);
        }
      }
    } catch (exception) {
      console.error(exception);
    }
  };
  const otp_uri = searchParams.otp_uri;
  return (
    <Box component='form' onSubmit={submitForm} display='flex' flexDirection='column' gap='1rem'>
      {authConfig.login.heading && <Typography variant='h2'>{authConfig.login.heading}</Typography>}
      {otp_uri && !responseMessage && (
        <div className='max-w-xs p-2 mx-auto text-center bg-white'>
          <QRCode
            size={256}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={otp_uri ?? ''}
            viewBox={`0 0 256 256`}
          />
          <Typography>
            Scan the above QR code with Microsoft Authenticator, Google Authenticator or equivalent (or click the copy button
            if you are using your Authenticator device).
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(otp_uri);
              }}
            >
              <ContentCopyOutlined />
            </IconButton>
          </Typography>
        </div>
      )}
      <input type='hidden' id='email' name='email' value={getCookie('email')} />
      {authConfig.authModes.basic && <PasswordField />}
      <TextField id='token' label='Multi-Factor Code' placeholder='Enter your 6 digit code' name='token' />
      {authConfig.recaptchaSiteKey && (
        <Box
          sx={{
            my: '0.8rem',
          }}
        >
          <ReCAPTCHA
            sitekey={authConfig.recaptchaSiteKey}
            onChange={(token: string | null) => {
              setCaptcha(token);
            }}
          />
        </Box>
      )}
      {responseMessage && <Typography>{responseMessage}</Typography>}

      <Button type='submit'>{responseMessage ? 'Continue' : 'Login'}</Button>
    </Box>
  );
}
