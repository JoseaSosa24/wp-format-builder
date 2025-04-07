import React, { useState } from 'react';
import { Clipboard, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { extractEventData } from '../utils/textExtractor';
import { EventData } from '../types';
import toast from 'react-hot-toast';

interface InputSectionProps {
  onDataExtracted: (data: Partial<EventData>) => void;
}

const InputSection: React.FC<InputSectionProps> = ({ onDataExtracted }) => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData('text');
    setInput(text);
    processInput(text);
  };

  const processInput = async (text: string) => {
    setIsProcessing(true);
    try {
      // Check if input is a URL
      const isUrl = /^https?:\/\//.test(text.trim());
      
      if (isUrl) {
        // TODO: Implement URL scraping
        toast.error('URL processing coming soon!');
      } else {
        const extractedData = extractEventData(text);
        if (Object.keys(extractedData).length > 0) {
          onDataExtracted(extractedData);
          toast.success('Event information extracted successfully!');
        } else {
          toast.error('Could not extract event information. Please check the input format.');
        }
      }
    } catch (error) {
      toast.error('Error processing input. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Quick Input</h2>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <AlertCircle className="h-4 w-4" />
          <p>Paste event URL or text to automatically extract information</p>
        </div>

        <div className="relative">
          <textarea
            value={input}
            onChange={handleInputChange}
            onPaste={handlePaste}
            className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Paste event URL or text here..."
          />
          <div className="absolute right-2 bottom-2 flex space-x-2">
            {input && (
              <button
                onClick={() => processInput(input)}
                disabled={isProcessing}
                className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors text-sm"
              >
                <LinkIcon className="h-4 w-4" />
                <span>Process</span>
              </button>
            )}
            <button
              onClick={() => {
                navigator.clipboard.readText().then(text => {
                  setInput(text);
                  processInput(text);
                });
              }}
              className="flex items-center space-x-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              <Clipboard className="h-4 w-4" />
              <span>Paste</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputSection;