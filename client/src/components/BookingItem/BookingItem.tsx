import React, { useState } from 'react';
import { IBooking } from '../../types';
import { Button, Dialog, Pane, TextInputField } from 'evergreen-ui';
import { cancelBooking } from '../../api/cancelBooking';

const BookingItem: React.SFC<IBooking> = (props): JSX.Element => {
  const { event, tickets, id, phone_number, findDeletedItem } = props;

  const [errorPassword, setErrorPassword] = useState(true); 
  const [isShown, setIsShown] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);


  let fullDate = new Date(event.start_time);
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
                  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

  /** Валидация для пароля. */
  const validatePassword = (value: string): void => {
      value.length < 8 ? setErrorPassword(true) : setErrorPassword(false);
  };

  const sendInfoForCancel = () => {
    if (!errorPassword) {
        cancelBooking({
            id: id, 
            phone_number: phone_number,
            password_to_cancel: password
        }).then((result) => {
            if (result.is_success) {
                setSuccess(true);
                setIsShown(false);
                if (findDeletedItem) {
                    findDeletedItem(id);
                }
            } else {
                setError(true);
            }
        }).catch(() => {
            setError(true);
        })
    }
  };

  return (
      <div className="booking-item">
        <h2 className="booking-item__title">Спектакль: "{ event.title }"</h2>
        <div className="booking-item__wrapper">
            <span className="booking-item__date">
                <strong>Дата:</strong> {`${fullDate.getDate()} ${months[fullDate.getMonth()]} ${fullDate.getFullYear()} г.`} <br/>
                <strong>Время начала:</strong> {`${fullDate.getHours()}:${fullDate.getMinutes()}0`}
            </span>
            <span className="booking-item__tickets-title"><strong>Билеты</strong></span>
            <ol className="booking-item__tickets">
                {tickets.map(ticket => (
                    <li className="booking-item__ticket" key={ticket.id}>
                        <span className="booking-item__info">Ряд: {ticket.row}</span>
                        <span className="booking-item__info">Место: {ticket.seat}</span>
                        <span className="booking-item__info">Цена: {ticket.price} руб.</span>
                    </li>
                ))}
            </ol>
            <Pane className="booking-item__modal">
                <Dialog
                    isShown={isShown}
                    title="Введите номер телефона для отмены брони"
                    onCloseComplete={() => setIsShown(false)}
                    onConfirm={sendInfoForCancel}
                    confirmLabel="Отменить бронь"
                    cancelLabel="Отмена"
                >
                <Pane>
                    <TextInputField
                        isInvalid={errorPassword}
                        validationMessage={errorPassword && 'Это поле обязательно для заполнения и должно содержать минимум 8 символов'}
                        label=""
                        placeholder="Например, день рождения бабушки"
                        onChange={(e: { target: { value: string }}) => { 
                            validatePassword(e.target.value);
                            setPassword(e.target.value);
                        }}
                    />
                </Pane>
                </Dialog>
                <Dialog
                    isShown={error}
                    title="Неверный пароль"
                    onConfirm={() => setError(false)}
                    confirmLabel="OK"
                    intent="danger"
                    hasCancel={false}>
                    Повторите попытку
                </Dialog>
                <Dialog
                    isShown={success}
                    title="Бронирование успешно отменено"
                    confirmLabel="OK"
                    intent="success"
                    hasCancel={false}
                    hasFooter={false}>
                </Dialog>
                <Button onClick={() => {
                    setIsShown(true);
                }}>
                    Отменить бронирование
                </Button>
            </Pane>
        </div>
      </div>
  );
};

export default BookingItem;
