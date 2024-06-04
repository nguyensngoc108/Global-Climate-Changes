import PropTypes from 'prop-types';

const SubmitButton = ({ onSubmit }) => {
  const style = {
    backgroundColor:"#8DEEEE",
    padding: "10px 15px",
    borderRadius: "5px",
    outline: "0",
    border: "0",
    textTransform: "uppercase",
    // margin: "10px 0px",
    cursor: "pointer",
    opacity: "1.3"
  };

  return (
    <button style={style} onClick={onSubmit} className="submit-button">
      Submit
    </button>
  );
};

SubmitButton.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SubmitButton;