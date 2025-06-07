import { Container, KeyElement } from "@components/UI";
import { ToolBar } from "@components/Components";

export default async function NotFound() {
  return (
    <>
      <ToolBar>404 Not Found</ToolBar>

      <Container className="h-full w-full p-8 my-2 lg:my-6 flex flex-wrap lg:items-center justify-center gap-2 lg:gap-4">
        <KeyElement character="4" />
        <KeyElement character="0" />
        <KeyElement character="4" />
      </Container>
      <p className="text-xs md:text-md lg:text-lg text-error">
        Requested resource cannot be Found.
      </p>
    </>
  );
}
