import * as React from 'react';
import {
  Link,
  Typography,
  Box,
  Autocomplete,
  Chip,
  TextField,
} from '@mui/material';
import { HiUser } from 'react-icons/hi';
import { HashLink as RouterLink } from 'react-router-hash-link';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import FormFields from '../../components/FormFields/FormFields';

import AuthLogic from './AuthLogic';
import SectionContainer from '../../components/SectionContainer/SectionContainer';

function InstitutionsField({
  institutions = [],
  loading,
  onChange,
  helperText,
}) {
  return (
    <Box sx={{ width: '100%' }}>
      <Autocomplete
        sx={{ mt: 2, mb: 1 }}
        multiple
        id='tags-filled'
        options={institutions.map((institution) => institution.name)}
        loading={loading}
        onChange={onChange}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant='outlined'
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant='filled'
            label='Établissements'
            error={Boolean(helperText)}
            helperText={
              helperText ||
              'Indique dans quel(s) établissement(s) tu es prêt à te rendre pour vendre tes livres.'
            }
          />
        )}
      />
    </Box>
  );
}

export default function Auth(props) {
  const {
    register,
    errors,
    onSubmit,
    pageStatus,
    loginMode,
    switchLoginMode,
    fields,
    displayResend,
    institutions,
    onInstitutionsChange,
    institutionsHelperText,
  } = AuthLogic(props);

  return (
    <>
      <Navbar empty coverPage />
      <SectionContainer fullPage>
        <FormFields
          title={loginMode ? 'Connexion' : 'Inscription'}
          avatarIcon={<HiUser />}
          onSubmit={onSubmit}
          register={register}
          sending={pageStatus === 'sending'}
          buttonText={loginMode ? 'Se connecter' : "S'inscrire"}
          errors={errors}
          fields={fields}
          extraComponents={{
            0: displayResend && (
              <Link
                sx={{ alignSelf: 'flex-end' }}
                component={RouterLink}
                to='/confirm-email/resend'
              >
                <Typography variant='body2'>
                  Renvoyer un code de confirmation
                </Typography>
              </Link>
            ),
            '-1': !loginMode && (
              <InstitutionsField
                institutions={institutions}
                loading={pageStatus === 'loading'}
                onChange={onInstitutionsChange}
                helperText={institutionsHelperText}
              />
            ),
          }}
        />

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            px: 1,
          }}
        >
          <Link variant='body2' onClick={switchLoginMode}>
            {loginMode ? "S'inscrire" : 'Se connecter'}
          </Link>
          <Link
            href='#'
            component={RouterLink}
            variant='body2'
            to='/confirm-email/reset-password'
          >
            {loginMode && 'Mot de passe oublié ?'}
          </Link>
        </Box>
        <Footer />
      </SectionContainer>
    </>
  );
}
