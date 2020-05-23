import React from 'react';
import { TExample } from '../../types';

const Example: React.SFC<TExample> = (props): JSX.Element => {
  const { message } = props;

  return (
    <div className="example">{message}</div>
  );
};

export default Example;
