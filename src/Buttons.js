import React from 'react';
import PropTypes from 'prop-types';

function Buttons(props) {
  return (
    <span>
      <button onClick={props.like}>Like ({props.likes})</button>
      <button onClick={props.dislike}>Dislike ({props.dislikes})</button>
      <button onClick={props.delete}>Delete</button>
    </span>
  );
}

Buttons.ProptTypes = {
  dislike: PropTypes.func,
  dislikes: PropTypes.number,
  delete: PropTypes.func,
  like: PropTypes.func,
  likes: PropTypes.number,
};

export default Buttons;