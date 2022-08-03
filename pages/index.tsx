import React from 'react';

import { Home, SpacestagramType } from '../components/Home';
import { Modal } from '../components/Modal';
import { useApodContext } from '../hooks/useApodContext';
import { DateTime } from 'luxon';

const Homepage = ({
  initialItems,
  initialEndDateISOString,
}: {
  initialItems: Array<SpacestagramType>;
  initialEndDateISOString: string;
}) => {
  const { setLoading, likedItems, setItemLikedOrNotLiked } = useApodContext();

  return (
    <>
      <Home
        initialItems={initialItems}
        setLoading={setLoading}
        likedItems={likedItems}
        setItemLikedOrNotLiked={setItemLikedOrNotLiked}
        initialEndDateISOString={initialEndDateISOString}
      />
      <Modal />
    </>
  );
};

export default Homepage;

export async function getServerSideProps() {
  const endDate = DateTime.now();
  const startDate = endDate.minus({ days: 8 });

  const endDateString = endDate.toFormat('yyyy-MM-dd');
  const startDateString = startDate.toFormat('yyyy-MM-dd');

  const response = await fetch(
    `https://apod.ellanan.com/api?start_date=${startDateString}&end_date=${endDateString}`
  );
  const result = await response.json();
  return {
    props: {
      initialItems: result,
      initialEndDateISOString: endDate.toISO(),
    },
  };
}
