import React from 'react';
import { ITicket } from '../../types';

/**
 * Место в зале.
 */

const HallSeat: React.FC<{ seat: ITicket, rowLength: number }> = ({ seat, rowLength }): JSX.Element => {
    return (
        <span
            style={{
                marginRight: !(seat.seat - 4) || (seat.seat + 4 === rowLength - 1) ? '40px' : '4px',
                backgroundColor: seat.color_zone,
                fontWeight: seat.selected ? 'bold' : 'normal'
            }}
            title={seat.price.toString()}
            className="seat">
            {seat.seat}
        </span>
    );
};

export default HallSeat;