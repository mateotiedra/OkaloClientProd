import { useForm } from 'react-hook-form';
import PageLogicHelper from '../../helpers/PageLogicHelper';

const NewBidLogic = (props) => {
  const {
    pageStatus,
    API_ORIGIN,
    axios,
    setPageStatus,
    navigate,
    useLoadPage,
  } = PageLogicHelper();

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm();

  useLoadPage(
    () => {
      setPageStatus('step-1');
    },
    { authNeeded: true }
  );

  const switchManual = () => {
    pageStatus.includes('manual')
      ? setPageStatus('step-1')
      : setPageStatus('step-1.manual');
  };

  const onSubmitBook = (formData) => {
    console.log(formData.values);
  };

  const onSubmitISBN = ({ isbn }) => {
    console.log(isbn);
  };

  const onSubmitBid = (formData) => {
    console.log(formData.values);
  };

  //const onSubmit = pageStatus.includes('step-1') ? onSubmitBook : onSubmitBid;

  return {
    pageStatus,
    switchManual,
    register,
    errors,
    onSubmitBook: handleSubmit(onSubmitBook),
    onSubmitISBN: handleSubmit(onSubmitISBN),
  };
};

export default NewBidLogic;
