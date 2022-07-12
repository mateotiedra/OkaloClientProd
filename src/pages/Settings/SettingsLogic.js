import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PageLogicHelper from '../../helpers/PageLogicHelper';

const SettingsLogic = () => {
  const { pageStatus, setPageStatus, navigate, useLoadPage } =
    PageLogicHelper();

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useLoadPage(
    async (user) => {
      navigate(`/user/${user.username}/edit`, { replace: true });
      for (const { id } of fields) {
        setValue(id, user[id]);
      }
      setValue('password', 'password');
      setPageStatus('active');
    },
    {
      authNeeded: true,
    }
  );

  const goToChangePassword = () => {
    navigate('change-password');
  };

  const fields = [
    {
      id: 'username',
      label: "Nom d'utilisateur",
      inputProps: { readOnly: true },
    },
    {
      id: 'email',
      label: 'Email',
      inputProps: { readOnly: true },
    },
    {
      id: 'password',
      password: true,
      label: 'Mot de passe',
      inputProps: { readOnly: true },
    },
    {
      id: 'phone',
      label: 'Numéro de téléphone',
      registration: {
        pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      },
    },
    {
      id: 'instagram',
      label: 'Instagram',
    },
  ];

  const onSubmit = (formData) => {
    console.log(formData);
  };

  return {
    pageStatus,
    onSubmit: handleSubmit(onSubmit),
    errors,
    register,
    fields,
    goToChangePassword,
  };
};

export default SettingsLogic;
