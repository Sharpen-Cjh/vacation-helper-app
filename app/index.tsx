import queryClient from '@/src/api/queryClient';
import RootNavigator from '@/src/navigations/root/RootNavigator';
import { QueryClientProvider } from '@tanstack/react-query';

export default function Index() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator />
    </QueryClientProvider>
  );
}
