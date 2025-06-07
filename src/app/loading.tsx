import { Container } from "@components/UI";

export default function Loading() {
  return (
    <>
      <Container className="skeleton w-1/2" />
      <Container className="skeleton h-full w-full min-h-[200px] max-h-[800px] flex-1 p-8 my-2 lg:my-6 flex flex-wrap lg:items-center justify-center gap-2 lg:gap-4" />
      <p className="text-xs md:text-md lg:text-lg animate-pulse">Loading...</p>
    </>
  );
}
