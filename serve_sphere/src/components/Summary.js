const Summary = ({ eventCount, volunteerCount }) => (
    <section className="summary">
        <div className="summaryCard">
            <strong>{eventCount}</strong>
            <span>📌 Events Active</span>
        </div>
        <div className="summaryCard">
            <strong>{volunteerCount}</strong>
            <span>🙋 Volunteers Joined</span>
        </div>
    </section>
);

export default Summary;
