import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Loader2, Send, User, Sparkles, X, Bot, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export default function AIChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Hi! I'm your automation assistant. I can help you calculate ROI or suggest workflows. What are you looking to automate?" 
    }
  ]);

  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    if (scrollViewportRef.current) {
      const scrollElement = scrollViewportRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages, isOpen, isLoading]);

  // Auto-focus logic
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    // 1. Add User Message
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // 2. Standard Fetch to Backend
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "I'm having trouble connecting right now. Please try again!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    // UPDATED Z-INDEX HERE: z-[9999] ensures it sits on top of everything
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[350px] md:w-[400px] shadow-2xl"
          >
            <Card className="flex flex-col h-[600px] border-slate-700 bg-slate-950/95 backdrop-blur-xl overflow-hidden">
              
              {/* Header */}
              <div className="p-4 border-b border-white/10 bg-violet-500/10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-violet-600 rounded-lg shadow-sm">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Automation Expert</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      <span className="text-xs text-slate-300">Online</span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 hover:bg-white/10 text-slate-300"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4" ref={scrollViewportRef}>
                <div className="space-y-4 pb-4">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "flex gap-3",
                        msg.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {msg.role === "assistant" && (
                        <div className="size-8 shrink-0 mt-1 rounded-full bg-violet-500/20 flex items-center justify-center">
                          <Sparkles className="size-4 text-violet-400" />
                        </div>
                      )}

                      <div
                        className={cn(
                          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm overflow-hidden",
                          msg.role === "user"
                            ? "bg-violet-600 text-white rounded-br-none"
                            : "bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700"
                        )}
                      >
                         <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                      </div>

                      {msg.role === "user" && (
                        <div className="size-8 shrink-0 mt-1 rounded-full bg-slate-700 flex items-center justify-center">
                          <User className="size-4 text-slate-300" />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Loading State */}
                  {isLoading && (
                    <div className="flex items-start gap-3">
                      <div className="size-8 shrink-0 mt-1 rounded-full bg-violet-500/20 flex items-center justify-center">
                        <Sparkles className="size-4 text-violet-400" />
                      </div>
                      <div className="rounded-2xl rounded-bl-none bg-slate-800 px-4 py-3 border border-slate-700">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t border-white/10 bg-slate-900/50">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex gap-2 items-end"
                >
                  <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about workflows..."
                    className="flex-1 min-h-[44px] max-h-32 resize-none bg-slate-950 border-slate-700 focus:border-violet-500 text-white placeholder:text-slate-500"
                    rows={1}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={isLoading || !input.trim()}
                    className="h-11 w-11 shrink-0 rounded-xl shadow-md bg-violet-600 hover:bg-violet-500 text-white"
                  >
                    {isLoading ? (
                      <Loader2 className="size-5 animate-spin" />
                    ) : (
                      <Send className="size-5" />
                    )}
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 border-2 ${
          isOpen 
            ? 'bg-slate-900 border-violet-500 text-violet-500 rotate-90' 
            : 'bg-violet-600 border-violet-500 text-white hover:bg-violet-500'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
      </motion.button>
    </div>
  );
}