import LiveRankingsDashboard from '../LiveRankingsDashboard';
import { Web3Provider } from '@/contexts/Web3Context';

export default function LiveRankingsDashboardExample() {
  return (
    <Web3Provider>
      <LiveRankingsDashboard onBack={() => console.log('Back clicked')} />
    </Web3Provider>
  );
}
