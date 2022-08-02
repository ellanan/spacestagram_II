import { useCallback, useState } from 'react';

import { Home } from '../components/Home';
import { Liked } from '../components/Liked';
import { Modal } from '../components/Modal';
import { useLocalStorage } from '../hooks/useLocalStorage'

function Homepage() {
    const [loading, setLoading] = useState(true);

    const [likedItems, setLikedItems] = useLocalStorage(
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

    return (
        <div>
            <Home
                setLoading={setLoading}
                likedItems={likedItems}
                setItemLikedOrNotLiked={setItemLikedOrNotLiked}
            />
            <Liked
                setLoading={setLoading}
                likedItems={likedItems}
                setItemLikedOrNotLiked={setItemLikedOrNotLiked}
            />
            <Modal
                likedItems={likedItems}
                setItemLikedOrNotLiked={setItemLikedOrNotLiked}
            />
        </div>
    );
}

export default Homepage;