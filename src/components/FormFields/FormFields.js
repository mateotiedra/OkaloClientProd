import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  FormControlLabel,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  TextField,
  Typography,
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
  setValue,
  readOnly,
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
          if (!field) return <React.Fragment key='index'></React.Fragment>;
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
                id={field.id}
                registration={registration}
                setValue={setValue}
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
                inputProps={{
                  readOnly: readOnly,
                  ...field.inputProps,
                }}
                autoFocus={!noAutofocus && index === 0}
                variant={variant}
                required={field.registration && field.registration.required}
                multiline={Boolean(field.rows)}
                rows={field.rows}
                InputProps={{
                  endAdornment: field.endAdornment,
                }}
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

function RadioField({
  label,
  defaultValue,
  registration,
  options,
  id,
  setValue,
  ...props
}) {
  return (
    <FormControl>
      <FormLabel id='demo-row-radio-buttons-group-label'>{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby='demo-row-radio-buttons-group-label'
        name='row-radio-buttons-group'
        defaultValue={defaultValue}
      >
        {options.map(({ value, label: optionLabel }) => {
          return (
            <FormControlLabel
              value={value}
              control={<Radio />}
              label={optionLabel}
              key={value}
              {...registration}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}

export default FormFields;
