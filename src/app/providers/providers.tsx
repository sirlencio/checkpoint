'use client';

import { AuthProvider } from './AuthProvider';

interface Props {
  readonly children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return <AuthProvider>{children}</AuthProvider>;
}
