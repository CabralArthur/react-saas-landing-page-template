import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from 'lucide-react';
import { FormData } from '../types';

interface TeamInfoSectionProps {
  formData: FormData;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onChange: (field: keyof FormData, value: string) => void;
}

export function TeamInfoSection({ formData, isLoading, onSubmit, onChange }: TeamInfoSectionProps) {
  return (
    <div className="space-y-1">
        <div className="flex flex-col mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Team Settings</h1>
            <p className="text-lg text-muted-foreground">
                Manage your team's information and settings
            </p>
        </div>
        <Card>
        <CardContent>
            <form onSubmit={onSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                Team Name
                </label>
                <Input
                id="name"
                value={formData.name}
                onChange={(e) => onChange('name', e.target.value)}
                placeholder="Enter team name"
                required
                />
            </div>
            
            <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                Description
                </label>
                <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => onChange('description', e.target.value)}
                placeholder="Enter team description"
                rows={4}
                />
            </div>

            <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                </>
                ) : (
                'Save Changes'
                )}
            </Button>
            </form>
        </CardContent>
        </Card>
    </div>
  );
} 