import React from 'react';

import './CustomTextInput.scss';

function CustomTextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { children, ...rest } = props;
  return (
    <input className="customTextInput" type="text" {...rest}>
      {children}
    </input>
  );
}

export default CustomTextInput;
