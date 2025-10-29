import { useState } from 'react';
import { Trash2, RotateCcw, Shield, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWeb3 } from '@/contexts/Web3Context';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface AdminPanelProps {
  onBack: () => void;
}

export default function AdminPanel({ onBack }: AdminPanelProps) {
  const { account } = useWeb3();
  const [showWipeVotesDialog, setShowWipeVotesDialog] = useState(false);
  const [showDeleteContestantsDialog, setShowDeleteContestantsDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleWipeVotes = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('All votes wiped');
    setShowWipeVotesDialog(false);
    setIsProcessing(false);
  };

  const handleDeleteContestants = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('All contestants deleted');
    setShowDeleteContestantsDialog(false);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-muted-foreground hover-elevate"
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="font-display font-bold text-4xl text-foreground text-glow-purple">
              Admin Panel
            </h1>
          </div>
          {account && (
            <div className="px-4 py-2 border-2 border-chart-1 bg-chart-1/10 rounded-md glow-purple">
              <p className="text-sm font-mono text-foreground">
                {account.slice(0, 6)}...{account.slice(-4)}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          <Card className="p-6 bg-black border-2 border-chart-1 glow-purple">
            <h3 className="font-display font-semibold text-lg text-chart-1 mb-4">
              Contest Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-chart-2">42</p>
                <p className="text-sm text-chart-2">Total Votes</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-chart-3">6</p>
                <p className="text-sm text-chart-3">Contestants</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-chart-1">18</p>
                <p className="text-sm text-chart-1">Voters</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-chart-2">42</p>
                <p className="text-sm text-chart-2">Highest Votes</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="font-display font-semibold text-2xl text-foreground">
            Admin Actions
          </h2>

          <Card className="p-8 bg-black border-2 border-chart-3 glow-orange">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <RotateCcw className="w-6 h-6 text-chart-3" />
                  <h3 className="font-display font-semibold text-xl text-chart-3">
                    Wipe All Votes
                  </h3>
                </div>
                <p className="text-chart-3 mb-4">
                  Reset all vote counts to zero while keeping contestants in the system.
                  This action cannot be undone.
                </p>
              </div>
              <Button
                onClick={() => setShowWipeVotesDialog(true)}
                className="bg-chart-3 hover:bg-chart-3 border-2 border-chart-3 text-black font-display font-semibold glow-orange-intense"
                data-testid="button-wipe-votes"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Wipe Votes
              </Button>
            </div>
          </Card>

          <Card className="p-8 bg-black border-2 border-destructive">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Trash2 className="w-6 h-6 text-destructive" />
                  <h3 className="font-display font-semibold text-xl text-destructive">
                    Delete All Contestants
                  </h3>
                </div>
                <p className="text-destructive mb-4">
                  Permanently remove all contestants and their associated data from the system.
                  This action cannot be undone.
                </p>
              </div>
              <Button
                onClick={() => setShowDeleteContestantsDialog(true)}
                className="bg-destructive hover:bg-destructive border-2 border-destructive text-destructive-foreground font-display font-semibold"
                data-testid="button-delete-contestants"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete All
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <AlertDialog open={showWipeVotesDialog} onOpenChange={setShowWipeVotesDialog}>
        <AlertDialogContent className="bg-black border-2 border-chart-3 glow-orange">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-2xl flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-chart-3" />
              Wipe All Votes?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will reset all vote counts to zero. Contestants will remain in the system,
              but all voting data will be permanently lost. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing} data-testid="button-cancel-wipe">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleWipeVotes}
              disabled={isProcessing}
              className="bg-chart-3 hover:bg-chart-3 text-black"
              data-testid="button-confirm-wipe"
            >
              {isProcessing ? 'Wiping...' : 'Wipe All Votes'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showDeleteContestantsDialog} onOpenChange={setShowDeleteContestantsDialog}>
        <AlertDialogContent className="bg-black border-2 border-destructive">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-2xl flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-destructive" />
              Delete All Contestants?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all contestants and their data from the system.
              This action cannot be undone and will also remove all associated votes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing} data-testid="button-cancel-delete">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteContestants}
              disabled={isProcessing}
              className="bg-destructive hover:bg-destructive text-destructive-foreground"
              data-testid="button-confirm-delete"
            >
              {isProcessing ? 'Deleting...' : 'Delete All Contestants'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
