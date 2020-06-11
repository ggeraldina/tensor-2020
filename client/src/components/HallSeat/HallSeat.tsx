import React from 'react';
import { ITicket } from '../../types';
import { Tooltip, Pane } from 'evergreen-ui';

/**
 * Место в зале.
 */

const HallSeat: React.FC<{ seat: ITicket, rowLength: number }> = ({ seat, rowLength }): JSX.Element => {
    return (
        <Pane
            className="seat"
            marginRight={!(seat.seat - 4) || (seat.seat + 4 === rowLength - 1) ? '40px' : '4px'}
            backgroundColor={seat.is_booked ? '#E4E7EB' : seat.color_zone}
            backgroundImage={seat.selected ? 'linear-gradient(to bottom, #FAFBFB, #EAECEE)' : ''}
            boxShadow="0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
        >
            <Tooltip content={seat.price.toString()}>
                <Pane className="seat__number">{seat.seat}</Pane>
            </Tooltip>
        </Pane>
    );
};

export default HallSeat;