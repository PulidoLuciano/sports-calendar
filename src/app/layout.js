import LanguageProvider from "@/components/LanguageProvider";
import "./globals.css";
import ThemeProvider from "@/components/themeProvider";

export const metadata = {
  title: "SportsCalendar",
  description: "SportsCalendar is an app to easily create events in google calendar for your favorite team's matches. Log in with your google account, choose your favorite teams and it's ready. You'll receive all the events in your calendar.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-black">
        <LanguageProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
