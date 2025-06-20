
import React from 'react';
import { User, Clock, FileText } from 'lucide-react';

interface UserPreferences {
  userType: string;
  urgency: string;
  responseLength: string;
}

interface UserPreferencesProps {
  preferences: UserPreferences;
  onChange: (preferences: UserPreferences) => void;
}

const UserPreferencesComponent: React.FC<UserPreferencesProps> = ({ preferences, onChange }) => {
  const handleChange = (key: keyof UserPreferences, value: string) => {
    onChange({ ...preferences, [key]: value });
  };

  const userTypes = [
    { value: 'Patient', label: 'Patient', description: 'General health inquiries' },
    { value: 'Healthcare Professional', label: 'Healthcare Professional', description: 'Clinical-level information' },
    { value: 'Student', label: 'Student', description: 'Educational content' }
  ];

  const urgencyLevels = [
    { value: 'Low', label: 'Low', description: 'General information', color: 'text-green-700 bg-green-100 border-green-200' },
    { value: 'Medium', label: 'Medium', description: 'Standard consultation', color: 'text-yellow-700 bg-yellow-100 border-yellow-200' },
    { value: 'High', label: 'High', description: 'Urgent concern', color: 'text-red-700 bg-red-100 border-red-200' }
  ];

  const responseLengths = [
    { value: 'Concise', label: 'Concise', description: 'Brief, essential points' },
    { value: 'Moderate', label: 'Moderate', description: 'Balanced detail' },
    { value: 'Detailed', label: 'Detailed', description: 'Comprehensive information' }
  ];

  return (
    <div className="space-y-8">
      {/* User Type Selector */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <User className="h-5 w-5 text-emerald-600" />
          <h3 className="text-lg font-semibold text-gray-900">User Type</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userTypes.map((type) => (
            <label
              key={type.value}
              className={`relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                preferences.userType === type.value
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="userType"
                value={type.value}
                checked={preferences.userType === type.value}
                onChange={(e) => handleChange('userType', e.target.value)}
                className="sr-only"
              />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{type.label}</div>
                  <div className="text-sm text-gray-500 mt-1">{type.description}</div>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  preferences.userType === type.value
                    ? 'border-emerald-500 bg-emerald-500'
                    : 'border-gray-300'
                }`}>
                  {preferences.userType === type.value && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Urgency Level Selector */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-emerald-600" />
          <h3 className="text-lg font-semibold text-gray-900">Urgency Level</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {urgencyLevels.map((level) => (
            <label
              key={level.value}
              className={`relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                preferences.urgency === level.value
                  ? `border-emerald-500 bg-emerald-50`
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="urgency"
                value={level.value}
                checked={preferences.urgency === level.value}
                onChange={(e) => handleChange('urgency', e.target.value)}
                className="sr-only"
              />
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{level.label}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${level.color}`}>
                      {level.value}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{level.description}</div>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  preferences.urgency === level.value
                    ? 'border-emerald-500 bg-emerald-500'
                    : 'border-gray-300'
                }`}>
                  {preferences.urgency === level.value && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Response Length Selector */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-emerald-600" />
          <h3 className="text-lg font-semibold text-gray-900">Preferred Response Length</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {responseLengths.map((length) => (
            <label
              key={length.value}
              className={`relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                preferences.responseLength === length.value
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="responseLength"
                value={length.value}
                checked={preferences.responseLength === length.value}
                onChange={(e) => handleChange('responseLength', e.target.value)}
                className="sr-only"
              />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{length.label}</div>
                  <div className="text-sm text-gray-500 mt-1">{length.description}</div>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  preferences.responseLength === length.value
                    ? 'border-emerald-500 bg-emerald-500'
                    : 'border-gray-300'
                }`}>
                  {preferences.responseLength === length.value && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPreferencesComponent;
