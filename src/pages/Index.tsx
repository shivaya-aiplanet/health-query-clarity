
import React, { useState } from 'react';
import DocumentUpload from '@/components/DocumentUpload';
import UserPreferences from '@/components/UserPreferences';
import QuestionInput from '@/components/QuestionInput';
import MedicalAnswer from '@/components/MedicalAnswer';
import ChatHistory from '@/components/ChatHistory';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';

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

interface UserPrefs {
  userType: string;
  urgency: string;
  responseLength: string;
}

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [preferences, setPreferences] = useState<UserPrefs>({
    userType: 'Patient',
    urgency: 'Medium',
    responseLength: 'Moderate'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [processingStatus, setProcessingStatus] = useState<string>('');

  const handleFileUpload = (file: File | null) => {
    setUploadedFile(file);
  };

  const handlePreferencesChange = (newPrefs: UserPrefs) => {
    setPreferences(newPrefs);
  };

  const handleQuestionSubmit = async (question: string) => {
    if (!question.trim()) return;

    setIsProcessing(true);
    setCurrentAnswer(null);
    
    // Simulate processing steps
    setProcessingStatus('Processing your document…');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setProcessingStatus('Analyzing your question…');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setProcessingStatus('Generating answer…');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock medical response
    const mockAnswer = generateMockMedicalAnswer(question, preferences, uploadedFile);
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      question,
      answer: mockAnswer,
      timestamp: new Date(),
      preferences,
      document: uploadedFile ? { name: uploadedFile.name, size: uploadedFile.size } : undefined
    };

    setChatHistory(prev => [newMessage, ...prev]);
    setCurrentAnswer(mockAnswer);
    setIsProcessing(false);
    setProcessingStatus('');
  };

  const generateMockMedicalAnswer = (question: string, prefs: UserPrefs, file: File | null): string => {
    const baseAnswer = `Based on your question "${question.substring(0, 50)}${question.length > 50 ? '...' : ''}", here's a comprehensive medical response tailored for a ${prefs.userType.toLowerCase()} with ${prefs.urgency.toLowerCase()} urgency.

**Medical Answer:**
This appears to be a common medical concern that can have several underlying causes. The symptoms you've described could be related to various conditions, and proper evaluation is essential for accurate diagnosis.

**Contextual References:**
${file ? `Based on the uploaded document "${file.name}", additional context has been considered in this response.` : 'No additional documents were provided for context.'}

**Suggested Follow-up Questions:**
• What are the typical treatment options for this condition?
• When should I seek immediate medical attention?
• Are there any lifestyle modifications that could help?

**Important Note:**
${prefs.urgency === 'High' ? '⚠️ This query was marked as urgent. Please consult a medical professional immediately for urgent health concerns.' : 'For comprehensive care, consider discussing this with your healthcare provider.'}`;

    return baseAnswer;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#013145] text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Medical Report Analysis Tool</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Upload your medical reports and get AI-powered analysis with follow-up questions
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Document Upload Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-[#111827] mb-6">Document Upload Section</h2>
            <DocumentUpload onFileUpload={handleFileUpload} uploadedFile={uploadedFile} />
          </div>

          {/* User Preferences Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-[#111827] mb-6">User Preferences Section</h2>
            <UserPreferences preferences={preferences} onChange={handlePreferencesChange} />
          </div>

          {/* Medical Answer or Analysis */}
          {(currentAnswer || isProcessing) && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <MedicalAnswer 
                answer={currentAnswer} 
                isProcessing={isProcessing}
                processingStatus={processingStatus}
                urgency={preferences.urgency}
              />
            </div>
          )}

          {/* Question Input Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-[#111827] mb-6">Question Input Section</h2>
            <QuestionInput 
              onSubmit={handleQuestionSubmit} 
              isProcessing={isProcessing}
              processingStatus={processingStatus}
            />
          </div>

          {/* Chat History Section */}
          {chatHistory.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <ChatHistory messages={chatHistory} />
            </div>
          )}

          {/* Medical Disclaimer */}
          <MedicalDisclaimer />
        </div>
      </div>
    </div>
  );
};

export default Index;
