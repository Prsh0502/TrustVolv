import { useState } from 'react';
import { ShieldCheck, Search, CheckCircle, XCircle, AlertCircle, Clock, FileText, ChevronDown, Check, X, FileQuestion, RotateCcw } from 'lucide-react';
import './VerificationQueue.css';

const MOCK_QUEUE = [
  {
    id: 'vq-001',
    volunteerId: 'vol-442',
    volunteerName: 'Rohan Sharma',
    avatar: 'RS',
    certificateName: 'Advanced Fire Safety',
    type: 'Fire Safety',
    authority: 'National Fire Protection Association',
    certId: 'NFPA-AFS-445',
    issueDate: '2026-01-10',
    expiryDate: '2029-01-10',
    status: 'Pending Review',
    submittedAt: '2 hours ago',
    note: 'Please review for my upcoming mountain rescue deployment.',
    reviewerNote: '',
  },
  {
    id: 'vq-002',
    volunteerId: 'vol-891',
    volunteerName: 'Aisha Khan',
    avatar: 'AK',
    certificateName: 'Wilderness First Responder',
    type: 'Search & Rescue',
    authority: 'NOLS',
    certId: 'NOLS-WFR-991',
    issueDate: '2025-11-20',
    expiryDate: '2027-11-20',
    status: 'Pending Review',
    submittedAt: '5 hours ago',
    note: '',
    reviewerNote: '',
  },
  {
    id: 'vq-003',
    volunteerId: 'vol-104',
    volunteerName: 'Priya Desai',
    avatar: 'PD',
    certificateName: 'Basic Trauma Life Support',
    type: 'Nursing / Medical',
    authority: 'Medical Council of India',
    certId: 'MCI-BTLS-332',
    issueDate: '2023-05-14',
    expiryDate: '2025-05-14',
    status: 'Verified',
    submittedAt: '2 days ago',
    note: '',
    reviewerNote: 'All checks passed. Certificate is authentic.',
  },
  {
    id: 'vq-004',
    volunteerId: 'vol-227',
    volunteerName: 'David Chen',
    avatar: 'DC',
    certificateName: 'Heavy Machinery Operation',
    type: 'Logistics / Transport',
    authority: 'Transport Authority',
    certId: 'TA-HMO-009',
    issueDate: '2021-02-10',
    expiryDate: '2024-02-10',
    status: 'Expired',
    submittedAt: '1 week ago',
    note: '',
    reviewerNote: 'Certificate has expired. Volunteer needs to renew.',
  },
  {
    id: 'vq-005',
    volunteerId: 'vol-556',
    volunteerName: 'Sneha Kumar',
    avatar: 'SK',
    certificateName: 'Basic CPR & AED Certification',
    type: 'CPR',
    authority: 'Indian Red Cross Society',
    certId: 'IRCS-CPR-2026-8821',
    issueDate: '2026-02-01',
    expiryDate: '2028-02-01',
    status: 'Pending Review',
    submittedAt: '12 hours ago',
    note: 'Recently completed. Awaiting approval.',
    reviewerNote: '',
  },
];

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

const getStatusBadge = (status) => {
  const map = {
    'Verified': { cls: 'vq-badge-verified', Icon: CheckCircle },
    'Pending Review': { cls: 'vq-badge-pending', Icon: Clock },
    'Rejected': { cls: 'vq-badge-rejected', Icon: XCircle },
    'Expired': { cls: 'vq-badge-expired', Icon: AlertCircle },
    'Needs Re-upload': { cls: 'vq-badge-reupload', Icon: RotateCcw },
  };
  const entry = map[status];
  if (!entry) return null;
  const { cls, Icon } = entry;
  return <span className={`vq-badge ${cls}`}><Icon size={14} /> {status}</span>;
};

export default function VerificationQueue() {
  const [queue, setQueue] = useState(MOCK_QUEUE);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [actionNote, setActionNote] = useState('');
  const [toast, setToast] = useState('');

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 3000);
  };

  const handleAction = (id, newStatus) => {
    const item = queue.find(q => q.id === id);
    const updated = queue.map(q =>
      q.id === id ? { ...q, status: newStatus, reviewerNote: actionNote || q.reviewerNote } : q
    );
    setQueue(updated);
    // Also update selectedItem so the panel reflects the new status
    const updatedItem = updated.find(q => q.id === id);
    setSelectedItem(updatedItem);
    setActionNote('');

    const actionLabels = {
      'Verified': 'approved',
      'Rejected': 'rejected',
      'Expired': 'marked as expired',
      'Needs Re-upload': 'flagged for re-upload',
    };
    showToast(`${item.volunteerName}'s certificate ${actionLabels[newStatus] || 'updated'}.`);
  };

  const filteredQueue = queue.filter(item => {
    const matchesFilter = filter === 'All' || item.status === filter;
    const matchesSearch = item.volunteerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.certificateName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pendingCount = queue.filter(q => q.status === 'Pending Review').length;
  const verifiedCount = queue.filter(q => q.status === 'Verified').length;

  return (
    <div className="vq-page">
      {/* Toast */}
      {toast && (
        <div className="vq-toast">
          <CheckCircle size={18} />
          {toast}
        </div>
      )}

      <div className="vq-header">
        <div>
          <h2>Volunteer Verification Queue</h2>
          <p>Review and authenticate volunteer credentials before dispatch.</p>
        </div>
        <div className="vq-stats">
          <div className="vq-stat-badge vq-stat-pending">
            <span className="vq-stat-number">{pendingCount}</span>
            <span className="vq-stat-label">Pending</span>
          </div>
          <div className="vq-stat-badge vq-stat-verified">
            <span className="vq-stat-number">{verifiedCount}</span>
            <span className="vq-stat-label">Verified</span>
          </div>
        </div>
      </div>

      <div className="vq-controls">
        <div className="vq-search-bar">
          <Search size={18} className="vq-search-icon" />
          <input
            type="text"
            placeholder="Search volunteers, skills, or certificates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="vq-filter-group">
          {['All', 'Pending Review', 'Verified', 'Expired', 'Rejected'].map(f => (
            <button
              key={f}
              className={`vq-filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="vq-content">
        {/* List View */}
        <div className="vq-list">
          {filteredQueue.length === 0 ? (
            <div className="vq-empty-state">
              <ShieldCheck size={48} />
              <h3>No credentials found</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          ) : (
            filteredQueue.map(item => (
              <div
                key={item.id}
                className={`vq-list-item ${selectedItem?.id === item.id ? 'selected' : ''}`}
                onClick={() => { setSelectedItem(item); setActionNote(''); }}
              >
                <div className="vq-avatar">{item.avatar}</div>
                <div className="vq-vol-info">
                  <span className="vq-vol-name">{item.volunteerName}</span>
                  <span className="vq-vol-time">Submitted {item.submittedAt}</span>
                </div>

                <div className="vq-vol-cert">
                  <span className="vq-cert-type">{item.type}</span>
                  <span className="vq-cert-title">{item.certificateName}</span>
                </div>

                <div className="vq-vol-status">
                  {getStatusBadge(item.status)}
                </div>

                <ChevronDown size={20} className="vq-chevron" />
              </div>
            ))
          )}
        </div>

        {/* Detail Panel */}
        {selectedItem ? (
          <div className="vq-detail-panel vq-slide-in" key={selectedItem.id + selectedItem.status}>
            <div className="vq-detail-header">
              <h3>Credential Details</h3>
              <button className="vq-icon-btn" onClick={() => setSelectedItem(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="vq-detail-body">
              <div className="vq-profile-summary">
                <div className="vq-avatar large">{selectedItem.avatar}</div>
                <div>
                  <h4>{selectedItem.volunteerName}</h4>
                  <p className="vq-vol-id">ID: {selectedItem.volunteerId}</p>
                </div>
                <div className="vq-detail-badge-wrap">
                  {getStatusBadge(selectedItem.status)}
                </div>
              </div>

              <div className="vq-data-grid">
                <div className="vq-data-group full">
                  <label>Certificate Title</label>
                  <p>{selectedItem.certificateName}</p>
                </div>
                <div className="vq-data-group">
                  <label>Type / Skill Area</label>
                  <p><ShieldCheck size={14} /> {selectedItem.type}</p>
                </div>
                <div className="vq-data-group">
                  <label>Issuing Authority</label>
                  <p>{selectedItem.authority}</p>
                </div>
                <div className="vq-data-group">
                  <label>ID / Number</label>
                  <p>{selectedItem.certId || 'N/A'}</p>
                </div>
                <div className="vq-data-group">
                  <label>Issue Date</label>
                  <p>{formatDate(selectedItem.issueDate)}</p>
                </div>
                <div className="vq-data-group">
                  <label>Expiry Date</label>
                  <p className={new Date(selectedItem.expiryDate) < new Date() ? 'vq-text-expired' : ''}>
                    {formatDate(selectedItem.expiryDate)}
                  </p>
                </div>
              </div>

              {selectedItem.note && (
                <div className="vq-note-block">
                  <label>Volunteer Note</label>
                  <p>"{selectedItem.note}"</p>
                </div>
              )}

              {selectedItem.reviewerNote && (
                <div className="vq-note-block reviewer">
                  <label>Reviewer Note</label>
                  <p>"{selectedItem.reviewerNote}"</p>
                </div>
              )}

              <div className="vq-doc-preview">
                <div className="vq-doc-header">
                  <FileText size={16} /> Attached Document (Mock)
                </div>
                <div className="vq-doc-body">
                  <div className="vq-mock-cert">
                    <span className="vq-mock-issuer">{selectedItem.authority}</span>
                    <h3>CERTIFICATE OF COMPLETION</h3>
                    <p>This certifies that <strong>{selectedItem.volunteerName}</strong> has completed</p>
                    <h4>{selectedItem.certificateName}</h4>
                    <span className="vq-mock-id">ID: {selectedItem.certId}</span>
                  </div>
                </div>
              </div>

              {/* Actions for Pending Review */}
              {selectedItem.status === 'Pending Review' && (
                <div className="vq-action-section">
                  <label>Verification Note (Optional)</label>
                  <textarea
                    rows="2"
                    placeholder="Add a note for the volunteer..."
                    value={actionNote}
                    onChange={(e) => setActionNote(e.target.value)}
                  />
                  <div className="vq-action-buttons">
                    <button className="vq-action-btn reject" onClick={() => handleAction(selectedItem.id, 'Rejected')}>
                      <X size={16} /> Reject
                    </button>
                    <button className="vq-action-btn reupload" onClick={() => handleAction(selectedItem.id, 'Needs Re-upload')}>
                      <FileQuestion size={16} /> Request Re-upload
                    </button>
                    <button className="vq-action-btn approve" onClick={() => handleAction(selectedItem.id, 'Verified')}>
                      <Check size={16} /> Verify & Approve
                    </button>
                  </div>
                </div>
              )}

              {/* Actions for Verified */}
              {selectedItem.status === 'Verified' && (
                <div className="vq-action-section">
                  <button className="vq-btn vq-btn-outline full" onClick={() => handleAction(selectedItem.id, 'Expired')}>
                    <AlertCircle size={16} /> Mark as Expired
                  </button>
                </div>
              )}

              {/* Actions for Rejected / Expired */}
              {(selectedItem.status === 'Rejected' || selectedItem.status === 'Expired') && (
                <div className="vq-action-section">
                  <button className="vq-btn vq-btn-outline full" onClick={() => handleAction(selectedItem.id, 'Needs Re-upload')}>
                    <RotateCcw size={16} /> Request Re-upload
                  </button>
                </div>
              )}

              {/* Actions for Needs Re-upload */}
              {selectedItem.status === 'Needs Re-upload' && (
                <div className="vq-action-section">
                  <p className="vq-reupload-notice">Volunteer has been asked to re-upload this certificate.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="vq-detail-empty">
            <ShieldCheck size={48} className="vq-placeholder-icon" />
            <h3>Select a credential</h3>
            <p>Click on an item in the queue to review details and take action.</p>
          </div>
        )}
      </div>
    </div>
  );
}
