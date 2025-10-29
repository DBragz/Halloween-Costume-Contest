import WelcomeScreen from '../WelcomeScreen';
import { Web3Provider } from '@/contexts/Web3Context';

export default function WelcomeScreenExample() {
  return (
    <Web3Provider>
      <WelcomeScreen />
    </Web3Provider>
  );
}
