import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Heart, 
  MessageCircle, 
  ClipboardCheck, 
  BookOpen, 
  Shield, 
  Users,
  Globe,
  Smartphone,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { MentalHealthChat } from './MentalHealthChat';
import { RiskAssessment } from './RiskAssessment';
import { ResourceDirectory } from './ResourceDirectory';
import { AnalyticsInsights } from './AnalyticsInsights';

interface DashboardStats {
  assessmentsCompleted: number;
  conversationsStarted: number;
  resourcesAccessed: number;
}

export const MentalHealthDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [lastRiskLevel, setLastRiskLevel] = useState<string>('');
  const [stats, setStats] = useState<DashboardStats>({
    assessmentsCompleted: 0,
    conversationsStarted: 0,
    resourcesAccessed: 0
  });

  const handleAssessmentComplete = (score: number, riskLevel: string) => {
    setAssessmentComplete(true);
    setLastRiskLevel(riskLevel);
    setStats(prev => ({ ...prev, assessmentsCompleted: prev.assessmentsCompleted + 1 }));
  };

  const startConversation = () => {
    setActiveTab('chat');
    setStats(prev => ({ ...prev, conversationsStarted: prev.conversationsStarted + 1 }));
  };

  const accessResources = () => {
    setActiveTab('resources');
    setStats(prev => ({ ...prev, resourcesAccessed: prev.resourcesAccessed + 1 }));
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'high':
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />High Risk</Badge>;
      case 'medium':
        return <Badge variant="secondary">⚠️ Medium Risk</Badge>;
      case 'low':
        return <Badge variant="outline"><CheckCircle className="w-3 h-3 mr-1" />Low Risk</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 fade-in-up">
          <div className="flex items-center justify-center gap-3">
            <Heart className="w-8 h-8 text-primary breathing-animation" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-trust bg-clip-text text-transparent">
              Afya Akili
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Mental Health Support for Kenyan Youth • Msaada wa Afya ya Akili kwa Vijana wa Kenya
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="glass-effect glow-on-hover">
              <Globe className="w-3 h-3 mr-1" />
              Available 24/7
            </Badge>
            <Badge variant="outline" className="glass-effect glow-on-hover">
              <Shield className="w-3 h-3 mr-1" />
              Anonymous & Private
            </Badge>
            <Badge variant="outline" className="glass-effect glow-on-hover">
              <Smartphone className="w-3 h-3 mr-1" />
              Mobile Optimized
            </Badge>
          </div>
        </div>

        {/* Crisis Alert */}
        <Alert variant="destructive" className="max-w-4xl mx-auto pulse-glow fade-in-scale">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Crisis Support:</strong> If you're having thoughts of suicide or immediate danger, 
            please call <strong>999</strong> or Kenya Red Cross at <strong>1199</strong> immediately.
          </AlertDescription>
        </Alert>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 max-w-3xl mx-auto">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="assessment" className="flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Assessment</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Chat</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Resources</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Impact</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Welcome Section */}
            <Card className="max-w-4xl mx-auto card-gradient glow-on-hover fade-in-scale">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Welcome to Your Mental Health Journey</CardTitle>
                <p className="text-muted-foreground">
                  Karibu katika safari yako ya afya ya akili
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {assessmentComplete && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription className="flex items-center gap-2">
                      Last assessment completed: {getRiskBadge(lastRiskLevel)}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="card-gradient glow-on-hover fade-in-up border-primary/20">
                    <CardContent className="p-6 text-center">
                      <ClipboardCheck className="w-12 h-12 text-primary mx-auto mb-4 breathing-animation" />
                      <h3 className="text-lg font-semibold mb-2">Mental Health Assessment</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Take a confidential screening to understand your mental health status
                      </p>
                      <Button onClick={() => setActiveTab('assessment')} className="w-full glow-on-hover">
                        Start Assessment
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="card-gradient glow-on-hover fade-in-up border-warm/20" style={{ animationDelay: '0.1s' }}>
                    <CardContent className="p-6 text-center">
                      <MessageCircle className="w-12 h-12 text-warm mx-auto mb-4 breathing-animation" />
                      <h3 className="text-lg font-semibold mb-2">AI Support Chat</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Talk to our AI counselor for emotional support and guidance
                      </p>
                      <Button onClick={startConversation} variant="secondary" className="w-full glow-on-hover">
                        Start Conversation
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="card-gradient glow-on-hover fade-in-up border-hope/20" style={{ animationDelay: '0.2s' }}>
                    <CardContent className="p-6 text-center">
                      <BookOpen className="w-12 h-12 text-hope mx-auto mb-4 breathing-animation" />
                      <h3 className="text-lg font-semibold mb-2">Local Resources</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Find mental health professionals and support services in Kenya
                      </p>
                      <Button onClick={accessResources} variant="outline" className="w-full glow-on-hover">
                        Browse Resources
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Statistics */}
                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 text-center">Your Journey Progress</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{stats.assessmentsCompleted}</div>
                      <div className="text-sm text-muted-foreground">Assessments</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-warm">{stats.conversationsStarted}</div>
                      <div className="text-sm text-muted-foreground">Conversations</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-hope">{stats.resourcesAccessed}</div>
                      <div className="text-sm text-muted-foreground">Resources Viewed</div>
                    </div>
                  </div>
                </div>

                {/* Educational Content */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Mental Health Facts in Kenya
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <h4 className="font-semibold">Key Statistics:</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• 1 in 4 Kenyans experience mental health challenges</li>
                          <li>• Depression affects 4.4% of the population</li>
                          <li>• Anxiety disorders affect 4.2% of people</li>
                          <li>• Youth are particularly vulnerable</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold">Breaking the Stigma:</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Mental health is just as important as physical health</li>
                          <li>• Seeking help is a sign of strength</li>
                          <li>• Treatment and support are available</li>
                          <li>• You are not alone in this journey</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessment">
            <RiskAssessment onComplete={handleAssessmentComplete} />
          </TabsContent>

          <TabsContent value="chat">
            <MentalHealthChat />
          </TabsContent>

          <TabsContent value="resources">
            <ResourceDirectory />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsInsights />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground max-w-4xl mx-auto">
          <div className="bg-background/80 rounded-lg p-6 space-y-4">
            <p>
              <strong>Disclaimer:</strong> This tool is for informational purposes and is not a substitute for professional medical advice. 
              If you're experiencing a mental health crisis, please seek immediate professional help.
            </p>
            <p>
              Built with ❤️ for Kenyan youth. Promoting SDG 3: Good Health and Well-being.
            </p>
            <div className="flex justify-center space-x-4 text-xs">
              <span>Privacy Protected</span>
              <span>•</span>
              <span>Anonymous Usage</span>
              <span>•</span>
              <span>Local Resources</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};