const EventCard = ({ event, onJoin }) => (
    <article className="eventCard">
        <header>
            <h3>🎪 {event.name}</h3>
            <span>📅 {event.date}</span>
        </header>
        <p className="location">📍 {event.location}</p>
        <p>{event.description || 'No description provided.'}</p>
        <div className="eventActions">
            <span>👥 {event.volunteers} volunteer{event.volunteers !== 1 ? 's' : ''}</span>
            <button onClick={() => onJoin(event.id)}>Join Now →</button>
        </div>
    </article>
);

const EventList = ({ events, onJoin }) => (
    <section className="eventList">
        <h2>🌟 Upcoming Events</h2>
        {events.length === 0 ? (
            <p>No events scheduled yet. Add one above.</p>
        ) : (

            events.map((event) => <EventCard key={event.id} event={event} onJoin={onJoin} />)
        )}
    </section>
);

export default EventList;
