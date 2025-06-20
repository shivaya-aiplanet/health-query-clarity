
import React, { useState } from 'react';
import { Send, Loader } from 'lucide-react';

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
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your medical question here..."
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none text-gray-900 placeholder-gray-500"
            disabled={isProcessing}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {question.length}/2000 characters
          </div>
          <button
            type="submit"
            disabled={!question.trim() || isProcessing}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isProcessing ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {isProcessing ? 'Processing...' : 'Ask Question'}
          </button>
        </div>
      </form>

      {/* Processing Status */}
      {isProcessing && (
        <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <Loader className="h-5 w-5 text-blue-600 animate-spin" />
          <div>
            <div className="font-medium text-blue-900">Processing your question...</div>
            <div className="text-blue-700 text-sm">{processingStatus}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionInput;
