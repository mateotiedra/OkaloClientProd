import { useRef } from 'react';
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
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const bookData = useRef({});

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

  const infoFields = [
    {
      id: 'title',
      label: 'Titre',
      registration: { required: true },
    },
    {
      id: 'author',
      label: 'Auteur',
    },
    {
      id: 'publisher',
      label: "Maison d'édition",
      registration: { required: true },
    },
  ];

  const stateFields = [
    {
      id: 'condition',
      label: 'État',
      radio: true,
      registration: { required: true },
      defaultValue: 'good',
      options: [
        { value: 'new', label: 'Jamais ouvert' },
        { value: 'good', label: 'En bon état' },
        { value: 'damaged', label: 'Abimé' },
      ],
    },
    {
      id: 'customisation',
      label: 'Annotation',
      radio: true,
      registration: { required: true },
      defaultValue: 'little',
      options: [
        { value: 'none', label: "Rien d'annoté" },
        { value: 'little', label: 'Quelques mots' },
        { value: 'lot', label: 'Très annoté' },
      ],
    },
    {
      id: 'price',
      label: 'Prix de vente',
      registration: { required: true, pattern: /^[0-9]*\.?[0-9]*$/g },
    },
    {
      id: 'comment',
      label: 'Remarques',
      multiline: true,
    },
  ];

  const onSubmitBook = (values) => {
    bookData.current = values;
    setPageStatus('step-2');
  };

  const onSubmitISBN = ({ isbn }) => {
    console.log(isbn);
  };

  const onSubmitBid = (values) => {
    console.log(values);
  };

  return {
    pageStatus,
    switchManual,
    register,
    errors,
    infoFields,
    stateFields,
    setValue,
    onSubmitBook: handleSubmit(onSubmitBook),
    onSubmitISBN: handleSubmit(onSubmitISBN),
    onSubmitBid: handleSubmit(onSubmitBid),
  };
};

export default NewBidLogic;
