import { useState, useRef } from 'react';
import { ShieldCheck, UploadCloud, X, FileText, CheckCircle, Clock, XCircle, AlertCircle, Eye, Trash2, RotateCcw, Download } from 'lucide-react';
import './CredentialsVerification.css';

const CERTIFICATE_TYPES = [
  'First Aid',
  'CPR',
  'Nursing / Medical',
  'Fire Safety',
  'Disaster Response',
  'Search & Rescue',
  'Logistics / Transport',
  'Social Work / NGO Training',
  'Other'
];

const INITIAL_CERTIFICATES = [
  {
    id: 'cert-001',
    name: 'Basic Life Support (BLS)',
    type: 'First Aid',
    authority: 'Red Cross Society',
    certId: 'RC-BLS-90210',
    issueDate: '2025-06-15',
    expiryDate: '2027-06-15',
    status: 'Verified',
    fileName: 'bls-certificate.pdf',
    note: '',
    reviewerNote: 'Verified via DigiLocker import.',
  },
  {
    id: 'cert-002',
    name: 'Advanced Fire Safety',
    type: 'Fire Safety',
    authority: 'National Fire Protection Association',
    certId: 'NFPA-AFS-445',
    issueDate: '2026-01-10',
    expiryDate: '2029-01-10',
    status: 'Pending Review',
    fileName: 'fire-safety-cert.pdf',
    note: 'Please expedite review for upcoming deployment.',
    reviewerNote: '',
  },
  {
    id: 'cert-003',
    name: 'Disaster Rescue Operations',
    type: 'Search & Rescue',
    authority: 'FEMA Training Institute',
    certId: 'FEMA-DRO-771',
    issueDate: '2023-03-12',
    expiryDate: '2024-03-12',
    status: 'Expired',
    fileName: 'disaster-rescue-cert.pdf',
    note: '',
    reviewerNote: 'Certificate expired. Please re-upload updated credential.',
  },
  {
    id: 'cert-004',
    name: 'Emergency Logistics & Relief Coordination',
    type: 'Logistics / Transport',
    authority: 'Urban Relief Network',
    certId: 'URN-LOG-2026-3344',
    issueDate: '2026-02-18',
    expiryDate: '2028-02-18',
    status: 'Verified',
    fileName: 'relief-logistics-cert.pdf',
    note: '',
    reviewerNote: 'Verified by TrustVolv organization reviewer.',
  },
];

const getStatusBadge = (status) => {
  const map = {
    'Verified': { cls: 'verified', Icon: CheckCircle },
    'Pending Review': { cls: 'pending', Icon: Clock },
    'Rejected': { cls: 'rejected', Icon: XCircle },
    'Expired': { cls: 'expired', Icon: AlertCircle },
    'Needs Re-upload': { cls: 'reupload', Icon: RotateCcw },
  };
  const entry = map[status];
  if (!entry) return null;
  const { cls, Icon } = entry;
  return <span className={`cv-status-badge ${cls}`}><Icon size={14} /> {status}</span>;
};

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

export default function CredentialsVerification() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [certificates, setCertificates] = useState(INITIAL_CERTIFICATES);
  const [selectedCert, setSelectedCert] = useState(null);
  const [uploadData, setUploadData] = useState({
    name: '', type: '', authority: '', certId: '', issueDate: '', expiryDate: '', file: null, note: ''
  });
  const [fileName, setFileName] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [successToast, setSuccessToast] = useState('');
  const fileInputRef = useRef(null);

  const verifiedSkills = [...new Set(
    certificates.filter(c => c.status === 'Verified').map(c => c.type)
  )];

  // Compute tracker state dynamically based on certificates
  const getTrackerState = () => {
    const hasCerts = certificates.length > 0;
    const hasUnderReview = certificates.some(c => c.status === 'Pending Review');
    const hasVerified = certificates.some(c => c.status === 'Verified');
    return {
      uploaded: hasCerts,
      underReview: hasUnderReview || hasVerified,
      verifiedByOrg: hasVerified,
      activeOnProfile: hasVerified,
    };
  };
  const tracker = getTrackerState();

  const showToast = (message) => {
    setSuccessToast(message);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setUploadData({ ...uploadData, file });
    }
  };

  const resetForm = () => {
    setUploadData({ name: '', type: '', authority: '', certId: '', issueDate: '', expiryDate: '', file: null, note: '' });
    setFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    const newCert = {
      id: `cert-${Date.now()}`,
      name: uploadData.name,
      type: uploadData.type,
      authority: uploadData.authority,
      certId: uploadData.certId || `AUTO-${Date.now().toString(36).toUpperCase()}`,
      issueDate: uploadData.issueDate,
      expiryDate: uploadData.expiryDate,
      status: 'Pending Review',
      fileName: fileName || 'uploaded-document.pdf',
      note: uploadData.note,
      reviewerNote: '',
    };
    setCertificates([newCert, ...certificates]);
    setShowUploadModal(false);
    resetForm();
    showToast(`"${newCert.name}" submitted for verification!`);
  };

  const handleDelete = (id) => {
    const cert = certificates.find(c => c.id === id);
    setCertificates(certificates.filter(c => c.id !== id));
    setDeleteConfirm(null);
    if (selectedCert?.id === id) setSelectedCert(null);
    showToast(`"${cert?.name}" removed.`);
  };

  const handleReupload = (cert) => {
    setUploadData({
      name: cert.name,
      type: cert.type,
      authority: cert.authority,
      certId: cert.certId,
      issueDate: cert.issueDate,
      expiryDate: cert.expiryDate,
      file: null,
      note: cert.note || ''
    });
    setFileName('');
    setCertificates(certificates.filter(c => c.id !== cert.id));
    setSelectedCert(null);
    setShowUploadModal(true);
  };

  return (
    <div className="cv-page">
      {/* Toast */}
      {successToast && (
        <div className="cv-toast">
          <CheckCircle size={18} />
          {successToast}
        </div>
      )}

      {/* Header */}
      <div className="cv-header">
        <div>
          <h2>Credentials & Verification</h2>
          <p>Manage your verified skills to access specialized dispatch missions.</p>
        </div>
        <button className="cv-btn cv-btn-primary" onClick={() => { resetForm(); setShowUploadModal(true); }}>
          <UploadCloud size={18} /> Upload Certificate
        </button>
      </div>

      {/* Verified Skills */}
      <div className="cv-skills-showcase">
        <h3>Your Verified Skills</h3>
        {verifiedSkills.length > 0 ? (
          <div className="cv-skills-badges">
            {verifiedSkills.map(skill => (
              <div key={skill} className="cv-skill-badge">
                <ShieldCheck size={16} /> {skill} Verified
              </div>
            ))}
          </div>
        ) : (
          <p className="cv-no-skills">Upload credentials to unlock verified skill badges.</p>
        )}
      </div>

      {/* Verification Workflow Tracker */}
      <div className="cv-tracker-section">
        <h3>Verification Workflow</h3>
        <div className="cv-progress-tracker">
          <div className={`cv-tracker-step ${tracker.uploaded ? 'completed' : ''}`}>
            <div className="cv-step-icon"><UploadCloud size={16} /></div>
            <span>Uploaded</span>
          </div>
          <div className={`cv-tracker-line ${tracker.uploaded ? 'completed' : ''}`}></div>
          <div className={`cv-tracker-step ${tracker.verifiedByOrg ? 'completed' : tracker.underReview ? 'active' : ''}`}>
            <div className="cv-step-icon"><Clock size={16} /></div>
            <span>Under Review</span>
          </div>
          <div className={`cv-tracker-line ${tracker.verifiedByOrg ? 'completed' : ''}`}></div>
          <div className={`cv-tracker-step ${tracker.verifiedByOrg ? 'completed' : ''}`}>
            <div className="cv-step-icon"><ShieldCheck size={16} /></div>
            <span>Verified by Org</span>
          </div>
          <div className={`cv-tracker-line ${tracker.activeOnProfile ? 'completed' : ''}`}></div>
          <div className={`cv-tracker-step ${tracker.activeOnProfile ? 'completed' : ''}`}>
            <div className="cv-step-icon"><CheckCircle size={16} /></div>
            <span>Active on Profile</span>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="cv-grid">
        {certificates.length === 0 && (
          <div className="cv-empty-state">
            <UploadCloud size={48} />
            <h3>No certificates uploaded</h3>
            <p>Upload your first training certificate to get started.</p>
            <button className="cv-btn cv-btn-primary" onClick={() => { resetForm(); setShowUploadModal(true); }}>
              <UploadCloud size={18} /> Upload Certificate
            </button>
          </div>
        )}
        {certificates.map(cert => (
          <div key={cert.id} className={`cv-card ${selectedCert?.id === cert.id ? 'selected' : ''}`} onClick={() => setSelectedCert(cert)}>
            <div className="cv-card-top">
              <div className="cv-card-icon">
                <FileText size={24} />
              </div>
              {getStatusBadge(cert.status)}
            </div>

            <h4 className="cv-card-title">{cert.name}</h4>
            <div className="cv-card-org">{cert.authority}</div>

            <div className="cv-card-details">
              <div className="cv-detail">
                <span className="cv-detail-label">Type</span>
                <span className="cv-detail-value">{cert.type}</span>
              </div>
              <div className="cv-detail">
                <span className="cv-detail-label">ID / Number</span>
                <span className="cv-detail-value">{cert.certId || 'N/A'}</span>
              </div>
              <div className="cv-detail">
                <span className="cv-detail-label">Issued</span>
                <span className="cv-detail-value">{formatDate(cert.issueDate)}</span>
              </div>
              <div className="cv-detail">
                <span className="cv-detail-label">Expires</span>
                <span className="cv-detail-value">{formatDate(cert.expiryDate)}</span>
              </div>
            </div>

            {/* Card Actions */}
            <div className="cv-card-actions">
              <button className="cv-card-action-btn" title="View details" onClick={(e) => { e.stopPropagation(); setSelectedCert(cert); }}>
                <Eye size={16} />
              </button>
              {(cert.status === 'Expired' || cert.status === 'Rejected' || cert.status === 'Needs Re-upload') && (
                <button className="cv-card-action-btn reupload" title="Re-upload" onClick={(e) => { e.stopPropagation(); handleReupload(cert); }}>
                  <RotateCcw size={16} />
                </button>
              )}
              <button className="cv-card-action-btn delete" title="Delete" onClick={(e) => { e.stopPropagation(); setDeleteConfirm(cert.id); }}>
                <Trash2 size={16} />
              </button>
            </div>

            <div className={`cv-card-bar ${cert.status.toLowerCase().replace(/\s+/g, '-')}`}></div>
          </div>
        ))}
      </div>

      {/* Detail Side Panel */}
      {selectedCert && (
        <div className="cv-detail-overlay" onClick={() => setSelectedCert(null)}>
          <div className="cv-detail-panel" onClick={(e) => e.stopPropagation()}>
            <div className="cv-detail-panel-header">
              <h3>Certificate Details</h3>
              <button className="cv-icon-btn" onClick={() => setSelectedCert(null)}><X size={20} /></button>
            </div>
            <div className="cv-detail-panel-body">
              <div className="cv-detail-panel-status">
                {getStatusBadge(selectedCert.status)}
              </div>
              <h4 className="cv-detail-panel-title">{selectedCert.name}</h4>
              <p className="cv-detail-panel-org">{selectedCert.authority}</p>

              <div className="cv-detail-grid">
                <div><span className="cv-lbl">Type</span><span>{selectedCert.type}</span></div>
                <div><span className="cv-lbl">ID / Number</span><span>{selectedCert.certId}</span></div>
                <div><span className="cv-lbl">Issue Date</span><span>{formatDate(selectedCert.issueDate)}</span></div>
                <div><span className="cv-lbl">Expiry Date</span><span>{formatDate(selectedCert.expiryDate)}</span></div>
                <div><span className="cv-lbl">File</span><span>{selectedCert.fileName || 'N/A'}</span></div>
                <div><span className="cv-lbl">Status</span><span>{selectedCert.status}</span></div>
              </div>

              {selectedCert.note && (
                <div className="cv-note-block">
                  <span className="cv-lbl">Your Note</span>
                  <p>{selectedCert.note}</p>
                </div>
              )}

              {selectedCert.reviewerNote && (
                <div className="cv-note-block reviewer">
                  <span className="cv-lbl">Reviewer Note</span>
                  <p>{selectedCert.reviewerNote}</p>
                </div>
              )}

              {/* Document Mock Preview */}
              <div className="cv-doc-preview">
                <div className="cv-doc-preview-header"><FileText size={16} /> Document Preview</div>
                <div className="cv-doc-preview-body">
                  <div className="cv-mock-cert">
                    <span className="cv-mock-issuer">{selectedCert.authority}</span>
                    <h3>CERTIFICATE OF COMPLETION</h3>
                    <p>This certifies that <strong>Rohan Sharma</strong> has completed</p>
                    <h4>{selectedCert.name}</h4>
                    <span className="cv-mock-id">ID: {selectedCert.certId}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="cv-detail-actions">
                {(selectedCert.status === 'Expired' || selectedCert.status === 'Rejected' || selectedCert.status === 'Needs Re-upload') && (
                  <button className="cv-btn cv-btn-primary" onClick={() => handleReupload(selectedCert)}>
                    <RotateCcw size={16} /> Re-upload Certificate
                  </button>
                )}
                <button className="cv-btn cv-btn-danger" onClick={() => setDeleteConfirm(selectedCert.id)}>
                  <Trash2 size={16} /> Delete Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="cv-modal-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="cv-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cv-modal-header">
              <h3><UploadCloud size={20} /> Upload Credential</h3>
              <button className="cv-icon-btn" onClick={() => setShowUploadModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleUploadSubmit} className="cv-modal-form">
              <div className="cv-form-row">
                <div className="cv-form-group">
                  <label>Certificate Title <span className="cv-req">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Basic First Aid"
                    value={uploadData.name}
                    onChange={e => setUploadData({ ...uploadData, name: e.target.value })}
                  />
                </div>
                <div className="cv-form-group">
                  <label>Certificate Type <span className="cv-req">*</span></label>
                  <select
                    required
                    value={uploadData.type}
                    onChange={e => setUploadData({ ...uploadData, type: e.target.value })}
                  >
                    <option value="" disabled>Select type...</option>
                    {CERTIFICATE_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="cv-form-row">
                <div className="cv-form-group">
                  <label>Issuing Authority <span className="cv-req">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Red Cross Society"
                    value={uploadData.authority}
                    onChange={e => setUploadData({ ...uploadData, authority: e.target.value })}
                  />
                </div>
                <div className="cv-form-group">
                  <label>Certificate ID / Number</label>
                  <input
                    type="text"
                    placeholder="Optional"
                    value={uploadData.certId}
                    onChange={e => setUploadData({ ...uploadData, certId: e.target.value })}
                  />
                </div>
              </div>
              <div className="cv-form-row">
                <div className="cv-form-group">
                  <label>Issue Date <span className="cv-req">*</span></label>
                  <input
                    type="date"
                    required
                    value={uploadData.issueDate}
                    onChange={e => setUploadData({ ...uploadData, issueDate: e.target.value })}
                  />
                </div>
                <div className="cv-form-group">
                  <label>Expiry Date</label>
                  <input
                    type="date"
                    value={uploadData.expiryDate}
                    onChange={e => setUploadData({ ...uploadData, expiryDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="cv-form-group">
                <label>Upload Document (PDF / Image) <span className="cv-req">*</span></label>
                <div
                  className={`cv-file-drop ${fileName ? 'has-file' : ''}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {fileName ? (
                    <>
                      <FileText size={28} />
                      <p className="cv-file-name">{fileName}</p>
                      <span className="cv-file-change">Click to change file</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud size={32} />
                      <p>Drag and drop your document here, or <span className="cv-browse">browse</span></p>
                      <span className="cv-file-hint">PDF, JPG, PNG up to 10MB</span>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    required={!fileName}
                    className="cv-file-input"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <div className="cv-form-group">
                <label>Additional Notes (Optional)</label>
                <textarea
                  rows="2"
                  placeholder="Any details for the reviewing organization..."
                  value={uploadData.note}
                  onChange={e => setUploadData({ ...uploadData, note: e.target.value })}
                />
              </div>

              <div className="cv-modal-footer">
                <button type="button" className="cv-btn cv-btn-secondary" onClick={() => setShowUploadModal(false)}>Cancel</button>
                <button type="submit" className="cv-btn cv-btn-primary">
                  <UploadCloud size={16} /> Submit for Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="cv-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="cv-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <Trash2 size={32} className="cv-confirm-icon" />
            <h3>Delete Certificate?</h3>
            <p>This action cannot be undone. The certificate will be permanently removed from your profile.</p>
            <div className="cv-confirm-actions">
              <button className="cv-btn cv-btn-secondary" onClick={() => setDeleteConfirm(null)}>Keep It</button>
              <button className="cv-btn cv-btn-danger" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
