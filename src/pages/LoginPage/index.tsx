import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { isAxiosError } from 'axios';

import appAxios from '../../axios';

import UserIcon from '../../components/Icons/UserIcon';
import LockIcon from '../../components/Icons/LockIcon';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAppDispatch } from '../../store/store';
import { login } from '../../store/slices/auth.slice';

import style from './LoginPage.module.scss';

interface LoginFormFields {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    setLoading(true);
    try {
      await appAxios.post('/auth/login', data);
      setMessage('');
      dispatch(login());
    } catch (error) {
      if (isAxiosError(error)) {
        const statusCode = error.response?.status || 500;
        console.error(error);

        if (statusCode === 401) return setMessage('Incorrect credentials!');

        alert('Something going wrong...');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <h3>Authorization</h3>
        <Input
          type="text"
          placeholder="username"
          icon={<UserIcon />}
          name="username"
          register={register}
          validationSchema={{
            required: { value: true, message: 'Required' },
            minLength: { value: 4, message: 'Min length 4' },
            maxLength: { value: 64, message: 'Max length 64' },
          }}
          error={errors.username?.message || Boolean(errors.username)}
        />
        <Input
          type="password"
          placeholder="********"
          icon={<LockIcon />}
          name="password"
          register={register}
          validationSchema={{
            required: { value: true, message: 'Required' },
            minLength: { value: 8, message: 'Min length 8' },
            maxLength: { value: 64, message: 'Max length 64' },
          }}
          error={errors.password?.message || Boolean(errors.password)}
        />
        {message && <p className={style.formWarning}>{message}</p>}
        <Button className={style.formButton} loading={loading}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
