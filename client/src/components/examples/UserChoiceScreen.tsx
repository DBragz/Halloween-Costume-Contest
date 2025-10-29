import UserChoiceScreen from '../UserChoiceScreen';
import { Web3Provider } from '@/contexts/Web3Context';

export default function UserChoiceScreenExample() {
  return (
    <Web3Provider>
      <UserChoiceScreen
        onEnterContest={() => console.log('Enter contest clicked')}
        onGoToVoting={() => console.log('Go to voting clicked')}
      />
    </Web3Provider>
  );
}
