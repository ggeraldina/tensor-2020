import React from 'react';
import { Link } from 'react-router-dom';

const Empty: React.SFC = (): JSX.Element => {
  return (
    <div className="empty container">
        <span className="empty__top">404</span>
        <h1 className="empty__title">Страница не найдена</h1>
        <p className="empty__text">
            Вы ввели неверный адрес или такой страницы не существует.
        </p>
        <Link to="/" className="empty__button">
            Вернуться на главную
        </ Link>
    </div>
  );
};

export default Empty;
