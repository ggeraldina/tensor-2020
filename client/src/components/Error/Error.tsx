import React from 'react';

const Error: React.SFC = (): JSX.Element => {
  return (
    <div className="error container">
        <span className="error__top">500</span>
        <h1 className="error__title">Произошла ошибка не сервере</h1>
        <p className="error__text">
            Повторите попытку позднее
        </p>
    </div>
  );
};

export default Error;
