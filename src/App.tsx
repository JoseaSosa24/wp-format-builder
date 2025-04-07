import React, { useState } from 'react';
import { Share2 } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import MessageForm from './components/MessageForm';
import FormattedPreview from './components/FormattedPreview';
import InputSection from './components/InputSection';
import { EventData } from './types';
import { formatWhatsAppMessage } from './utils/messageFormatter';

function App() {
  const [eventData, setEventData] = useState<EventData>({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    locationNotes: '',
    registrationLink: '',
    socialLinks: {
      whatsapp: '',
      instagram: '',
      telegram: ''
    }
  });

  const handleShare = () => {
    const formattedMessage = formatWhatsAppMessage(eventData);
    const encodedMessage = encodeURIComponent(formattedMessage);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  const handleExtractedData = (data: Partial<EventData>) => {
    setEventData(prev => ({
      ...prev,
      ...data
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-green-600 text-white py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Share2 className="h-8 w-8" />
              <h1 className="text-2xl font-bold">WP Format Builder</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 space-y-8">
        <InputSection onDataExtracted={handleExtractedData} />
        
        <div className="grid gap-8 md:grid-cols-2">
          <MessageForm eventData={eventData} setEventData={setEventData} />
          <FormattedPreview eventData={eventData} onShare={handleShare} />
        </div>
      </main>
    </div>
  );
}

export default App;