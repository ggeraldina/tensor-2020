import React, { useEffect } from 'react';
import { fetchEvent } from '../api/event';
import { useSelector } from '../helpers/useTypedSelector';
import { useDispatch } from 'react-redux';
import DetailedEvent from '../components/DetailedEvent/DetailedEvent';
import HallLayout from '../components/HallLayout/HallLayout';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Spinner } from 'evergreen-ui';

interface RouterProps {
    id: string;
}
 
const EventPage = (props : RouteComponentProps<RouterProps>) => {
    const event = useSelector(state => state.event);
    const detailedEvent = event.event;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEvent({id: props.match.params.id}));
    }, [dispatch]);

    return (
        <div className="main container">
            <DetailedEvent
                id={detailedEvent.id}
                title={detailedEvent.title}
                photo={detailedEvent.photo}
                start_time={detailedEvent.start_time}
                end_time={detailedEvent.end_time}
                description={detailedEvent.description}
                director={detailedEvent.director}
                actors={detailedEvent.actors}
            />
            <HallLayout
                id={detailedEvent.id}
                tickets={event.tickets}
            />
        </div>
    );
}
 
export default withRouter(EventPage);