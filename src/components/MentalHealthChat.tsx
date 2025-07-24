import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Heart, Send, Bot, User, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  sentiment?: 'positive' | 'negative' | 'neutral';
  riskLevel?: 'low' | 'medium' | 'high';
}

interface SentimentAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export const MentalHealthChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiModel, setAiModel] = useState<any>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initialize AI model
  useEffect(() => {
    const initializeAI = async () => {
      try {
        // For now, we'll simulate AI responses. In production, you'd load a real model
        console.log('AI model initialized for mental health support');
        
        // Add welcome message
        const welcomeMessage: Message = {
          id: '1',
          content: "Habari! 👋 I'm here to listen and support you. This is a safe space where you can share your thoughts and feelings. How are you doing today?",
          sender: 'bot',
          timestamp: new Date(),
          sentiment: 'positive',
          riskLevel: 'low'
        };
        setMessages([welcomeMessage]);
      } catch (error) {
        console.error('Failed to initialize AI model:', error);
        toast({
          title: "Connection Issue",
          description: "Having trouble connecting. Please refresh the page.",
          variant: "destructive"
        });
      }
    };

    initializeAI();
  }, [toast]);

  // Simulate sentiment analysis
  const analyzeSentiment = async (text: string): Promise<SentimentAnalysis> => {
    // Simulate AI analysis - in production, use @huggingface/transformers
    const keywords = {
      negative: ['sad', 'depressed', 'anxious', 'worried', 'scared', 'alone', 'hopeless', 'death', 'suicide', 'hurt'],
      positive: ['happy', 'good', 'great', 'excited', 'hopeful', 'better', 'fine', 'okay']
    };

    const lowercaseText = text.toLowerCase();
    const negativeCount = keywords.negative.filter(word => lowercaseText.includes(word)).length;
    const positiveCount = keywords.positive.filter(word => lowercaseText.includes(word)).length;

    let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
    let riskLevel: 'low' | 'medium' | 'high' = 'low';

    if (negativeCount > positiveCount) {
      sentiment = 'negative';
      if (negativeCount >= 2 || lowercaseText.includes('suicide') || lowercaseText.includes('death')) {
        riskLevel = 'high';
      } else if (negativeCount >= 1) {
        riskLevel = 'medium';
      }
    } else if (positiveCount > negativeCount) {
      sentiment = 'positive';
    }

    return {
      sentiment,
      confidence: 0.8,
      riskLevel
    };
  };

  // Generate AI response
  const generateResponse = async (userMessage: string, analysis: SentimentAnalysis): Promise<string> => {
    // Simulate AI response generation - in production, use a proper mental health chatbot model
    const responses = {
      high: [
        "I'm really concerned about what you're going through. These feelings are serious, and I want you to know that you're not alone. Please consider reaching out to a mental health professional immediately. In Kenya, you can call the Kenya Red Cross helpline at 1199.",
        "What you're experiencing sounds very difficult. It's important to get professional help right away. Please don't hesitate to contact emergency services or visit the nearest health facility. Your life matters, and there are people who want to help."
      ],
      medium: [
        "I hear that you're struggling, and that takes courage to share. These feelings are valid, and it's okay to not be okay sometimes. Have you considered talking to someone you trust about how you're feeling?",
        "It sounds like you're going through a tough time. Remember that seeking help is a sign of strength, not weakness. There are counselors and support groups that can help you work through these feelings."
      ],
      low: [
        "Thank you for sharing with me. I'm here to listen. What's been on your mind lately?",
        "I appreciate your openness. It's normal to have ups and downs. What would help you feel better right now?",
        "That sounds challenging. How long have you been feeling this way?"
      ]
    };

    if (analysis.riskLevel === 'high') {
      return responses.high[Math.floor(Math.random() * responses.high.length)];
    } else if (analysis.riskLevel === 'medium') {
      return responses.medium[Math.floor(Math.random() * responses.medium.length)];
    } else {
      return responses.low[Math.floor(Math.random() * responses.low.length)];
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Analyze sentiment and risk
      const analysis = await analyzeSentiment(inputMessage);
      
      // Generate AI response
      const response = await generateResponse(inputMessage, analysis);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
        sentiment: analysis.sentiment,
        riskLevel: analysis.riskLevel
      };

      // Add risk alert if needed
      if (analysis.riskLevel === 'high') {
        toast({
          title: "Crisis Support Available",
          description: "If you're in immediate danger, please call 999 or visit your nearest hospital.",
          variant: "destructive"
        });
      }

      setTimeout(() => {
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error('Error processing message:', error);
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Sorry, I'm having trouble responding. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getRiskBadge = (riskLevel?: string) => {
    switch (riskLevel) {
      case 'high':
        return <Badge variant="destructive" className="ml-2"><AlertTriangle className="w-3 h-3 mr-1" />High Risk</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="ml-2">⚠️ Medium Risk</Badge>;
      case 'low':
        return <Badge variant="outline" className="ml-2"><CheckCircle className="w-3 h-3 mr-1" />Low Risk</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto h-[600px] flex flex-col">
      <CardHeader className="bg-gradient-to-r from-primary to-trust text-primary-foreground">
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-6 h-6" />
          Mental Health Support - Msaada wa Afya ya Akili
        </CardTitle>
        <p className="text-sm opacity-90">
          A safe, anonymous space for emotional support • Mahali salama kwa msaada wa kihisia
        </p>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground ml-4'
                    : 'bg-muted mr-4'
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.sender === 'bot' && <Bot className="w-5 h-5 mt-1 text-primary" />}
                  {message.sender === 'user' && <User className="w-5 h-5 mt-1" />}
                  <div className="flex-1">
                    <p className="text-sm">{message.content}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                      {message.sender === 'bot' && getRiskBadge(message.riskLevel)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-muted rounded-lg p-3 mr-4">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-primary" />
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
        
        <Separator />
        
        <div className="p-4">
          <Alert className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Privacy Notice:</strong> Your conversations are processed locally for privacy. 
              If you're in crisis, please contact emergency services immediately.
            </AlertDescription>
          </Alert>
          
          <div className="flex gap-2">
            <Input
              placeholder="Type your message here... / Andika ujumbe wako hapa..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};