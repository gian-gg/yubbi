import { Container } from "@components/UI";
import { FingerContainer } from "@components/Components";

export default function Loading() {
  return (
    <>
      <Container className="skeleton w-1/2" />
      <FingerContainer className="skeleton" />
      <p className="text-xs md:text-md lg:text-lg animate-pulse">Loading...</p>
    </>
  );
}
