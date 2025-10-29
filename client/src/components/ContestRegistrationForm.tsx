import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ContestRegistrationFormProps {
  onBack: () => void;
  onSubmit: (data: { name: string; description: string }) => void;
}

export default function ContestRegistrationForm({ onBack, onSubmit }: ContestRegistrationFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement API call to submit contest entry
    onSubmit({ name, description });
    setIsSubmitting(false);
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
                <Label htmlFor="name" className="text-chart-3 font-display">
                  Your Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="bg-background border-2 border-chart-3/30 focus:border-chart-3 focus:glow-orange h-12"
                  data-testid="input-contestant-name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-chart-3 font-display">
                  Costume Description
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your costume in detail..."
                  required
                  rows={6}
                  className="bg-background border-2 border-chart-3/30 focus:border-chart-3 focus:glow-orange resize-none"
                  data-testid="input-costume-description"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-chart-3 hover:bg-chart-3 border-2 border-chart-3 text-black font-display font-semibold text-lg py-6 glow-orange-intense"
                data-testid="button-submit-entry"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Entry'}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
