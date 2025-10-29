import ContestRegistrationForm from '../ContestRegistrationForm';
import { Web3Provider } from '@/contexts/Web3Context';

export default function ContestRegistrationFormExample() {
  return (
    <Web3Provider>
      <ContestRegistrationForm
        onBack={() => console.log('Back clicked')}
        onSubmit={(data) => console.log('Form submitted:', data)}
      />
    </Web3Provider>
  );
}
