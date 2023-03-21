import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISettingsResponse } from '../../@types/serverResponse';
import appAxios from '../../axios';
import Button from '../../components/Button';
import SaveIcon from '../../components/Icons/SaveIcon';
import Input from '../../components/Input';

import style from './SettingsPage.module.scss';

interface SettingsForm {
  crypto: string;
}

const SettingsPage: React.FC = () => {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsForm>();

  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchSettings = async () => {
    try {
      const { data } = await appAxios.get<ISettingsResponse>('/settings');
      setValue('crypto', data.cryptoDiscount.$numberDecimal);
    } catch (error) {
      console.log(error);
      alert("Something going wrong... Can't fetch website settings");
    }
  };

  const onSubmit: SubmitHandler<SettingsForm> = async (data) => {
    try {
      setLoading(true);
      await appAxios.patch('/settings', {
        cryptoDiscount: Number(data.crypto),
      });
      alert('Settings has been changed successfully!');
      fetchSettings();
    } catch (error) {
      console.log(error);
      alert("Something going wrong...\nCan't save this settings");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div className="section">
      <h3 className="section__header">Settings</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={style['form']}>
        <div className={style['box']}>
          <label htmlFor="crypto">Crypto discount value:</label>
          <Input
            type="text"
            placeholder="Enter crypto discount here..."
            name="crypto"
            register={register}
            validationSchema={{
              required: { value: true, message: 'Required' },
              pattern: {
                value: /(^\d+$)|(^\d+\.\d{1,2}$)/gm,
                message: 'Invalid discount! Example 10 or 10.90 or 5.9',
              },
            }}
            error={errors.crypto?.message || Boolean(errors.crypto)}
          />
        </div>
        <Button loading={loading} type="submit" icon={<SaveIcon />}>
          Save
        </Button>
      </form>
    </div>
  );
};

export default SettingsPage;
