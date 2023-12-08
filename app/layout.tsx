import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export default function RootLayout({children}:{ children: React.ReactNode }){
  return (
    <html lang="kr">
      <body className={`${inter.className} antialiasing`}>{children}</body>
    </html>
  );
}
