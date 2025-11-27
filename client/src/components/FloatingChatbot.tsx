import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { AIChatBox, type Message } from './AIChatBox';
import { Button } from './ui/button';

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: 'You are a helpful assistant for Conceived Automations.' }
  ]);

  const handleSendMessage = (content: string) => {
    setMessages(prev => [...prev, { role: 'user', content }]);
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Thanks for your message! This is a demo chatbot. For real assistance, please contact us directly.' 
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl rounded-lg overflow-hidden z-50 flex flex-col bg-white border border-gray-200">
          <div className="flex items-center justify-between p-4 border-b-2 border-violet-500 bg-white">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-violet-600 to-cyan-500 p-1.5 rounded-lg">
                <Workflow className="text-white w-5 h-5" />
              </div>
              <span className="text-base font-bold text-gray-900">
                Conceived<span className="text-violet-600">Automations</span>
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-gray-600 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <AIChatBox
            messages={messages}
            onSendMessage={handleSendMessage}
            height="100%"
            className="border-0 rounded-none bg-white text-gray-900"
            suggestedPrompts={[
              'Tell me about your services',
              'How much does automation cost?',
              'What is n8n?'
            ]}
            emptyStateMessage="Start a conversation with AI"
          />
        </div>
      )}
    </>
  );
}
