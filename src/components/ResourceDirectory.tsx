import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Phone, 
  MapPin, 
  Globe, 
  Clock, 
  Heart, 
  Users, 
  BookOpen, 
  Shield,
  Search,
  ExternalLink
} from 'lucide-react';

interface Resource {
  id: string;
  name: string;
  nameSwahili: string;
  description: string;
  descriptionSwahili: string;
  type: 'crisis' | 'counseling' | 'community' | 'education' | 'legal';
  contact: {
    phone?: string;
    website?: string;
    location?: string;
    hours?: string;
  };
  isEmergency?: boolean;
  isFree?: boolean;
  languages: string[];
  targetGroup: string[];
}

const resources: Resource[] = [
  {
    id: '1',
    name: 'Kenya Red Cross Society - Psychosocial Support',
    nameSwahili: 'Shirika la Msalaba Mwekundu wa Kenya - Msaada wa Kisaikolojia',
    description: '24/7 psychosocial support and crisis intervention services',
    descriptionSwahili: 'Huduma za msaada wa kisaikolojia na kuingilia kati katika mazingira ya dharura',
    type: 'crisis',
    contact: {
      phone: '1199',
      website: 'https://www.kenyaredcross.org',
      hours: '24/7'
    },
    isEmergency: true,
    isFree: true,
    languages: ['English', 'Kiswahili'],
    targetGroup: ['All ages', 'Crisis situations']
  },
  {
    id: '2',
    name: 'Befrienders Kenya',
    nameSwahili: 'Befrienders Kenya',
    description: 'Confidential emotional support through phone and text',
    descriptionSwahili: 'Msaada wa kihisia wa siri kupitia simu na ujumbe',
    type: 'crisis',
    contact: {
      phone: '0722 178 177',
      website: 'https://befrienderskenya.org',
      hours: '24/7'
    },
    isEmergency: true,
    isFree: true,
    languages: ['English', 'Kiswahili'],
    targetGroup: ['All ages', 'Suicide prevention']
  },
  {
    id: '3',
    name: 'AMREF Health Africa - Mental Health Program',
    nameSwahili: 'AMREF Health Africa - Mpango wa Afya ya Akili',
    description: 'Community-based mental health services and training',
    descriptionSwahili: 'Huduma za afya ya akili za kijamii na mafunzo',
    type: 'community',
    contact: {
      phone: '+254 20 699 4000',
      website: 'https://amref.org',
      location: 'Nairobi, Kenya'
    },
    isFree: false,
    languages: ['English', 'Kiswahili', 'Local languages'],
    targetGroup: ['Communities', 'Healthcare workers']
  },
  {
    id: '4',
    name: 'University of Nairobi - Counseling Services',
    nameSwahili: 'Chuo Kikuu cha Nairobi - Huduma za Ushauri',
    description: 'Professional counseling services for students and community',
    descriptionSwahili: 'Huduma za ushauri wa kitaalamu kwa wanafunzi na jamii',
    type: 'counseling',
    contact: {
      phone: '+254 20 491 8000',
      website: 'https://uonbi.ac.ke',
      location: 'Nairobi, Kenya',
      hours: 'Mon-Fri 8AM-5PM'
    },
    isFree: true,
    languages: ['English', 'Kiswahili'],
    targetGroup: ['Students', 'Young adults']
  },
  {
    id: '5',
    name: 'BasicNeeds-BasicRights Kenya',
    nameSwahili: 'BasicNeeds-BasicRights Kenya',
    description: 'Mental health and development programs for communities',
    descriptionSwahili: 'Mipango ya afya ya akili na maendeleo kwa jamii',
    type: 'community',
    contact: {
      phone: '+254 20 387 4988',
      website: 'https://basicneedskenya.org',
      location: 'Multiple locations in Kenya'
    },
    isFree: true,
    languages: ['English', 'Kiswahili', 'Local languages'],
    targetGroup: ['People with mental illness', 'Families', 'Communities']
  },
  {
    id: '6',
    name: 'Mental Health Kenya',
    nameSwahili: 'Afya ya Akili Kenya',
    description: 'Advocacy, awareness, and support for mental health in Kenya',
    descriptionSwahili: 'Utetezi, uongozi wa uelewa, na msaada wa afya ya akili nchini Kenya',
    type: 'education',
    contact: {
      website: 'https://mentalhealthkenya.org',
      location: 'Nairobi, Kenya'
    },
    isFree: true,
    languages: ['English', 'Kiswahili'],
    targetGroup: ['General public', 'Advocates', 'Professionals']
  }
];

export const ResourceDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showSwahili, setShowSwahili] = useState(false);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = (
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.nameSwahili.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.descriptionSwahili.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'crisis': return <Shield className="w-4 h-4" />;
      case 'counseling': return <Heart className="w-4 h-4" />;
      case 'community': return <Users className="w-4 h-4" />;
      case 'education': return <BookOpen className="w-4 h-4" />;
      case 'legal': return <Shield className="w-4 h-4" />;
      default: return <Heart className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'crisis': return 'destructive';
      case 'counseling': return 'default';
      case 'community': return 'secondary';
      case 'education': return 'outline';
      default: return 'default';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" />
              Mental Health Resources in Kenya
            </span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowSwahili(!showSwahili)}
            >
              {showSwahili ? 'English' : 'Kiswahili'}
            </Button>
          </CardTitle>
          <p className="text-muted-foreground">
            {showSwahili 
              ? 'Rasilimali za afya ya akili nchini Kenya - Pata msaada unaohitaji'
              : 'Find mental health support and resources across Kenya'
            }
          </p>
        </CardHeader>
        
        <CardContent>
          <Alert className="mb-6">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>Emergency:</strong> If you're in immediate danger, call 999 or go to the nearest hospital.
              <br />
              <strong>Crisis Support:</strong> Kenya Red Cross: 1199 | Befrienders: 0722 178 177
            </AlertDescription>
          </Alert>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={showSwahili ? "Tafuta rasilimali..." : "Search resources..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs value={selectedType} onValueChange={setSelectedType} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="crisis">Crisis</TabsTrigger>
              <TabsTrigger value="counseling">Counseling</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="legal">Legal</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedType} className="space-y-4 mt-6">
              {filteredResources.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">
                      {showSwahili ? 'Hakuna rasilimali zilizopatikana' : 'No resources found'}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredResources.map((resource) => (
                  <Card key={resource.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">
                              {showSwahili ? resource.nameSwahili : resource.name}
                            </h3>
                            <Badge variant={getTypeColor(resource.type) as any}>
                              {getTypeIcon(resource.type)}
                              <span className="ml-1 capitalize">{resource.type}</span>
                            </Badge>
                            {resource.isEmergency && (
                              <Badge variant="destructive">Emergency</Badge>
                            )}
                            {resource.isFree && (
                              <Badge variant="outline">Free</Badge>
                            )}
                          </div>
                          
                          <p className="text-muted-foreground mb-4">
                            {showSwahili ? resource.descriptionSwahili : resource.description}
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            {resource.contact.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-primary" />
                                <span>{resource.contact.phone}</span>
                              </div>
                            )}
                            
                            {resource.contact.location && (
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span>{resource.contact.location}</span>
                              </div>
                            )}
                            
                            {resource.contact.hours && (
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-primary" />
                                <span>{resource.contact.hours}</span>
                              </div>
                            )}
                            
                            {resource.contact.website && (
                              <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-primary" />
                                <a 
                                  href={resource.contact.website} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline flex items-center gap-1"
                                >
                                  Website <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-4 flex flex-wrap gap-2">
                            <div className="text-xs text-muted-foreground">
                              <strong>Languages:</strong> {resource.languages.join(', ')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};