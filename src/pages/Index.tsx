
import React, { useState } from 'react';
import DocumentUpload from '@/components/DocumentUpload';
import UserPreferences from '@/components/UserPreferences';
import QuestionInput from '@/components/QuestionInput';
import MedicalAnswer from '@/components/MedicalAnswer';
import ChatHistory from '@/components/ChatHistory';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';
import { Upload, MessageSquare, Shield, Stethoscope } from 'lucide-react';

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
    setProcessingStatus('Processing your document...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setProcessingStatus('Analyzing your question...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setProcessingStatus('Generating answer...');
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
      <header className="bg-gradient-to-r from-[#013145] to-[#016075] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/10 rounded-xl">
              <Stethoscope className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">MedicalQnA Assistant</h1>
              <p className="text-xl text-white/80 mt-2">AI-powered medical consultation and document analysis</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center gap-3">
                <Upload className="h-6 w-6 text-emerald-300" />
                <div>
                  <div className="text-2xl font-bold">PDF Upload</div>
                  <div className="text-white/70">Document Analysis</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-6 w-6 text-emerald-300" />
                <div>
                  <div className="text-2xl font-bold">Smart Q&A</div>
                  <div className="text-white/70">Contextual Answers</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-emerald-300" />
                <div>
                  <div className="text-2xl font-bold">Secure</div>
                  <div className="text-white/70">Privacy Protected</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Document Upload */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Upload className="h-6 w-6 text-emerald-600" />
                Document Upload
              </h2>
              <DocumentUpload onFileUpload={handleFileUpload} uploadedFile={uploadedFile} />
            </div>

            {/* User Preferences */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">User Preferences</h2>
              <UserPreferences preferences={preferences} onChange={handlePreferencesChange} />
            </div>

            {/* Question Input */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <MessageSquare className="h-6 w-6 text-emerald-600" />
                Ask Your Question
              </h2>
              <QuestionInput 
                onSubmit={handleQuestionSubmit} 
                isProcessing={isProcessing}
                processingStatus={processingStatus}
              />
            </div>

            {/* Medical Answer */}
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
          </div>

          {/* Right Column - Chat History */}
          <div className="space-y-8">
            <ChatHistory messages={chatHistory} />
            <MedicalDisclaimer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
