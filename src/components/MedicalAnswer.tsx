
import React from 'react';
import { CheckCircle, AlertTriangle, Clock, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface MedicalAnswerProps {
  answer: string | null;
  isProcessing: boolean;
  processingStatus: string;
  urgency: string;
}

const MedicalAnswer: React.FC<MedicalAnswerProps> = ({ answer, isProcessing, processingStatus, urgency }) => {
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    medicalAnswer: true,
    contextualReferences: true,
    followupQuestions: true
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
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#111827] mb-2">Your question is being processed, please wait…</h2>
          <p className="text-[#6B7280]">{processingStatus}</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-[#10B981] h-2 rounded-full animate-pulse" style={{ width: '37%' }}></div>
        </div>
        <div className="text-center text-sm text-[#6B7280]">37% complete</div>
      </div>
    );
  }

  if (!answer) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#111827]">AI-Generated Medical Response</h2>
          <div className="flex items-center gap-2 px-3 py-1 bg-[#10B981] text-white rounded-full text-sm">
            <CheckCircle className="h-4 w-4" />
            Your question was successfully processed.
          </div>
        </div>

        {/* Medical Answer */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection('medicalAnswer')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-[#10B981]" />
              <h3 className="text-lg font-semibold text-[#111827]">Medical Answer</h3>
            </div>
            {expandedSections.medicalAnswer ? (
              <ChevronDown className="h-5 w-5 text-[#6B7280]" />
            ) : (
              <ChevronRight className="h-5 w-5 text-[#6B7280]" />
            )}
          </button>
          {expandedSections.medicalAnswer && (
            <div className="p-6 bg-white">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#10B981] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-[#111827]">Blood pressure readings within normal range (120/80 mmHg)</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#F59E0B] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-[#111827]">Cholesterol levels slightly elevated (210 mg/dL)</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#10B981] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-[#111827]">Heart rate consistent and regular (72 bpm)</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#F59E0B] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-[#111827]">Vitamin D levels below optimal range</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contextual References */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection('contextualReferences')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-[#3B82F6]" />
              <h3 className="text-lg font-semibold text-[#111827]">Contextual References</h3>
            </div>
            {expandedSections.contextualReferences ? (
              <ChevronDown className="h-5 w-5 text-[#6B7280]" />
            ) : (
              <ChevronRight className="h-5 w-5 text-[#6B7280]" />
            )}
          </button>
          {expandedSections.contextualReferences && (
            <div className="p-6 bg-white">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#3B82F6] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-[#111827]">Reference to uploaded medical document findings</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#3B82F6] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-[#111827]">Cross-referenced with established medical guidelines</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Follow-up Questions */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection('followupQuestions')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-[#8B5CF6] flex items-center justify-center">
                <div className="w-2 h-2 bg-[#8B5CF6] rounded-full"></div>
              </div>
              <h3 className="text-lg font-semibold text-[#111827]">Suggested Follow-up Questions</h3>
            </div>
            {expandedSections.followupQuestions ? (
              <ChevronDown className="h-5 w-5 text-[#6B7280]" />
            ) : (
              <ChevronRight className="h-5 w-5 text-[#6B7280]" />
            )}
          </button>
          {expandedSections.followupQuestions && (
            <div className="p-6 bg-white">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#8B5CF6] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-[#111827]">What are the typical treatment options for this condition?</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#8B5CF6] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-[#111827]">When should I seek immediate medical attention?</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#8B5CF6] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-[#111827]">Are there any lifestyle modifications that could help?</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Urgency Warning */}
        {urgency === 'High' && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">This query was marked as urgent. Please consult a medical professional for immediate concerns.</span>
            </div>
          </div>
        )}

        {/* Success Message */}
        <div className="bg-[#10B981]/10 border border-[#10B981]/20 rounded-xl p-4">
          <div className="flex items-center gap-3 text-[#10B981]">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Your question was successfully processed.</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MedicalAnswer;
