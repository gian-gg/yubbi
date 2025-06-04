export default function Loading() {
  return (
    <main className="h-[600px] w-full flex flex-col items-center">
      <div className="skeleton bg-base-200 p-2 px-6 rounded-lg text-base-content/75 w-1/2 h-10"></div>
      <div className="skeleton bg-base-200 min-h-60 w-full p-8 my-8 rounded-lg flex items-center justify-center gap-4"></div>
      <p>Loading...</p>
    </main>
  );
}
