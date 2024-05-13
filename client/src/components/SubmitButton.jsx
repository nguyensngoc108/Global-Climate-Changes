import PropTypes from 'prop-types';

const SubmitButton = ({ onSubmit }) => {
  return (
    <button onClick={onSubmit} className="submit-button">
      Submit
    </button>
  );
};

SubmitButton.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SubmitButton;