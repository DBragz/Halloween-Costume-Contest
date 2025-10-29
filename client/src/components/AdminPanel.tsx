import { useState } from 'react';
import { Trash2, RotateCcw, ArrowLeft, AlertTriangle, Lock } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import type { Contestant } from '@shared/schema';
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
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showWipeVotesDialog, setShowWipeVotesDialog] = useState(false);
  const [showDeleteContestantsDialog, setShowDeleteContestantsDialog] = useState(false);
  const [deleteContestantId, setDeleteContestantId] = useState<string | null>(null);

  const { data: contestants = [], isLoading } = useQuery<Contestant[]>({
    queryKey: ['/api', 'contestants'],
    enabled: isAuthenticated,
  });

  const wipeVotesMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/contestants/wipe-votes');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api', 'contestants'] });
      queryClient.invalidateQueries({ queryKey: ['/api', 'votes'] });
      toast({
        title: "Votes Wiped",
        description: "All vote counts have been reset to zero.",
      });
      setShowWipeVotesDialog(false);
    },
    onError: () => {
      toast({
        title: "Error Wiping Votes",
        description: "Failed to wipe votes. The dialog is still open - you can try again or cancel.",
        variant: "destructive",
      });
    },
  });

  const deleteAllMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('DELETE', '/api/contestants');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api', 'contestants'] });
      queryClient.invalidateQueries({ queryKey: ['/api', 'votes'] });
      toast({
        title: "Contestants Deleted",
        description: "All contestants have been removed from the system.",
      });
      setShowDeleteContestantsDialog(false);
    },
    onError: () => {
      toast({
        title: "Error Deleting Contestants",
        description: "Failed to delete contestants. The dialog is still open - you can try again or cancel.",
        variant: "destructive",
      });
    },
  });

  const deleteContestantMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest('DELETE', `/api/contestants/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api', 'contestants'] });
      queryClient.invalidateQueries({ queryKey: ['/api', 'votes'] });
      toast({
        title: "Contestant Deleted",
        description: "The contestant has been removed.",
      });
      setDeleteContestantId(null);
    },
    onError: () => {
      toast({
        title: "Error Deleting Contestant",
        description: "Failed to delete contestant. The dialog is still open - you can try again or cancel.",
        variant: "destructive",
      });
    },
  });

  const handlePasswordSubmit = () => {
    if (password === 'drowssap') {
      setIsAuthenticated(true);
      setPasswordError('');
      setPassword('');
    } else {
      setPasswordError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const handlePasswordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePasswordSubmit();
    }
  };

  const handleCancelPassword = () => {
    setPassword('');
    setPasswordError('');
    onBack();
  };

  // Calculate statistics
  const totalContestants = contestants.length;
  const totalVotes = contestants.reduce((sum, c) => sum + c.votes, 0);
  const highestVotes = contestants.length > 0 ? Math.max(...contestants.map(c => c.votes)) : 0;
  const averageVotes = totalContestants > 0 ? (totalVotes / totalContestants).toFixed(1) : '0';

  if (!isAuthenticated) {
    return (
      <AlertDialog open={true}>
        <AlertDialogContent className="bg-background border-2 border-chart-1 glow-purple">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-2xl flex items-center gap-3">
              <Lock className="w-6 h-6 text-chart-1" />
              Admin Access Required
            </AlertDialogTitle>
            <AlertDialogDescription>
              Please enter the admin password to access the admin panel.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handlePasswordKeyPress}
              className="bg-background border-2 border-chart-1/30 focus:border-chart-1 h-12"
              data-testid="input-admin-password"
            />
            {passwordError && (
              <p className="text-destructive text-sm mt-2" data-testid="text-password-error">
                {passwordError}
              </p>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelPassword} data-testid="button-cancel-password">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handlePasswordSubmit}
              className="bg-chart-1 hover:bg-chart-1 text-white"
              data-testid="button-submit-password"
            >
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <div className="min-h-screen bg-background p-3 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-muted-foreground hover-elevate"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="font-display font-bold text-2xl sm:text-4xl text-chart-1">
            Admin Panel
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-4 sm:mb-8">
          <Card className="p-4 sm:p-6 bg-background border-2 border-chart-1 glow-purple">
            <h3 className="font-display font-semibold text-base sm:text-lg text-chart-1 mb-3 sm:mb-4">
              Contest Statistics
            </h3>
            {isLoading ? (
              <div className="text-center text-muted-foreground text-sm">Loading statistics...</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-display font-bold text-chart-1" data-testid="stat-total-votes">
                    {totalVotes}
                  </p>
                  <p className="text-xs sm:text-sm text-chart-1">Total Votes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-display font-bold text-chart-1" data-testid="stat-total-contestants">
                    {totalContestants}
                  </p>
                  <p className="text-xs sm:text-sm text-chart-1">Contestants</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-display font-bold text-chart-1" data-testid="stat-avg-votes">
                    {averageVotes}
                  </p>
                  <p className="text-xs sm:text-sm text-chart-1">Avg Votes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-display font-bold text-chart-1" data-testid="stat-highest-votes">
                    {highestVotes}
                  </p>
                  <p className="text-xs sm:text-sm text-chart-1">Highest Votes</p>
                </div>
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <h2 className="font-display font-semibold text-xl sm:text-2xl text-foreground">
            Admin Actions
          </h2>

          <Card className="p-4 sm:p-8 bg-background border-2 border-chart-3 glow-orange">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 text-chart-3" />
                  <h3 className="font-display font-semibold text-lg sm:text-xl text-chart-3">
                    Wipe All Votes
                  </h3>
                </div>
                <p className="text-chart-3 text-sm sm:text-base mb-4">
                  Reset all vote counts to zero while keeping contestants in the system.
                  This action cannot be undone.
                </p>
              </div>
              <Button
                onClick={() => setShowWipeVotesDialog(true)}
                disabled={wipeVotesMutation.isPending}
                className="bg-chart-3 hover:bg-chart-3 border-2 border-chart-3 text-black font-display font-semibold glow-orange-intense w-full sm:w-auto"
                data-testid="button-wipe-votes"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Wipe Votes
              </Button>
            </div>
          </Card>

          <Card className="p-4 sm:p-8 bg-background border-2 border-destructive">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 text-destructive" />
                  <h3 className="font-display font-semibold text-lg sm:text-xl text-destructive">
                    Delete All Contestants
                  </h3>
                </div>
                <p className="text-destructive text-sm sm:text-base mb-4">
                  Permanently remove all contestants and their associated data from the system.
                  This action cannot be undone.
                </p>
              </div>
              <Button
                onClick={() => setShowDeleteContestantsDialog(true)}
                disabled={deleteAllMutation.isPending}
                className="bg-destructive hover:bg-destructive border-2 border-destructive text-destructive-foreground font-display font-semibold w-full sm:w-auto"
                data-testid="button-delete-contestants"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete All
              </Button>
            </div>
          </Card>
        </div>

        {/* Contestant List */}
        {contestants.length > 0 && (
          <div className="mt-4 sm:mt-8">
            <h2 className="font-display font-semibold text-xl sm:text-2xl text-foreground mb-3 sm:mb-4">
              Manage Contestants
            </h2>
            <Card className="p-3 sm:p-6 bg-background border-2 border-chart-2">
              <div className="space-y-2 sm:space-y-3">
                {contestants.map((contestant) => (
                  <div
                    key={contestant.id}
                    className="flex items-center justify-between p-3 sm:p-4 rounded-md border border-border hover-elevate"
                    data-testid={`contestant-item-${contestant.id}`}
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="font-display font-semibold text-foreground text-sm sm:text-base truncate">
                        {contestant.personName}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">
                        {contestant.costumeName} • {contestant.votes} votes
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setDeleteContestantId(contestant.id)}
                      disabled={deleteContestantMutation.isPending}
                      className="text-xs sm:text-sm"
                      data-testid={`button-delete-${contestant.id}`}
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                      <span className="hidden sm:inline">Delete</span>
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Wipe Votes Dialog */}
      <AlertDialog open={showWipeVotesDialog} onOpenChange={setShowWipeVotesDialog}>
        <AlertDialogContent className="bg-background border-2 border-chart-3 glow-orange">
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
            <AlertDialogCancel disabled={wipeVotesMutation.isPending} data-testid="button-cancel-wipe">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => wipeVotesMutation.mutate()}
              disabled={wipeVotesMutation.isPending}
              className="bg-chart-3 hover:bg-chart-3 text-black"
              data-testid="button-confirm-wipe"
            >
              {wipeVotesMutation.isPending ? 'Wiping...' : 'Wipe All Votes'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete All Contestants Dialog */}
      <AlertDialog open={showDeleteContestantsDialog} onOpenChange={setShowDeleteContestantsDialog}>
        <AlertDialogContent className="bg-background border-2 border-destructive">
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
            <AlertDialogCancel disabled={deleteAllMutation.isPending} data-testid="button-cancel-delete">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteAllMutation.mutate()}
              disabled={deleteAllMutation.isPending}
              className="bg-destructive hover:bg-destructive text-destructive-foreground"
              data-testid="button-confirm-delete"
            >
              {deleteAllMutation.isPending ? 'Deleting...' : 'Delete All Contestants'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Individual Contestant Dialog */}
      <AlertDialog open={deleteContestantId !== null} onOpenChange={(open) => !open && setDeleteContestantId(null)}>
        <AlertDialogContent className="bg-background border-2 border-destructive">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-2xl flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-destructive" />
              Delete Contestant?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this contestant and their votes.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteContestantMutation.isPending} data-testid="button-cancel-delete-individual">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteContestantId && deleteContestantMutation.mutate(deleteContestantId)}
              disabled={deleteContestantMutation.isPending}
              className="bg-destructive hover:bg-destructive text-destructive-foreground"
              data-testid="button-confirm-delete-individual"
            >
              {deleteContestantMutation.isPending ? 'Deleting...' : 'Delete Contestant'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
