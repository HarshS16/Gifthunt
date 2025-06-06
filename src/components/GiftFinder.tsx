
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Sparkles, Search } from 'lucide-react';

interface GiftFinderProps {
  onSearch: (params: any) => void;
  isSearching: boolean;
}

export const GiftFinder = ({ onSearch, isSearching }: GiftFinderProps) => {
  const [formData, setFormData] = useState({
    occasion: '',
    budget: [50],
    recipient: '',
    age: '',
    gender: '',
    interests: [] as string[],
    relationship: '',
    personalityType: ''
  });

  const occasions = [
    'Birthday', 'Anniversary', 'Wedding', 'Christmas', 'Valentine\'s Day',
    'Mother\'s Day', 'Father\'s Day', 'Graduation', 'New Job', 'Housewarming',
    'Baby Shower', 'Retirement', 'Just Because'
  ];

  const interestOptions = [
    'Technology', 'Sports', 'Music', 'Art', 'Cooking', 'Reading',
    'Fitness', 'Travel', 'Gaming', 'Fashion', 'Home Decor', 'Gardening',
    'Photography', 'Movies', 'Coffee', 'Wine', 'Outdoor Activities'
  ];

  const relationships = [
    'Partner/Spouse', 'Parent', 'Sibling', 'Friend', 'Colleague',
    'Boss', 'Child', 'Grandparent', 'Teacher', 'Neighbor'
  ];

  const personalityTypes = [
    'Adventurous', 'Creative', 'Practical', 'Luxury Lover', 'Minimalist',
    'Tech Enthusiast', 'Homebody', 'Social Butterfly', 'Eco-Conscious'
  ];

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        interests: prev.interests.filter(i => i !== interest)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 bg-black/40 backdrop-blur-md border border-white/20 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <Search className="h-8 w-8 text-purple-400" />
            Gift Finder
          </h2>
          <p className="text-gray-300">Tell us about the recipient and we'll find the perfect gift</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Occasion */}
            <div className="space-y-2">
              <Label htmlFor="occasion" className="text-white font-medium">What's the occasion?</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, occasion: value }))}>
                <SelectTrigger className="bg-black/50 border-white/30 text-white">
                  <SelectValue placeholder="Select an occasion" />
                </SelectTrigger>
                <SelectContent>
                  {occasions.map(occasion => (
                    <SelectItem key={occasion} value={occasion}>{occasion}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Relationship */}
            <div className="space-y-2">
              <Label htmlFor="relationship" className="text-white font-medium">Your relationship to them</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, relationship: value }))}>
                <SelectTrigger className="bg-black/50 border-white/30 text-white">
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  {relationships.map(rel => (
                    <SelectItem key={rel} value={rel}>{rel}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age" className="text-white font-medium">Their age (approximate)</Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g., 25"
                className="bg-black/50 border-white/30 text-white placeholder-gray-400"
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-white font-medium">Gender</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                <SelectTrigger className="bg-black/50 border-white/30 text-white">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-4">
            <Label className="text-white font-medium">Budget Range</Label>
            <div className="px-4">
              <Slider
                value={formData.budget}
                onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
                max={500}
                min={5}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>$5</span>
                <span className="text-white font-medium">${formData.budget[0]}</span>
                <span>$500+</span>
              </div>
            </div>
          </div>

          {/* Personality Type */}
          <div className="space-y-2">
            <Label className="text-white font-medium">Their personality type</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, personalityType: value }))}>
              <SelectTrigger className="bg-black/50 border-white/30 text-white">
                <SelectValue placeholder="Select personality type" />
              </SelectTrigger>
              <SelectContent>
                {personalityTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Interests */}
          <div className="space-y-4">
            <Label className="text-white font-medium">Their interests (select all that apply)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {interestOptions.map(interest => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest}
                    checked={formData.interests.includes(interest)}
                    onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                    className="border-white/30"
                  />
                  <Label htmlFor={interest} className="text-sm text-gray-300 cursor-pointer">
                    {interest}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSearching || !formData.occasion}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 text-lg transition-all duration-300 transform hover:scale-105"
          >
            {isSearching ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Finding Perfect Gifts...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Find My Perfect Gift
              </>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};
