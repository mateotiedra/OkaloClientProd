import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import PageLogicHelper from '../../helpers/PageLogicHelper';

const NewBidLogic = ({ fromOtherPage }) => {
  const {
    pageStatus,
    API_ORIGIN,
    axios,
    setPageStatus,
    navigate,
    useLoadPage,
    getStatusCode,
    useNavigationInterceptor,
    pathname,
  } = PageLogicHelper();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const savedIsbn = useRef();
  const [alertState, setAlertState] = useState();
  const [isbnLoading, setIsbnLoading] = useState(false);

  useLoadPage(
    () => {
      !fromOtherPage && handleStep('step-1', true);
    },
    {
      authNeeded: !Boolean(fromOtherPage),
      actionOut: () => {
        setPageStatus('step-1');
      },
    }
  );

  useNavigationInterceptor(() => {
    const url = window.location.href.split('#');
    url && url[1] && setPageStatus(url[1]);
  });

  const handleStep = (next, replace) => {
    navigate(pathname + '#' + next, { replace: replace });
    setPageStatus(next);
  };

  const switchManual = () => {
    if (pageStatus.includes('manual')) {
      handleStep('step-1');
    } else {
      handleStep('step-1.manual');
      setAlertState({
        type: 'warning',
        text: "En renseignant ces champs manuellement ton livre sera mal répertorié. Fais-le uniquement si le livre n'a pas de code ISBN ou qu'il est inconnu.",
      });
    }
  };

  const startScan = () => {
    handleStep('step-1.scan');
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

  const conditionOptions = {
    new: 'Comme neuf',
    good: 'En bon état',
    damaged: 'Abimé',
  };

  const customisationOptions = {
    none: 'Pas dutout annoté',
    little: 'Annoté normalement',
    lot: 'Très annoté',
  };

  const stateFields = [
    {
      id: 'condition',
      label: 'État',
      radio: true,
      registration: { required: false },
      defaultValue: 'good',
      options: [
        { value: 'new', label: conditionOptions['new'] },
        { value: 'good', label: conditionOptions['good'] },
        { value: 'damaged', label: conditionOptions['damaged'] },
      ],
    },
    {
      id: 'customisation',
      label: 'Annotation',
      radio: true,
      registration: { required: false },
      defaultValue: 'little',
      options: [
        { value: 'none', label: customisationOptions['none'] },
        { value: 'little', label: customisationOptions['little'] },
        { value: 'lot', label: customisationOptions['lot'] },
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
      rows: 4,
    },
  ];

  // Manually
  const onSubmitBook = () => {
    handleStep('step-2');
  };

  // Automatically, ex : 2-7654-1005-4
  const onSubmitISBN = ({ isbn }) => {
    if (!/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(isbn)) {
      handleStep('step-1.manual');
      setAlertState({ type: 'error', text: 'Le code est incorrect' });
      return;
    }

    setIsbnLoading(true);

    axios
      .get(API_ORIGIN + '/book/isbn', { params: { isbn: isbn } })
      .then(({ data }) => {
        savedIsbn.current = data.isbn;
        for (const infoField of infoFields) {
          setValue(infoField.id, data[infoField.id]);
        }
        setAlertState({ type: 'success', text: 'Le livre a bien été trouvé' });
      })
      .catch((err) => {
        if (getStatusCode(err) === 404) {
          setAlertState({ type: 'error', text: 'Le code ISBN est inconnu' });
        } else {
          setAlertState({
            type: 'error',
            text: "Il s'est passé quelque chose que j'avais pas prévu on dirait... ",
          });
        }
      })
      .finally(() => {
        setIsbnLoading(false);
        handleStep('step-1.manual');
      });
  };

  const goBack = () => {
    navigate(-1);
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
    goBack,
    conditionOptions,
    customisationOptions,
    isbnLoading,
  };
};

export default NewBidLogic;
