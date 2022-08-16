import { useRef, useState } from 'react';

import PageLogicHelper from '../../helpers/PageLogicHelper';

const AutocompleteBookAttrLogic = ({
  customPrefix,
  attr,
  onSelect,
  wholeBook,
}) => {
  const { API_ORIGIN, axios } = PageLogicHelper();
  const [booksList, setBooksList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const lastSearchValue = useRef('kljdsklfjhsdafkldjashfkdjshajk');
  const searchTimer = useRef();

  const onChange = ({ target }) => {
    setSearchValue(target.value || '');

    if (
      !target.value ||
      (target.value.length > lastSearchValue.current.length &&
        lastSearchValue.current.length) ||
      Boolean(searchTimer.current)
    )
      return;

    setLoading(true);
    searchTimer.current = setTimeout(() => {
      lastSearchValue.current = target.value;

      if (wholeBook) {
        // Fetch the attr of the books who match
        axios
          .get(API_ORIGIN + '/book/search', {
            params: {
              [attr]: target.value,
            },
          })
          .then(({ data }) => {
            setBooksList(data);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setLoading(false);
          });
      } else {
        // Fetch the attr of the books who match
        axios
          .get(API_ORIGIN + '/book/suggestions', {
            params: { attr: attr, match: target.value },
          })
          .then(({ data }) => {
            let newBooksAttr = [];
            for (const newBookAttr of data /* .map((book) => book[attr]) */) {
              !newBooksAttr.includes(newBookAttr) &&
                newBooksAttr.push(newBookAttr);
            }
            setBooksList(newBooksAttr);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setLoading(false);
          });
      }
      searchTimer.current = undefined;
    }, 500);
  };

  const handleAttrSelected = (_, newValue) => {
    if (!Boolean(newValue)) return;

    const sendsearchValue = newValue.includes(customPrefix);
    onSelect(sendsearchValue ? searchValue : newValue, sendsearchValue);
  };

  const checkBook = (book) => {
    const queryWords = searchValue.toLowerCase().split(' ');
    for (const attr of Object.keys(book)) {
      if (
        [
          'uuid',
          'isbn',
          'coverLink',
          'createdAt',
          'updatedAt',
          'nbrBids',
          'language',
        ].includes(attr)
      )
        continue;

      for (const queryWord of queryWords) {
        if (book[attr].toLowerCase().includes(queryWord)) {
          return true;
        }
      }
    }
  };

  const emptySearch = searchValue.length === 0;
  const autocompleteOptions = emptySearch
    ? []
    : wholeBook
    ? booksList.filter(checkBook)
    : [
        ...[
          !booksList
            .map((value) => value.toLowerCase())
            .includes(searchValue.toLowerCase()) && searchValue.length > 2
            ? customPrefix + ' "' + searchValue + '"'
            : undefined,
        ],
        ...booksList,
      ].filter((option) => Boolean(option));

  return {
    onChange,
    autocompleteOptions,
    handleAttrSelected,
    loading,
    emptySearch,
  };
};

export default AutocompleteBookAttrLogic;
