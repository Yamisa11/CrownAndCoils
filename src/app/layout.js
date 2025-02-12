import { Inter } from 'next/font/google'
import './globals.css';  // If you place it under the app folder itself


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Crown&Coils App',
  description: 'A beauty stop',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
            <head>
            <script
          src="https://assets.adobedtm.com/43e08a8c9425/001e5275eba1/launch-5c5def145b42-development.min.js"
          async
        ></script>
      </head>

      <body className={inter.className}>{children}</body>
    </html>
  )
}