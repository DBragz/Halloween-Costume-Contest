import { useState } from 'react';
import ContestantCard from '../ContestantCard';

export default function ContestantCardExample() {
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState(42);

  const handleVote = () => {
    setHasVoted(true);
    setVotes(votes + 1);
  };

  return (
    <div className="min-h-screen bg-background p-6 flex items-center justify-center">
      <div className="max-w-md w-full">
        <ContestantCard
          id={1}
          name="Vampire Lord"
          description="Classic vampire costume with custom fangs, flowing cape, and authentic Victorian-era clothing. Complete with theatrical makeup and contacts."
          votes={votes}
          hasVoted={hasVoted}
          onVote={handleVote}
        />
      </div>
    </div>
  );
}
