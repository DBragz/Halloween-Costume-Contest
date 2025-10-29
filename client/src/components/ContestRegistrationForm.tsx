import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWeb3 } from '@/contexts/Web3Context';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface ContestRegistrationFormProps {
  onBack: () => void;
}

export default function ContestRegistrationForm({ onBack }: ContestRegistrationFormProps) {
  const { account } = useWeb3();
  const { toast } = useToast();
  const [personName, setPersonName] = useState('');
  const [costumeName, setCostumeName] = useState('');

  const submitMutation = useMutation({
    mutationFn: async (data: { personName: string; costumeName: string; walletAddress: string }) => {
      const res = await apiRequest('POST', '/api/contestants', data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your costume entry has been submitted.",
      });
      setPersonName('');
      setCostumeName('');
      onBack();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit entry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account) {
      toast({
        title: "Error",
        description: "Please connect your wallet first.",
        variant: "destructive",
      });
      return;
    }
    submitMutation.mutate({ personName, costumeName, walletAddress: account });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-muted-foreground hover-elevate"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <Card className="p-8 bg-background border-2 border-chart-3 glow-orange">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="font-display font-bold text-4xl text-chart-3 text-glow-orange">
                Enter Contest
              </h1>
              <p className="text-chart-3">
                Tell us about your amazing Halloween costume
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="personName" className="text-chart-3 font-display">
                  Person's Name
                </Label>
                <Input
                  id="personName"
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="bg-background border-2 border-chart-3/30 focus:border-chart-3 focus:glow-orange h-12"
                  data-testid="input-person-name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="costumeName" className="text-chart-3 font-display">
                  Costume Design Name
                </Label>
                <Input
                  id="costumeName"
                  value={costumeName}
                  onChange={(e) => setCostumeName(e.target.value)}
                  placeholder="Enter your costume name"
                  required
                  className="bg-background border-2 border-chart-3/30 focus:border-chart-3 focus:glow-orange h-12"
                  data-testid="input-costume-name"
                />
              </div>

              <Button
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full bg-chart-3 hover:bg-chart-3 border-2 border-chart-3 text-black font-display font-semibold text-lg py-6 glow-orange-intense"
                data-testid="button-submit-entry"
              >
                {submitMutation.isPending ? 'Submitting...' : 'Submit Entry'}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
