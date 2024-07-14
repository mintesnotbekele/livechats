import React from 'react';

const Typing: React.FC = () => {
  return (
    <div className="messages__item messages__item--typing">
      <span className="messages__dot" />
      <span className="messages__dot" />
      <span className="messages__dot" />
    </div>
  );
};

export default Typing;
