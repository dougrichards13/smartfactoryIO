import React, { useEffect } from 'react';
import { Users, MessageSquare } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { useContent } from '../../src/contexts/ContentContext';

interface TeamEditorProps {
  onContentChange: () => void;
}

export function TeamEditor({ onContentChange }: TeamEditorProps) {
  const { content: globalContent, updateTeamContent } = useContent();
  const content = globalContent.team;

  useEffect(() => {
    onContentChange();
  }, [content, onContentChange]);

  const updateContent = (path: string, value: string) => {
    const keys = path.split('.');
    const newContent = { ...content };
    let current: any = newContent;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    updateTeamContent(newContent);
  };

  const updateStat = (statIndex: number, field: string, value: string) => {
    const newContent = { ...content };
    newContent.teamStats[statIndex][field] = value;
    updateTeamContent(newContent);
  };

  const updateLeader = (leaderIndex: number, field: string, value: string) => {
    const newContent = { ...content };
    newContent.leadership[leaderIndex][field] = value;
    updateTeamContent(newContent);
  };

  const updateLeaderExpertise = (leaderIndex: number, expertiseIndex: number, value: string) => {
    const newContent = { ...content };
    newContent.leadership[leaderIndex].expertise[expertiseIndex] = value;
    updateTeamContent(newContent);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center space-x-2 text-white">
        <Users className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Team Section</h3>
      </div>

      {/* Header Content */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="header-badge" className="text-white/80 text-sm">
            Header Badge
          </Label>
          <Input
            id="header-badge"
            value={content.header?.badge || ''}
            onChange={(e) => updateContent('header.badge', e.target.value)}
            className="bg-white border-slate-300 text-black mt-1"
            placeholder="Leadership Team"
          />
        </div>

        <div>
          <Label htmlFor="header-title-line1" className="text-white/80 text-sm">
            Title Line 1
          </Label>
          <Input
            id="header-title-line1"
            value={content.header?.title?.line1 || ''}
            onChange={(e) => updateContent('header.title.line1', e.target.value)}
            className="bg-white border-slate-300 text-black mt-1"
            placeholder="C-LEVEL EXPERTISE"
          />
        </div>

        <div>
          <Label htmlFor="header-title-line2" className="text-white/80 text-sm">
            Title Line 2 (Highlighted)
          </Label>
          <Input
            id="header-title-line2"
            value={content.header?.title?.line2 || ''}
            onChange={(e) => updateContent('header.title.line2', e.target.value)}
            className="bg-white border-slate-300 text-black mt-1"
            placeholder="ENTERPRISE LEADERSHIP EXPERIENCE"
          />
        </div>

        <div>
          <Label htmlFor="header-description" className="text-white/80 text-sm">
            Header Description
          </Label>
          <Textarea
            id="header-description"
            value={content.header?.description || ''}
            onChange={(e) => updateContent('header.description', e.target.value)}
            className="bg-white border-slate-300 text-black mt-1 min-h-[100px]"
            placeholder="Description of leadership team..."
          />
        </div>
      </div>

      {/* Team Stats */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">Team Statistics</h4>
        
        {content.teamStats?.slice(0, 2).map((stat, index) => (
          <div key={index} className="bg-slate-800 rounded-lg p-4 border border-slate-600 space-y-4">
            <div className="flex items-center justify-between">
              <h5 className="text-white font-medium">Stat #{index + 1}</h5>
              <span className="text-xl">📈</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white/80 text-sm">Value</Label>
                <Input
                  value={stat.value}
                  onChange={(e) => updateStat(index, 'value', e.target.value)}
                  className="bg-white border-slate-300 text-black mt-1"
                  placeholder="50+"
                />
              </div>
              
              <div>
                <Label className="text-white/80 text-sm">Label</Label>
                <Input
                  value={stat.label}
                  onChange={(e) => updateStat(index, 'label', e.target.value)}
                  className="bg-white border-slate-300 text-black mt-1"
                  placeholder="Years Combined Experience"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Leadership Profiles */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">Leadership Profiles</h4>
        
        {content.leadership?.slice(0, 2).map((leader, index) => (
          <div key={index} className="bg-slate-800 rounded-lg p-4 border border-slate-600 space-y-4">
            <div className="flex items-center justify-between">
              <h5 className="text-white font-medium">{leader.name}</h5>
              <span className="text-xl">👤</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white/80 text-sm">Name</Label>
                <Input
                  value={leader.name}
                  onChange={(e) => updateLeader(index, 'name', e.target.value)}
                  className="bg-white border-slate-300 text-black mt-1"
                  placeholder="Dr. Marcus Thompson"
                />
              </div>
              
              <div>
                <Label className="text-white/80 text-sm">Title</Label>
                <Input
                  value={leader.title}
                  onChange={(e) => updateLeader(index, 'title', e.target.value)}
                  className="bg-white border-slate-300 text-black mt-1"
                  placeholder="Chief Executive Officer"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-white/80 text-sm">Background</Label>
              <Input
                value={leader.background}
                onChange={(e) => updateLeader(index, 'background', e.target.value)}
                className="bg-white border-slate-300 text-black mt-1"
                placeholder="Former CTO at Fortune 100 Company"
              />
            </div>
            
            <div>
              <Label className="text-white/80 text-sm">Biography</Label>
              <Textarea
                value={leader.bio}
                onChange={(e) => updateLeader(index, 'bio', e.target.value)}
                className="bg-white border-slate-300 text-black mt-1 min-h-[80px]"
                placeholder="Leadership experience and background..."
              />
            </div>
            
            <div>
              <Label className="text-white/80 text-sm">Core Expertise (comma separated)</Label>
              <Input
                value={leader.expertise?.join(', ') || ''}
                onChange={(e) => {
                  const newContent = { ...content };
                  newContent.leadership[index].expertise = e.target.value.split(', ').filter(Boolean);
                  updateTeamContent(newContent);
                }}
                className="bg-white border-slate-300 text-black mt-1"
                placeholder="AI Strategy, Digital Transformation, Enterprise Architecture"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white/80 text-sm">Email</Label>
                <Input
                  value={leader.email}
                  onChange={(e) => updateLeader(index, 'email', e.target.value)}
                  className="bg-white border-slate-300 text-black mt-1"
                  placeholder="marcus@smartfactory.io"
                />
              </div>
              
              <div>
                <Label className="text-white/80 text-sm">LinkedIn URL</Label>
                <Input
                  value={leader.linkedin}
                  onChange={(e) => updateLeader(index, 'linkedin', e.target.value)}
                  className="bg-white border-slate-300 text-black mt-1"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Team Culture */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">Team Culture</h4>
        
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-600 space-y-4">
          <div>
            <Label className="text-white/80 text-sm">Culture Title</Label>
            <Input
              value={content.teamCulture?.title || ''}
              onChange={(e) => updateContent('teamCulture.title', e.target.value)}
              className="bg-white border-slate-300 text-black mt-1"
              placeholder="Enterprise Leadership. Startup Agility."
            />
          </div>
          
          <div>
            <Label className="text-white/80 text-sm">Culture Description</Label>
            <Textarea
              value={content.teamCulture?.description || ''}
              onChange={(e) => updateContent('teamCulture.description', e.target.value)}
              className="bg-white border-slate-300 text-black mt-1 min-h-[100px]"
              placeholder="Description of team culture and approach..."
            />
          </div>
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
        <h4 className="text-white font-medium mb-2 flex items-center">
          <MessageSquare className="w-4 h-4 mr-2" />
          Editing Tips
        </h4>
        <ul className="text-xs text-white/60 space-y-1">
          <li>• Changes appear instantly on the main website</li>
          <li>• Edit leadership profiles, team stats, and culture</li>
          <li>• Keep bios concise but impactful</li>
          <li>• Separate expertise areas with commas</li>
        </ul>
      </div>
    </div>
  );
}