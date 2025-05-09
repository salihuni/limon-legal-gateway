
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [data, setData] = useState<any[]>([]);

  const testConnection = async () => {
    setConnectionStatus('loading');
    try {
      // Try to fetch a single message from the database
      const { data, error } = await supabase.from('messages').select('*').limit(3);
      
      if (error) {
        throw error;
      }
      
      setData(data || []);
      setConnectionStatus('success');
      toast({
        title: "Connection Successful!",
        description: `Retrieved ${data?.length || 0} records from the messages table.`,
      });
    } catch (error) {
      console.error('Supabase connection error:', error);
      setConnectionStatus('error');
      toast({
        title: "Connection Failed",
        description: "Could not connect to Supabase. Check the console for details.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Supabase Connection Test</h1>
          <p className="text-gray-600 mb-6">
            Click the button below to test your connection to Supabase
          </p>
          
          <Button 
            onClick={testConnection} 
            disabled={connectionStatus === 'loading'}
            className="mb-6"
          >
            {connectionStatus === 'loading' ? 'Testing...' : 'Test Connection'}
          </Button>

          {connectionStatus === 'success' && (
            <div className="p-4 border border-green-200 rounded bg-green-50 text-green-700">
              <p className="font-semibold">Connection successful!</p>
              <p>Your app is properly connected to Supabase.</p>
            </div>
          )}

          {connectionStatus === 'error' && (
            <div className="p-4 border border-red-200 rounded bg-red-50 text-red-700">
              <p className="font-semibold">Connection failed!</p>
              <p>There was an error connecting to Supabase. Check the console for details.</p>
              <div className="mt-2 text-sm">
                <p>Common issues:</p>
                <ul className="list-disc list-inside">
                  <li>Incorrect URL or API key</li>
                  <li>Network connectivity problems</li>
                  <li>CORS issues</li>
                  <li>Missing environment variables</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {connectionStatus === 'success' && data.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">Retrieved Data (Messages Table):</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Email</th>
                    <th className="px-4 py-2 border">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="px-4 py-2 border">{item.name}</td>
                      <td className="px-4 py-2 border">{item.email}</td>
                      <td className="px-4 py-2 border truncate max-w-xs">{item.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-8 text-sm text-gray-600">
          <h3 className="font-medium mb-2">Environment Configuration:</h3>
          <p className="mb-1">Supabase URL: {supabase.supabaseUrl}</p>
          <p>API Key is {supabase.supabaseKey ? 'Set' : 'Not Set'}</p>
          
          <div className="mt-4 p-3 bg-gray-50 rounded border">
            <p className="font-medium mb-1">Troubleshooting Tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Make sure your Supabase project is active</li>
              <li>Check that VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are correct</li>
              <li>For Vercel deployment, verify environment variables are named correctly</li>
              <li>Check Supabase's Authentication settings for proper URL configuration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
