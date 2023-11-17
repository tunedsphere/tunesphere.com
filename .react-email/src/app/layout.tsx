import '../styles/globals.css';
import classnames from 'classnames';
import { GeistSans } from "geist/font";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-slate-12 font-sans">
        <div className={classnames(GeistSans.variable, 'font-sans')}>
          {children}
        </div>
      </body>
    </html>
  );
}
