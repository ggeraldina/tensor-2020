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
    };

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
                        label="Номер телефона"
                        required
                        placeholder="8 999 999 99 99"
                        onChange={(e: { target: { value: string }}) => setPhone(e.target.value)}
                    />
                    <TextInputField
                        label="Пароль для отмены бронирования"
                        required
                        placeholder="Например, день рождения бабушки"
                        onChange={(e: { target: { value: string }}) => setPassword(e.target.value)}
                    />
                </Pane>
            </Dialog>
            <Dialog
                isShown={bookingError}
                title="Извините, не удалось подтвердить бронирование :("
                onConfirm={() => setBookingError(false)}
                confirmLabel="OK"
                hasCancel={false}
                hasClose={false}>
                Попробуйте позже
            </Dialog>
            <Dialog
                isShown={bookingNumber.isShown}
                title="Ваше бонирование подтверждено!"
                onConfirm={() => setRedirect(true)}
                confirmLabel="OK"
                hasCancel={false}
                hasClose={false}>
                <div>
                    <Text
                        size={500}>
                        Номер вашего бронирования: {bookingNumber.id}
                    </Text>
                </div>
                <div>
                    <Text
                        color="#E4E7EB"
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