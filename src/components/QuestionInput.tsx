
import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  isProcessing: boolean;
  processingStatus: string;
}

const QuestionInput: React.FC<QuestionInputProps> = ({ onSubmit, isProcessing, processingStatus }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && !isProcessing) {
      onSubmit(question.trim());
      setQuestion('');
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your medical question here…"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] text-[#111827] placeholder-[#9CA3AF]"
            disabled={isProcessing}
          />
        </div>

        <button
          type="submit"
          disabled={!question.trim() || isProcessing}
          className="w-full px-6 py-3 bg-[#10B981] text-white rounded-xl font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? 'Processing...' : 'Ask Question'}
        </button>
      </form>

      {/* Processing Status */}
      {isProcessing && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="text-center">
            <div className="font-medium text-blue-900 mb-2">Your question is being processed, please wait…</div>
            <div className="text-blue-700 text-sm mb-4">{processingStatus}</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-[#10B981] h-2 rounded-full animate-pulse" style={{ width: '37%' }}></div>
            </div>
            <div className="text-sm text-[#6B7280] mt-2">37% complete</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionInput;
