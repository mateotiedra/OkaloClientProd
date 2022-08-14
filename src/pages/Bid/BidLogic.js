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

  const {
    conditionOptions,
    customisationOptions,
    stateFields: stateFieldsBase,
  } = NewBidLogic({
    fromOtherPage: true,
  });

  const { uuid: urlUuid } = useParams();
  const [bidData, setBidData] = useState({});
  const [deleteDialogOpened, setDleteDialogOpened] = useState(false);
  const [stateFields, setsStateFields] = useState();

  useLoadPage(async () => {
    if (location.hash === '#edit') navigate(pathname, { replace: true });
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // Fetch the book from the user
      axios
        .get(API_ORIGIN + '/user/u', {
          headers: { 'x-access-token': accessToken },
        })
        .then(({ data: user }) => {
          const userBids = user.bids.filter((bid) => bid.uuid === urlUuid);

          if (userBids.length) {
            setBidData({ user: user, ...userBids[0] });

            setsStateFields(
              stateFieldsBase.map((stateField) => {
                stateField.defaultValue = userBids[0][stateField.id];
                return stateField;
              })
            );

            setPageStatus('owner');
          } else fetchBidFromUrl();
        })
        .catch((err) => {
          if (getStatusCode(err) === 404) {
            navigate(`/login`, {
              replace: true,
              state: { destination: pathname },
            });
          } else console.log(err);
        });
    } else {
      fetchBidFromUrl();
    }
  });

  useNavigationInterceptor(({ location }) => {
    if (pageStatus === 'edit' && location.hash === '') setPageStatus('owner');
    else if (pageStatus === 'owner' && location.hash === '#edit')
      setPageStatus('edit');
  });

  const fetchBidFromUrl = async () => {
    // Fetch the book from its uuid
    axios
      .get(API_ORIGIN + '/bid', { params: { uuid: urlUuid } })
      .then(({ data: bid }) => {
        setBidData(bid);
        setPageStatus('active');
      })
      .catch((err) => {
        if (getStatusCode(err) === 404) {
          setPageStatus('not found');
        } else console.log(err);
      });
  };

  const switchToEdit = () => {
    if (!pageStatus === 'owner') return navigate(pathname, { replace: true });

    navigate(pathname + '#edit');
    stateFields.forEach((stateField) => {
      setValue(stateField.id, bidData[stateField.id]);
    });

    setPageStatus('edit');
  };

  const onSubmitChange = (values) => {
    axios
      .put(
        API_ORIGIN + '/bid',
        { uuid: bidData.uuid, ...values },
        {
          headers: { 'x-access-token': localStorage.accessToken },
        }
      )
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleDeleteDialog = () => {
    setDleteDialogOpened(!deleteDialogOpened);
  };

  const deleteBid = (sold) => {
    console.log(localStorage.accessToken);
    axios
      .delete(API_ORIGIN + '/bid', {
        headers: { 'x-access-token': localStorage.accessToken },
        data: { uuid: bidData.uuid, sold: sold },
      })
      .then(() => {
        navigate('/user/u');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    pageStatus,
    bidData: {
      ...bidData,
      customisation: customisationOptions[bidData.customisation],
      condition: conditionOptions[bidData.condition],
    },
    institutions: bidData && bidData.user && bidData.user.institutions,
    switchToEdit,
    stateFields,
    register,
    errors,
    setValue,
    onSubmitChange: handleSubmit(onSubmitChange),
    deleteDialogOpened,
    toggleDeleteDialog,
    deleteBid,
  };
};

export default BidLogic;
