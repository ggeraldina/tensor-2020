import React, { useEffect, useState } from 'react';
import { ITicket } from '../../types';

/**
 * Кнопка бронирования с панелью бронирования.
 */

const Booking: React.FC<{ eventId: number, selected: string[], totalPrice: number }> = ({ eventId, selected, totalPrice }): JSX.Element => {
    const initTickets: { id : string }[] = [];
    const [tickets, setTickets] = useState(initTickets);

    /** Начальная инициализаци - формирование массива билетов в формате, ожидаемом для БЛ. */
    useEffect(() => {
        let curTickets: { id : string }[]; 
        curTickets = selected.map((item) => {
            return { id: item };
        });
        setTickets(curTickets);
    }, [selected]);

    return (
        <div>
            <span>Итого: {totalPrice} p.</span>
            <button onClick={(e) => alert(11)}>Забронировать</button>
        </div>
    );
};

export default Booking;