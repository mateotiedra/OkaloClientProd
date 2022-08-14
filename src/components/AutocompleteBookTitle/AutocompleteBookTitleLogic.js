import React, { useState } from 'react';

import PageLogicHelper from '../../helpers/PageLogicHelper';

const AutocompleteBookTitleLogic = ({ onTitleSelected }) => {
  const { API_ORIGIN, axios } = PageLogicHelper();
  const [booksTitle, setBooksTitle] = useState([]);

  const onChange = ({ target }) => {
    if (!(target.value && target.value.length > 2)) return;
    axios
      .get(API_ORIGIN + '/book/suggestions', {
        params: { attr: 'title', match: target.value },
      })
      .then(({ data }) => {
        let newBooksTitle = [];
        for (const newBookTitle of data) {
          !newBooksTitle.includes(newBookTitle) &&
            newBooksTitle.push(newBookTitle);
        }
        setBooksTitle(newBooksTitle);
      })
      .catch((err) => console.log(err));
  };

  const handleTitleSelected = ({ target }) => {
    onTitleSelected(booksTitle[target.value]);
  };

  return { onChange, booksTitle, handleTitleSelected };
};

export default AutocompleteBookTitleLogic;
