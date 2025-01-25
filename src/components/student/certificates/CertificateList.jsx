import React, { useState, useEffect } from 'react';
import { Download, Mail, Calendar } from 'lucide-react';
import api from '../../../lib/api';
import { formatDate } from '../../../lib/utils';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../shared/LoadingSpinner';

export default function CertificateList() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await api.get('/certificates');
      setCertificates(response.data);
    } catch (error) {
      toast.error('Failed to fetch certificates');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (certificateId) => {
    try {
      const response = await api.get(`/certificates/${certificateId}/download`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificate-${certificateId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error('Failed to download certificate');
    }
  };

  const requestEmailCopy = async (certificateId) => {
    try {
      await api.post(`/certificates/${certificateId}/email`);
      toast.success('Certificate sent to your email');
    } catch (error) {
      toast.error('Failed to send certificate');
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!certificates.length) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Certificates Yet</h3>
        <p className="text-gray-500">
          Certificates will appear here once you complete events
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Certificates</h2>
      
      <div className="grid gap-6">
        {certificates.map(certificate => (
          <div key={certificate.id} className="glass-card">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{certificate.event_name}</h3>
                <p className="text-gray-600 mt-1">
                  Issued on {formatDate(certificate.issued_at)}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Certificate ID: {certificate.certificate_id}
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => requestEmailCopy(certificate.id)}
                  className="btn btn-secondary"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email Copy
                </button>
                <button
                  onClick={() => handleDownload(certificate.id)}
                  className="btn btn-primary"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}