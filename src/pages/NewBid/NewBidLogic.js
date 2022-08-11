import { useRef, useState } from 'react';
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
    getStatusCode,
  } = PageLogicHelper();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const savedIsbn = useRef();
  const [alertState, setAlertState] = useState();

  useLoadPage(
    () => {
      setPageStatus('step-1');
    },
    {
      authNeeded: true,
      actionOut: () => {
        setPageStatus('step-1');
      },
    }
  );

  const switchManual = () => {
    pageStatus.includes('manual')
      ? setPageStatus('step-1')
      : setPageStatus('step-1.manual');
  };

  const startScan = () => {
    setPageStatus('step-1.scan');
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
      registration: { required: false },
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
      registration: { required: false },
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

  // Manually
  const onSubmitBook = () => {
    setPageStatus('step-2');
  };

  // Automatically, ex : 2-7654-1005-4
  const onSubmitISBN = ({ isbn }) => {
    if (!/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(isbn)) {
      setPageStatus('step-1.manual');
      setAlertState({ error: true });
      return;
    }

    axios
      .get(API_ORIGIN + '/book/isbn', { params: { isbn: isbn } })
      .then(({ data }) => {
        savedIsbn.current = data.isbn;
        for (const infoField of infoFields) {
          setValue(infoField.id, data[infoField.id]);
        }
        setAlertState({ error: false, text: 'Le livre a bien été trouvé' });
      })
      .catch((err) => {
        if (getStatusCode(err) === 404) {
          setAlertState({ error: true, text: 'Le code ISBN est inconnu' });
        } else {
          setAlertState({
            error: true,
            text: "Il s'est passé quelque chose que j'avais pas prévu on dirait...",
          });
        }
      })
      .finally(() => {
        setPageStatus('step-1.manual');
      });
  };

  const onSubmitBid = (bookData) => {
    bookData.isbn = savedIsbn.current;
    axios
      .post(API_ORIGIN + '/bid', bookData, {
        headers: { 'x-access-token': localStorage.accessToken },
      })
      .then(({ data }) => {
        navigate('/ad/' + data.uuid);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    pageStatus,
    switchManual,
    startScan,
    register,
    errors,
    infoFields,
    stateFields,
    setValue,
    onSubmitBook: handleSubmit(onSubmitBook),
    onSubmitISBNManu: handleSubmit(onSubmitISBN),
    onSubmitISBNAuto: onSubmitISBN,
    onSubmitBid: handleSubmit(onSubmitBid),
    alertState,
  };
};

export default NewBidLogic;
