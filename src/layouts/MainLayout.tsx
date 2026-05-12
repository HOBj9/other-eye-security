import type { PropsWithChildren } from 'react';
import { Navbar } from '../components/navigation/Navbar';

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative overflow-x-clip">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
