export interface TExample {
    message: string;
};

/** Мероприятие с краткой информацией. */
export interface IEvent {
    id: string;
    photo?: string;
    title: string;
    start_time: string;
}

/** Список всех мероприятий для разводящей страницы. */
export interface IEventList {
    events_list: IEvent[];
    hasmore: boolean;
};

/** Билет. */
export interface ITicket {
    id: string;
    row: number;
    seat: number;
    price: number;
    color_zone?: string;
    is_booked?: boolean;
    selected?: boolean;
};

/** Мероприятие с подробной информацией и с билетами на него. */
export interface IEventTickets {
    event: IDetailedEvent;
    tickets: ITicket[];
};

/** Мероприятие с подробной информацией. */
export interface IDetailedEvent extends IEvent {
    end_time: string;
    description: string;
    director: string;
    actors: string;
}

/** Возвращаемый результат бронирования. */
export interface IBookingResult {
    id: number;
    is_success: boolean;
    message: string;
}

/** Бронирование */

export interface IBooking {
    id: string;
    event: IEvent;
    tickets: ITicket[];
    phone_number?: string;
    findDeletedItem?: (value: string) => void;
}

/** Список бронирований */

export interface IBookingList {
    bookings: IBooking[];
    phone_number?: string;
}