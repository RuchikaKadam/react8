import React from 'react';

const SubjectDetails = ({ increase, decrease, subject, hour }) => {
  return (
    <div className="subject-details">
      <p>{subject}</p>
      <p>{hour} {(hour>1)?"Hours":"Hour"}</p>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
};

export default SubjectDetails;
