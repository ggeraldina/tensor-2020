import React, { useEffect, useState } from 'react';
import { IBookingResult } from '../../types';
import { fetchBooking } from '../../api/booking';
import { Button, Dialog, Pane, TextInputField, Text } from 'evergreen-ui';
import { Redirect } from 'react-router-dom';


/**
 * Кнопка бронирования с панелью бронирования.
 */

const Booking: React.FC<{ eventId: string, selected: string[], totalPrice: number }> = ({ eventId, selected, totalPrice }): JSX.Element => {
    const initTickets: { id : string }[] = [];
    const [tickets, setTickets] = useState(initTickets);
    const initBooking: { isShown?: boolean; isLoading?: boolean } = { isShown: false, isLoading: false };
    const [booking, setBooking] = useState(initBooking);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errorPhone, setErrorPhone] = useState(true);
    const [errorPassword, setErrorPassword] = useState(true); 
    const [bookingError, setBookingError] = useState(false);
    const [bookingNumber, setBookingNumber] = useState({ isShown: false, id: 0 });
    const [redirect, setRedirect] = useState(false);

    /** Начальная инициализаци - формирование массива билетов в формате, ожидаемом для БЛ. */
    useEffect(() => {
        let curTickets: { id : string }[]; 
        curTickets = selected.map((item) => {
            return { id: item };
        });
        setTickets(curTickets);
    }, [selected]);

    /** Отправляем запрос бронирования выбранных мест и обрабатываем результат. */
    const sendBooking = () => {
        if (!errorPassword && !errorPhone) {
            fetchBooking({phone_number: phone, password_to_cancel: password, event: eventId, tickets: tickets})
            .then((result: IBookingResult) => {
                if (result.is_success) {
                    setBookingNumber({ isShown: true, id: result.id });
                } else {
                    setBookingError(true);
                }
                setBooking({ isShown: false });
            })
            .catch((error) => {
                setBookingError(true);
            })
        }
    };

    /** Валидация для номера телефона и сохранение значения в случае успеха. */
    const validatePhone = (value: string): void => {
        const regExp = /^\d+$/;

        if (value.length < 4 || !value.match(regExp)) {
            setErrorPhone(true)
        } else {
            setErrorPhone(false);
            setPhone(value);
        }
    };

    /** Валидация для пароля и сохранение значения в случае успеха. */
    const validatePassword = (value: string): void => {
        if (value.length < 8) {
            setErrorPassword(true)
        } else {
            setErrorPassword(false);
            setPassword(value);
        }
    }

    return (
        <Pane>
            <Dialog
                isShown={booking.isShown}
                title="Заполните необходимые поля для бронирования"
                onCloseComplete={() => setBooking({ isShown: false })}
                confirmLabel={booking.isLoading ? 'Бронирование...' : 'Забронировать'}
                onConfirm={() => sendBooking()}
                cancelLabel="Отмена">
                <Pane>
                    <TextInputField
                        isInvalid={errorPhone}
                        validationMessage={errorPhone && 'Это поле обязательно для заполнения и должно содержать минимум 4 цифры'}
                        label="Номер телефона"
                        placeholder="89099999999"
                        onChange={(e: { target: { value: string }}) => validatePhone(e.target.value)}
                    />
                    <TextInputField
                        isInvalid={errorPassword}
                        validationMessage={errorPassword && 'Это поле обязательно для заполнения и должно содержать минимум 8 символов'}
                        label="Пароль для отмены бронирования"
                        placeholder="Например, день рождения бабушки"
                        onChange={(e: { target: { value: string }}) => validatePassword(e.target.value)}
                    />
                </Pane>
            </Dialog>
            <Dialog
                isShown={bookingError}
                title="Извините, не удалось подтвердить бронирование :("
                onConfirm={() => setBookingError(false)}
                confirmLabel="OK"
                intent="danger"
                hasCancel={false}
                hasClose={false}>
                Попробуйте позже
            </Dialog>
            <Dialog
                isShown={bookingNumber.isShown}
                title="Ваше бонирование подтверждено!"
                onConfirm={() => setRedirect(true)}
                confirmLabel="OK"
                intent="success"
                hasCancel={false}
                hasClose={false}>
                <div>
                    <Text
                        size={600}>
                        Номер вашего бронирования: {bookingNumber.id}
                    </Text>
                </div>
                <div>
                    <Text
                        size={300}>
                        Сообщите номер бронирования в кассе театра, оплатите и получите Ваши билеты. Вы всегда можете отменить бронирование на нашем сайте в разделе "Бронирования".
                    </Text>
                </div>
            </Dialog>
            <Pane
                padding={16}>
                <Text
                    paddingRight={20}
                    size={600}>
                        Итого: {totalPrice} p.
                </Text>
                <Button
                    height={48}
                    intent="success"
                    appearance="primary"
                    title={!tickets.length && 'Ничего не выбрано для бронирования'}
                    disabled={!tickets.length}
                    onClick={() => tickets.length && setBooking({ isShown: true })}>
                        Забронировать
                </Button>
            </Pane>
            {redirect && <Redirect to='/'/>}
        </Pane>
    );
};

export default Booking;