import React from 'react';
import PropTypes from 'prop-types';

function CommentForm(props) {
  return (
    <form className={props.name}>
      <label>{props.label}</label>
      <input
        value={props.commentInput}
        type="text"
        onChange={props.onChange}
      />
      <button onClick={props.onClick}>{props.buttonText}</button>
    </form>
  );
}

CommentForm.PropTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  commentInput: PropTypes.string,
  onChange: PropTypes.func,
  buttonText: PropTypes.string
};

export default CommentForm;