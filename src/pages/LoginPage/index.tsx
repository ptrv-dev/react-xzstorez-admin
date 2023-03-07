import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import UserIcon from '../../components/Icons/UserIcon';
import LockIcon from '../../components/Icons/LockIcon';
import Input from '../../components/Input';

import style from './LoginPage.module.scss';
import Button from '../../components/Button';

interface LoginFormFields {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>();

  const onSubmit: SubmitHandler<LoginFormFields> = (data) => {
    console.log(data);
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
        <Button className={style.formButton}>Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
