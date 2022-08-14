import React from 'react';
import NewBidLogic from '../../pages/NewBid/NewBidLogic';

const BidsListLogic = ({ bids }) => {
  const {
    conditionOptions,
    customisationOptions,
    stateFields: stateFieldsBase,
  } = NewBidLogic({
    fromOtherPage: true,
  });

  const adaptedBids = bids.map((bid) => {
    return {
      ...bid,
      customisation: customisationOptions[bid.customisation],
      condition: conditionOptions[bid.condition],
    };
  });

  return { bids: adaptedBids };
};

export default BidsListLogic;
