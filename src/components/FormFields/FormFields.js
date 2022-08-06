import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  FormControlLabel,
  Avatar,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  TextField,
  Typography,
  createFilterOptions,
  Radio,
} from '@mui/material';

import PasswordField from '../PasswordField/PasswordField';
import IconTitle from '../IconTitle/IconTitle';
import SectionContainer from '../SectionContainer/SectionContainer';

function FormFields({
  onSubmit,
  register,
  sending,
  errors,
  buttonText,
  fields,
  extraComponents,
  avatarIcon,
  title,
  page,
  centered,
  children,
  variant,
  sx,
  noAutofocus,
  ...props
}) {
  const Inside = (
    <>
      {title && <IconTitle icon={avatarIcon}>{title}</IconTitle>}
      <Box
        component='form'
        noValidate
        onSubmit={onSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '100%',
          gap: 2,
          ...sx,
        }}
      >
        {fields.map((field, index) => {
          var registration = register(field.id, field.registration);
          if (field.password) {
            registration.innerRef = registration.ref;
            registration.ref = undefined;
            registration.visibilityDisabled = field.visibilityDisabled;
          }

          if (field.radio)
            return (
              <RadioField
                {...field}
                key={field.id}
                registration={registration}
              />
            );

          const Field = field.password ? PasswordField : TextField;

          return (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',
              }}
              key={field.id}
            >
              <Field
                id={field.id}
                label={field.label}
                autoComplete={field.id}
                helperText={errors[field.id] && errors[field.id].message}
                error={errors[field.id] !== undefined}
                disabled={field.disabled}
                inputProps={field.inputProps}
                autoFocus={!noAutofocus && index === 0}
                variant={variant}
                required={field.registration && field.registration.required}
                {...registration}
              />
              {extraComponents &&
                (extraComponents[index] ||
                  (extraComponents['-1'] &&
                    index === fields.length - 1 &&
                    extraComponents['-1']))}
            </Box>
          );
        })}
        {buttonText && (
          <LoadingButton
            variant='contained'
            type='submit'
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            loading={sending}
          >
            <Typography variant='body1'>{buttonText}</Typography>
          </LoadingButton>
        )}
      </Box>
    </>
  );

  if (page)
    return (
      <>
        <SectionContainer
          maxWidth='sm'
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: centered ? 'center' : 'flex-start',
            alignItems: 'center',
            pt: 8,
          }}
        >
          {Inside}
          {children}
        </SectionContainer>
      </>
    );
  else return Inside;
}

function RadioField({ label, defaultValue, registration, options, ...props }) {
  return (
    <FormControl {...registration}>
      <FormLabel id='demo-row-radio-buttons-group-label'>{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby='demo-row-radio-buttons-group-label'
        name='row-radio-buttons-group'
        defaultValue={defaultValue}
      >
        {options.map(({ value, label: optionLabel }) => (
          <FormControlLabel
            value={value}
            control={<Radio />}
            label={optionLabel}
            key={value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default FormFields;
