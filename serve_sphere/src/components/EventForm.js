const EventForm = ({ form, onChange, onSubmit }) => (
    <article className="eventForm">
        <h2>📅 Create New Event</h2>
        <form onSubmit={onSubmit}>
            <label>
                🎯 Event Name
                <input type="text" value={form.name} onChange={onChange('name')} placeholder="e.g., Beach Cleanup" required />
            </label>
            <label>
                📆 Date
                <input type="date" value={form.date} onChange={onChange('date')} required />
            </label>
            <label>
                📍 Location
                <input type="text" value={form.location} onChange={onChange('location')} placeholder="e.g., Downtown Shelter" required />
            </label>
            <label>
                ✍️ Description
                <textarea value={form.description} onChange={onChange('description')} placeholder="Brief event summary" rows={3} />
            </label>
            <button type="submit">✨ Add Event</button>
        </form>
    </article>
);

export default EventForm;
