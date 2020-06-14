import React, { useState, useEffect } from 'react';
import { ITicket } from '../../types';
import HallSeat from '../HallSeat/HallSeat';
import Booking from '../Booking/Booking';
import { Spinner } from 'evergreen-ui';

/**
 * Схема зала.
*/

const HallLayout: React.FC<{ id: string, tickets: ITicket[]}> = ({ id, tickets }): JSX.Element => {
    const blLayout: ITicket[][] = [];
    const initSelected: string[] = [];
    const [layout, setLayout] = useState(blLayout);
    const [selected, setSelected] = useState(initSelected);
    const [totalPrice, setTotalPrice] = useState(0);

    /** Начальная инициализаци - группировка мест по рядам. */
    useEffect(() => {
        tickets.forEach((ticket) => {
            if (!blLayout[ticket.row]) {
                blLayout[ticket.row] = [];
            }
            blLayout[ticket.row][ticket.seat] = ticket;
        });
        setLayout(blLayout);
    }, [tickets]);

    /**
     * Обработчик клика на место.
     * Снимаем/ставим выделение. Отслеживаем все выбранные места. Считаем итоговую стоимость билетов.
     */
    const clickSeat = (seat: ITicket): void => {
        if (!seat.is_booked) {
            const inSelected: string | undefined = selected.find((item) => item === seat.id);
            const curLayout: ITicket[][] = layout.slice();
            const curSelected: string[] = selected.slice();
            let curTotalPrice: number = totalPrice;

            if (inSelected) {
                const index: number = curSelected.findIndex((item) => item === inSelected);
                curSelected.splice(index, 1);
                curLayout[seat.row][seat.seat] = {
                    ...curLayout[seat.row][seat.seat],
                    selected: false       
                };
                curTotalPrice -= seat.price;
            } else {
                curSelected.push(seat.id);
                curLayout[seat.row][seat.seat] = {
                    ...curLayout[seat.row][seat.seat],
                    selected: true       
                };
                curTotalPrice += seat.price;
            }
            setLayout(curLayout);
            setSelected(curSelected);
            setTotalPrice(curTotalPrice);
        }
    }

    return (
        <div className="hall-layout">
            {layout.length > 0 ?
            <>
                <div className="hall-layout__seating">
                    {layout.map((row, rowIndex) => (
                    <div key={rowIndex}>
                        <span className="hall-layout__row-number">{rowIndex}</span>
                        {row.map((seat) => (
                            <span key={seat.id} onClick={(e) => clickSeat(seat)}>
                                <HallSeat
                                    seat={seat}
                                    rowLength={row.length}
                                />
                            </span>
                        ))}
                    </div>
                    ))}
                </div>
                <div className="hall-layout__booking">
                    <Booking
                        selected={selected}
                        totalPrice={totalPrice}
                        eventId={id}
                    />
                </div>
            </>
            : <Spinner />
            }
        </div>
    );
};

export default HallLayout;
