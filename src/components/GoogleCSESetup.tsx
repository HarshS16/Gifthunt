
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ExternalLink, Info, Key, Search } from 'lucide-react';

export const GoogleCSESetup = () => {
  return (
    <Card className="p-6 bg-blue-50 border-blue-200">
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 mt-1" />
        <div className="space-y-4">
          <h3 className="font-semibold text-blue-900">Google Custom Search Engine Setup Required</h3>
          
          <p className="text-blue-800 text-sm">
            To get real product listings from Indian e-commerce sites, you need to set up Google CSE credentials.
          </p>
          
          <div className="space-y-2">
            <h4 className="font-medium text-blue-900">Steps to set up:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
              <li>Create a Google Custom Search Engine</li>
              <li>Get your Search Engine ID (CSE ID)</li>
              <li>Get a Google API Key</li>
              <li>Add these to your Supabase environment variables</li>
            </ol>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('https://cse.google.com/cse/', '_blank')}
              className="text-blue-700 border-blue-300 hover:bg-blue-100"
            >
              <Search className="h-4 w-4 mr-1" />
              Create CSE
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('https://console.developers.google.com/apis/credentials', '_blank')}
              className="text-blue-700 border-blue-300 hover:bg-blue-100"
            >
              <Key className="h-4 w-4 mr-1" />
              Get API Key
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </div>
          
          <Alert>
            <AlertDescription className="text-xs">
              <strong>Environment Variables needed:</strong>
              <br />
              • GOOGLE_CSE_ID (your Custom Search Engine ID)
              <br />
              • GOOGLE_API_KEY (your Google API key)
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </Card>
  );
};
