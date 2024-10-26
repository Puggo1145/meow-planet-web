// Customize toast style
import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      toastOptions={{
        classNames: {
          error: 'bg-red-50 text-red-800 border-red-200',
        },
      }}
    />
  );
}
