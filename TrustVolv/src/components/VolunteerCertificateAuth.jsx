import React, { useMemo, useState } from "react";
import { volunteerCertificates } from "../data/mockCertificates";
import {
    getCertificateAuthResult,
    getAuthBadgeClass,
} from "../utils/certificateAuth";

function InfoPill({ children }) {
    return (
        <span className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600">
            {children}
        </span>
    );
}

function CertificateCard({ certificate, onAuthenticate }) {
    const auth = getCertificateAuthResult(certificate);

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {certificate.certificateTitle}
                        </h3>
                        <span
                            className={`rounded-full border px-3 py-1 text-xs font-semibold ${getAuthBadgeClass(
                                auth.authState
                            )}`}
                        >
                            {auth.label}
                        </span>
                    </div>

                    <p className="text-sm text-gray-600">
                        {certificate.issuerName} • {certificate.certificateType}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                        <InfoPill>ID: {certificate.certificateId}</InfoPill>
                        <InfoPill>Source: {certificate.source}</InfoPill>
                        <InfoPill>File: {certificate.fileType}</InfoPill>
                        {certificate.qrDetected && <InfoPill>QR detected</InfoPill>}
                        {certificate.signedPdfDetected && <InfoPill>Signed PDF</InfoPill>}
                        {certificate.verificationUrl && <InfoPill>Verification link</InfoPill>}
                    </div>

                    <div className="pt-2 text-sm text-gray-600">
                        <p>Issue Date: {certificate.issueDate}</p>
                        <p>Expiry Date: {certificate.expiryDate}</p>
                        {certificate.verifiedSkill ? (
                            <p className="font-medium text-green-700">
                                Verified Skill: {certificate.verifiedSkill}
                            </p>
                        ) : null}
                    </div>

                    <div className="rounded-xl bg-gray-50 p-3 text-sm text-gray-700">
                        <p className="font-medium">Authentication Reason</p>
                        <p className="mt-1">{auth.reason}</p>
                        <p className="mt-2 text-xs text-gray-500">
                            Mock confidence score: {auth.score}/100
                        </p>
                    </div>

                    {certificate.reviewerNote ? (
                        <div className="text-sm text-gray-600">
                            <span className="font-medium text-gray-800">Reviewer Note:</span>{" "}
                            {certificate.reviewerNote}
                        </div>
                    ) : null}
                </div>

                <div className="flex min-w-[180px] flex-col gap-2">
                    <button
                        onClick={() => onAuthenticate(certificate)}
                        className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                        Authenticate Certificate
                    </button>

                    {certificate.verificationUrl ? (
                        <a
                            href={certificate.verificationUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            Open Verification Link
                        </a>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

function AuthResultModal({ result, certificate, onClose }) {
    if (!result || !certificate) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Authentication Result
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            {certificate.certificateTitle}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100"
                    >
                        Close
                    </button>
                </div>

                <div className="mt-5 space-y-4">
                    <div
                        className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${getAuthBadgeClass(
                            result.authState
                        )}`}
                    >
                        {result.label}
                    </div>

                    <div className="rounded-2xl bg-gray-50 p-4">
                        <p className="text-sm font-medium text-gray-800">Mock Verification Logic</p>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
                            <li>Checks source type such as DigiLocker or manual upload</li>
                            <li>Checks expiry date validity</li>
                            <li>Checks QR detection flag</li>
                            <li>Checks signed PDF detection flag</li>
                            <li>Checks verification link presence</li>
                            <li>Checks duplicate flag and review status</li>
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-gray-200 p-4">
                        <p className="text-sm font-medium text-gray-800">Reason</p>
                        <p className="mt-1 text-sm text-gray-600">{result.reason}</p>
                        <p className="mt-3 text-sm font-medium text-gray-800">
                            Confidence Score: {result.score}/100
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function VolunteerCertificateAuth() {
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [authResult, setAuthResult] = useState(null);

    const summary = useMemo(() => {
        const counts = {
            total: volunteerCertificates.length,
            verified: 0,
            pending: 0,
            expired: 0,
            flagged: 0,
        };

        volunteerCertificates.forEach((cert) => {
            const result = getCertificateAuthResult(cert);
            if (result.authState === "verified") counts.verified += 1;
            else if (result.authState === "pending" || result.authState === "review_ready") counts.pending += 1;
            else if (result.authState === "expired") counts.expired += 1;
            else if (result.authState === "flagged") counts.flagged += 1;
        });

        return counts;
    }, []);

    const handleAuthenticate = (certificate) => {
        const result = getCertificateAuthResult(certificate);
        setSelectedCertificate(certificate);
        setAuthResult(result);
    };

    return (
        <div className="min-h-screen bg-[#F5F4EF] p-6 text-gray-900">
            <div className="mx-auto max-w-7xl space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Credentials & Verification</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Mock certificate authentication using existing volunteer dummy data.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-2xl bg-white p-5 shadow-sm">
                        <p className="text-sm text-gray-500">Total Certificates</p>
                        <p className="mt-2 text-2xl font-bold">{summary.total}</p>
                    </div>
                    <div className="rounded-2xl bg-white p-5 shadow-sm">
                        <p className="text-sm text-gray-500">Verified</p>
                        <p className="mt-2 text-2xl font-bold text-green-700">
                            {summary.verified}
                        </p>
                    </div>
                    <div className="rounded-2xl bg-white p-5 shadow-sm">
                        <p className="text-sm text-gray-500">Pending / Review Ready</p>
                        <p className="mt-2 text-2xl font-bold text-yellow-700">
                            {summary.pending}
                        </p>
                    </div>
                    <div className="rounded-2xl bg-white p-5 shadow-sm">
                        <p className="text-sm text-gray-500">Expired / Flagged</p>
                        <p className="mt-2 text-2xl font-bold text-red-700">
                            {summary.expired + summary.flagged}
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    {volunteerCertificates.map((certificate) => (
                        <CertificateCard
                            key={certificate.id}
                            certificate={certificate}
                            onAuthenticate={handleAuthenticate}
                        />
                    ))}
                </div>
            </div>

            <AuthResultModal
                result={authResult}
                certificate={selectedCertificate}
                onClose={() => {
                    setSelectedCertificate(null);
                    setAuthResult(null);
                }}
            />
        </div>
    );
}