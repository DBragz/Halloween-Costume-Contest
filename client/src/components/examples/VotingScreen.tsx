import VotingScreen from '../VotingScreen';
import { Web3Provider } from '@/contexts/Web3Context';

export default function VotingScreenExample() {
  return (
    <Web3Provider>
      <VotingScreen onBack={() => console.log('Back clicked')} />
    </Web3Provider>
  );
}
