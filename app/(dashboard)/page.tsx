'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSession } from 'next-auth/react';

export default function ProductsPage() {
  const { data: session } = useSession();
  const token = session?.accessToken;

  return (
    <Tabs defaultValue="all">
      {token && (
        <div className="mb-4">
          <Badge variant="secondary" className="text-xs">
            Access Token: {token}
          </Badge>
        </div>
      )}
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button 
            size="sm" 
            className="h-8 gap-1" 
            disabled={!token}
            onClick={async () => {
              if (!token) return;

              try {
                const resp = await fetch("http://localhost:8000/authenticated-ping", {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                  },
                });

                if (!resp.ok) {
                  throw new Error(`HTTP error! status: ${resp.status}`);
                }

                const data = await resp.json();
                console.log(data);
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            }}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Fetch Data
            </span>
          </Button>
        </div>
      </div>
    </Tabs>
  );
}