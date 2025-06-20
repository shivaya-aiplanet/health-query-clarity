
import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

const MedicalDisclaimer: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Shield className="h-5 w-5 text-blue-600" />
        Medical Disclaimer
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-2">Important Notice</p>
            <p className="leading-relaxed">
              This tool is intended for informational purposes only. Always consult a qualified healthcare provider for medical advice.
            </p>
          </div>
        </div>

        <div className="text-sm text-gray-600 space-y-2">
          <p><strong>This AI assistant:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Provides general health information</li>
            <li>Cannot diagnose medical conditions</li>
            <li>Should not replace professional medical advice</li>
            <li>May not have access to your complete medical history</li>
          </ul>
        </div>

        <div className="text-sm text-gray-600 space-y-2">
          <p><strong>Please seek immediate medical attention if:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>You have severe or worsening symptoms</li>
            <li>You experience a medical emergency</li>
            <li>You need prescription medications</li>
            <li>You require diagnostic tests or procedures</li>
          </ul>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 text-center">
            By using this service, you acknowledge that you understand these limitations and will consult with healthcare professionals for medical decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MedicalDisclaimer;
