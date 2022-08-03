import _ from 'lodash';
import React, { useState, useCallback, useMemo } from 'react';

import { useLocalStorage } from './useLocalStorage';

const ApodContext = React.createContext<ReturnType<typeof useApodState> | null>(
  null
);

const useApodState = () => {
  const [loading, setLoading] = useState(true);

  const [likedItems, setLikedItems] = useLocalStorage<Array<string>>(
    'likedItems',
    []
  );

  const setItemLikedOrNotLiked = useCallback(
    (isLiked, itemId) => {
      setLikedItems(
        isLiked ? [...likedItems, itemId] : _.without(likedItems, itemId)
      );
    },
    [likedItems, setLikedItems]
  );

  return useMemo(
    () => ({
      loading,
      setLoading,
      likedItems,
      setLikedItems,
      setItemLikedOrNotLiked,
    }),
    [loading, likedItems, setItemLikedOrNotLiked]
  );
};

export const useApodContext = () => {
  const context = React.useContext(ApodContext);
  if (!context) {
    throw new Error(`useApodContext must be used within a ApodContext`);
  }
  return context;
};

export const ApodContextProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const apodState = useApodState();

  return (
    <ApodContext.Provider value={apodState}>{children}</ApodContext.Provider>
  );
};
