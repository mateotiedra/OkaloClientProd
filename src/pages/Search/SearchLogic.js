import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import PageLogicHelper from '../../helpers/PageLogicHelper';
import NewBidLogic from '../NewBid/NewBidLogic';

const BidLogic = (props) => {
  const {
    API_ORIGIN,
    axios,
    pageStatus,
    setPageStatus,
    getStatusCode,
    navigate,
    useLoadPage,
    pathname,
    location,
    useNavigationInterceptor,
  } = PageLogicHelper();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  useLoadPage(async () => {});

  return { pageStatus };
};

export default BidLogic;
