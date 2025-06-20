
import React from 'react';
import { CheckCircle, AlertTriangle, Loader, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface MedicalAnswerProps {
  answer: string | null;
  isProcessing: boolean;
  processingStatus: string;
  urgency: string;
}

const MedicalAnswer: React.FC<MedicalAnswerProps> = ({ answer, isProcessing, processingStatus, urgency }) => {
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    answer: true,
    references: true,
    followup: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (isProcessing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Loader className="h-6 w-6 text-emerald-600 animate-spin" />
          <h2 className="text-2xl font-bold text-gray-900">Generating Medical Response</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <Loader className="h-5 w-5 text-blue-600 animate-spin" />
            <div>
              <div className="font-medium text-blue-900">Please wait...</div>
              <div className="text-blue-700 text-sm">{processingStatus}</div>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-emerald-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!answer) return null;

  const sections = answer.split('**').filter(section => section.trim());
  const medicalAnswerSection = sections.find(s => s.includes('Medical Answer:'))?.replace('Medical Answer:', '').trim();
  const contextualReferencesSection = sections.find(s => s.includes('Contextual References:'))?.replace('Contextual References:', '').trim();
  const followupSection = sections.find(s => s.includes('Suggested Follow-up Questions:'))?.replace('Suggested Follow-up Questions:', '').trim();
  const importantNoteSection = sections.find(s => s.includes('Important Note:'))?.replace('Important Note:', '').trim();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <CheckCircle className="h-6 w-6 text-emerald-600" />
        <h2 className="text-2xl font-bold text-gray-900">AI-Generated Medical Response</h2>
      </div>

      {/* Success Message */}
      <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
        <CheckCircle className="h-5 w-5 text-emerald-600" />
        <span className="font-medium text-emerald-800">Your question was successfully processed.</span>
      </div>

      {/* Urgency Warning */}
      {urgency === 'High' && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <div>
            <div className="font-medium text-red-800">High Urgency Query</div>
            <div className="text-red-700 text-sm">This query was marked as urgent. Please consult a medical professional for immediate concerns.</div>
          </div>
        </div>
      )}

      {/* Medical Answer Section */}
      {medicalAnswerSection && (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection('answer')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900">Medical Answer</h3>
            {expandedSections.answer ? (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
          </button>
          {expandedSections.answer && (
            <div className="p-4 bg-white">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{medicalAnswerSection}</p>
            </div>
          )}
        </div>
      )}

      {/* Contextual References Section */}
      {contextualReferencesSection && (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection('references')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900">Contextual References</h3>
            {expandedSections.references ? (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
          </button>
          {expandedSections.references && (
            <div className="p-4 bg-white">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{contextualReferencesSection}</p>
            </div>
          )}
        </div>
      )}

      {/* Follow-up Questions Section */}
      {followupSection && (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection('followup')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900">Suggested Follow-up Questions</h3>
            {expandedSections.followup ? (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
          </button>
          {expandedSections.followup && (
            <div className="p-4 bg-white">
              <div className="space-y-2">
                {followupSection.split('•').filter(q => q.trim()).map((question, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span className="text-gray-700">{question.trim()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Important Note */}
      {importantNoteSection && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <div className="font-medium text-yellow-800 mb-1">Important Note</div>
              <p className="text-yellow-700 text-sm leading-relaxed">{importantNoteSection}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalAnswer;
