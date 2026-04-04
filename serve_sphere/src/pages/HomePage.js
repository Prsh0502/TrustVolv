import EventForm from '../components/EventForm';
import EventList from '../components/EventList';
import '../styles/HomePage.css';

const HomePage = ({ events, form, totalVolunteers, onFormChange, onSubmit, onJoin }) => {
    return (
        <div className="homePage">
            <main className="layout">
                <EventForm form={form} onChange={onFormChange} onSubmit={onSubmit} />
                <EventList events={events} onJoin={onJoin} />
            </main>
        </div>
    );
};

export default HomePage;
