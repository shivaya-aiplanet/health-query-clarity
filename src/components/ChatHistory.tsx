
import React from 'react';
import { Clock, User, AlertTriangle, File } from 'lucide-react';

interface ChatMessage {
  id: string;
  question: string;
  answer: string;
  timestamp: Date;
  preferences: {
    userType: string;
    urgency: string;
    responseLength: string;
  };
  document?: {
    name: string;
    size: number;
  };
}

interface ChatHistoryProps {
  messages: ChatMessage[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (messages.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Clock className="h-5 w-5 text-emerald-600" />
          Chat History
        </h2>
        <div className="text-center py-8">
          <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No questions asked yet</p>
          <p className="text-gray-400 text-sm mt-1">Your conversation history will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <Clock className="h-5 w-5 text-emerald-600" />
        Chat History
      </h2>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">{message.preferences.userType}</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getUrgencyColor(message.preferences.urgency)}`}>
                  {message.preferences.urgency}
                </span>
              </div>
              <span className="text-xs text-gray-400">{formatTimeAgo(message.timestamp)}</span>
            </div>

            {/* Document Info */}
            {message.document && (
              <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                <File className="h-3 w-3" />
                <span>{message.document.name}</span>
              </div>
            )}

            {/* Question */}
            <div className="mb-2">
              <p className="text-sm font-medium text-gray-900 mb-1">Question:</p>
              <p className="text-sm text-gray-700 line-clamp-2">{message.question}</p>
            </div>

            {/* Answer Preview */}
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">Answer:</p>
              <p className="text-sm text-gray-600 line-clamp-3">
                {message.answer.length > 150 
                  ? `${message.answer.substring(0, 150)}...` 
                  : message.answer
                }
              </p>
            </div>

            {/* Urgency Warning for High Priority */}
            {message.preferences.urgency === 'High' && (
              <div className="flex items-center gap-1 mt-2 text-xs text-red-600">
                <AlertTriangle className="h-3 w-3" />
                <span>High urgency query</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;
