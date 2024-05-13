import  { useState } from 'react';
import PropTypes from 'prop-types';

const DatePicker = ({ label, value, onChange }) => {
  const [date, setDate] = useState(value);

  const handleChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    onChange(newDate);
  };

  return (
    <div>
      <label>{label}</label>
      <input type="date" value={date} onChange={handleChange} />
    </div>
  );
};

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DatePicker;