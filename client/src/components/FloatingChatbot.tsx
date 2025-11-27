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
          <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground">
            <h3 className="font-semibold">Chat with us</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
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
          />
        </div>
      )}
    </>
  );
}
