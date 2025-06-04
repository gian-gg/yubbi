import { NavBar } from "@/components/Navigation";

export default async function NotFound() {
  return (
    <main className="h-[600px] w-full flex flex-col items-center">
      <NavBar>404 Not Found</NavBar>

      <div className="bg-base-200 min-h-60 w-full p-8 my-8 rounded-lg flex items-center justify-center gap-4">
        <kbd className="kbd kbd-lg w-40 h-40 text-[80px] transition-transform duration-200 bg-base-300">
          4
        </kbd>
        <kbd className="kbd kbd-lg w-40 h-40 text-[80px] transition-transform duration-200 bg-base-300">
          0
        </kbd>
        <kbd className="kbd kbd-lg w-40 h-40 text-[80px] transition-transform duration-200 bg-base-300">
          4
        </kbd>
      </div>
      <p>Requested resource cannot be Found.</p>
    </main>
  );
}
