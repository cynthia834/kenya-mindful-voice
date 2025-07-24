import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  text: string;
  textSwahili: string;
  options: { value: number; label: string; labelSwahili: string }[];
}

const questions: Question[] = [
  {
    id: '1',
    text: 'Over the past 2 weeks, how often have you felt down, depressed, or hopeless?',
    textSwahili: 'Katika wiki 2 zilizopita, mara ngapi umehisi huzuni, unyangavu, au kutokuwa na matumaini?',
    options: [
      { value: 0, label: 'Not at all', labelSwahili: 'Hata kidogo' },
      { value: 1, label: 'Several days', labelSwahili: 'Siku kadhaa' },
      { value: 2, label: 'More than half the days', labelSwahili: 'Zaidi ya nusu ya siku' },
      { value: 3, label: 'Nearly every day', labelSwahili: 'Karibu kila siku' }
    ]
  },
  {
    id: '2',
    text: 'How often have you had little interest or pleasure in doing things?',
    textSwahili: 'Mara ngapi umekuwa na maslahi madogo au furaha katika kufanya mambo?',
    options: [
      { value: 0, label: 'Not at all', labelSwahili: 'Hata kidogo' },
      { value: 1, label: 'Several days', labelSwahili: 'Siku kadhaa' },
      { value: 2, label: 'More than half the days', labelSwahili: 'Zaidi ya nusu ya siku' },
      { value: 3, label: 'Nearly every day', labelSwahili: 'Karibu kila siku' }
    ]
  },
  {
    id: '3',
    text: 'How often have you felt nervous, anxious, or on edge?',
    textSwahili: 'Mara ngapi umehisi wasiwasi, hofu, au kuwa kwenye ukingo?',
    options: [
      { value: 0, label: 'Not at all', labelSwahili: 'Hata kidogo' },
      { value: 1, label: 'Several days', labelSwahili: 'Siku kadhaa' },
      { value: 2, label: 'More than half the days', labelSwahili: 'Zaidi ya nusu ya siku' },
      { value: 3, label: 'Nearly every day', labelSwahili: 'Karibu kila siku' }
    ]
  },
  {
    id: '4',
    text: 'How often have you had trouble falling or staying asleep?',
    textSwahili: 'Mara ngapi umekuwa na shida za kulala au kubaki umelala?',
    options: [
      { value: 0, label: 'Not at all', labelSwahili: 'Hata kidogo' },
      { value: 1, label: 'Several days', labelSwahili: 'Siku kadhaa' },
      { value: 2, label: 'More than half the days', labelSwahili: 'Zaidi ya nusu ya siku' },
      { value: 3, label: 'Nearly every day', labelSwahili: 'Karibu kila siku' }
    ]
  },
  {
    id: '5',
    text: 'How often have you felt that you would be better off dead or thought about hurting yourself?',
    textSwahili: 'Mara ngapi umehisi kwamba ungekuwa bora kama ungekufa au umefikiri kujidhuru?',
    options: [
      { value: 0, label: 'Not at all', labelSwahili: 'Hata kidogo' },
      { value: 1, label: 'Several days', labelSwahili: 'Siku kadhaa' },
      { value: 2, label: 'More than half the days', labelSwahili: 'Zaidi ya nusu ya siku' },
      { value: 3, label: 'Nearly every day', labelSwahili: 'Karibu kila siku' }
    ]
  }
];

interface RiskAssessmentProps {
  onComplete?: (score: number, riskLevel: string) => void;
}

export const RiskAssessment: React.FC<RiskAssessmentProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [showSwahili, setShowSwahili] = useState(false);
  const { toast } = useToast();

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      completeAssessment();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const completeAssessment = () => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const maxScore = questions.length * 3;
    const percentage = (totalScore / maxScore) * 100;
    
    let riskLevel = 'low';
    if (percentage >= 60) {
      riskLevel = 'high';
    } else if (percentage >= 30) {
      riskLevel = 'medium';
    }

    // Check for suicidal ideation (question 5)
    if (answers['5'] > 0) {
      riskLevel = 'high';
      toast({
        title: "Immediate Support Needed",
        description: "Please reach out to a mental health professional or emergency services immediately.",
        variant: "destructive"
      });
    }

    setIsComplete(true);
    onComplete?.(totalScore, riskLevel);
  };

  const getRiskLevelInfo = () => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const maxScore = questions.length * 3;
    const percentage = (totalScore / maxScore) * 100;
    
    if (answers['5'] > 0 || percentage >= 60) {
      return {
        level: 'High Risk',
        color: 'destructive',
        icon: AlertTriangle,
        message: 'Your responses indicate you may be experiencing significant mental health challenges. Please consider reaching out to a mental health professional immediately.',
        messageSwahili: 'Majibu yako yanaonyesha kwamba unaweza kukabiliana na changamoto kubwa za afya ya akili. Tafadhali fikiria kufikia mtaalamu wa afya ya akili mara moja.'
      };
    } else if (percentage >= 30) {
      return {
        level: 'Medium Risk',
        color: 'secondary',
        icon: AlertTriangle,
        message: 'Your responses suggest you may be experiencing some mental health challenges. Consider talking to a counselor or trusted friend.',
        messageSwahili: 'Majibu yako yanaonyesha kwamba unaweza kukabiliana na baadhi ya changamoto za afya ya akili. Fikiria kuzungumza na mshauri au rafiki unayemwamini.'
      };
    } else {
      return {
        level: 'Low Risk',
        color: 'outline',
        icon: CheckCircle,
        message: 'Your responses indicate you are doing relatively well. Continue taking care of your mental health.',
        messageSwahili: 'Majibu yako yanaonyesha kwamba unafanya vizuri. Endelea kujitunza kiakili.'
      };
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (isComplete) {
    const riskInfo = getRiskLevelInfo();
    const IconComponent = riskInfo.icon;
    
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Heart className="w-6 h-6 text-primary" />
            Assessment Complete
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Badge variant={riskInfo.color as any} className="mb-4">
              <IconComponent className="w-4 h-4 mr-2" />
              {riskInfo.level}
            </Badge>
            <p className="text-muted-foreground mb-2">
              {showSwahili ? riskInfo.messageSwahili : riskInfo.message}
            </p>
          </div>

          {riskInfo.level === 'High Risk' && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Crisis Resources:</strong><br />
                • Emergency: 999<br />
                • Kenya Red Cross: 1199<br />
                • Befrienders Kenya: 0722 178 177<br />
                • Text "TALK" to 741741 for crisis support
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => setShowSwahili(!showSwahili)}>
              {showSwahili ? 'English' : 'Kiswahili'}
            </Button>
            <Button onClick={() => window.location.reload()}>
              Take Assessment Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const currentAnswer = answers[question.id];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Mental Health Assessment</span>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowSwahili(!showSwahili)}
          >
            {showSwahili ? 'English' : 'Kiswahili'}
          </Button>
        </CardTitle>
        <Progress value={progress} className="w-full" />
        <p className="text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">
            {showSwahili ? question.textSwahili : question.text}
          </h3>
          
          <RadioGroup 
            value={currentAnswer?.toString()} 
            onValueChange={(value) => handleAnswer(question.id, parseInt(value))}
          >
            {question.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value.toString()} id={`${question.id}-${option.value}`} />
                <Label htmlFor={`${question.id}-${option.value}`} className="flex-1 cursor-pointer">
                  {showSwahili ? option.labelSwahili : option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button 
            onClick={nextQuestion}
            disabled={currentAnswer === undefined}
          >
            {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};