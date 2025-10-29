import AdminPanel from '../AdminPanel';
import { Web3Provider } from '@/contexts/Web3Context';

export default function AdminPanelExample() {
  return (
    <Web3Provider>
      <AdminPanel onBack={() => console.log('Back clicked')} />
    </Web3Provider>
  );
}
