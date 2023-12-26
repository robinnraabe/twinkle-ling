import React from 'react';
import {useSelector} from 'react-redux';

function UserPage() {
  const user = useSelector((store) => store.user);

  return (
    <div className="container">
        Toggle, Language filter
      <h2>Deck List</h2>
      decks.map everything here

    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;