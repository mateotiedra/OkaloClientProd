import React from 'react';
import NewBidLogic from '../../pages/NewBid/NewBidLogic';

export default function ({ items }) {
  const { conditionOptions, customisationOptions } = NewBidLogic({
    fromOtherPage: true,
  });

  const adaptedItems =
    Boolean(items) && Boolean(items[0]) && items[0].book
      ? items.map((bid) => {
          return {
            ...bid,
            customisation: customisationOptions[bid.customisation],
            condition: conditionOptions[bid.condition],
          };
        })
      : items;

  return { items: adaptedItems };
}
