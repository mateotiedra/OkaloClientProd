import { useState } from 'react';
//import { useForm } from 'react-hook-form';

import PageLogicHelper from '../../helpers/PageLogicHelper';

const BidLogic = (props) => {
  const { API_ORIGIN, axios, pageStatus, setPageStatus, useLoadPage } =
    PageLogicHelper();

  /*   const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm(); */

  const [resultBids, setResultBids] = useState([]);

  useLoadPage(async () => {
    setPageStatus('active');
  });

  const onTitleSelect = (title) => {
    console.log(title);
    setPageStatus('loading-books');
    axios
      .get(API_ORIGIN + '/book/search', {
        params: { attr: 'title', title: title },
      })
      .then(({ data }) => {
        console.log(data);
        setResultBids(data);
      })
      .catch((err) => console.log(err));
  };

  return { pageStatus, onTitleSelect, resultBids };
};

export default BidLogic;
