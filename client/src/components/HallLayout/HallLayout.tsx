import React, { useState, useEffect } from 'react';
import { ITicket } from '../../types';
import { fetchEvent } from '../../api/event';
import { useDispatch } from 'react-redux';
import HallSeat from '../HallSeat/HallSeat';

/**
 * Схема зала.
 */

const HallLayout: React.FC<{ tickets: ITicket[]}> = ({ tickets }): JSX.Element => {
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

    return (
        <div>
            <div className="layout">
                {layout.map((row, rowIndex) => (
                    <div>
                        <span>{rowIndex}</span>
                        {row.map((seat) => (
                            <span onClick={(e) => clickSeat(seat)}>
                                <HallSeat
                                    seat={seat}
                                    rowLength={row.length}
                                />
                            </span>
                        ))}
                    </div>
                ))}
            </div>
            <div>
                <span>Итого: {totalPrice} p.</span>
                <button onClick={(e) => alert(11)}>Забронировать</button>
            </div>
        </div>
    );
};

export default HallLayout;
