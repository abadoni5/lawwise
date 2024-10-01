import Chat from "@/components/chat";
import { ThemeToggle } from "@/components/theme-toggle";

export default function UsersPage() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">Lawwise for Users</h1>
        <ThemeToggle />
      </header>
      <main className="flex-grow p-4">
        <Chat userType="user" />
      </main>
    </div>
  );
}
