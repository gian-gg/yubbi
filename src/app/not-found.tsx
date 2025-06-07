import { NavBar, Container } from "@/components/Navigation";

export default async function NotFound() {
  return (
    <>
      <NavBar>404 Not Found</NavBar>

      <Container className="h-full w-full p-8 my-2 lg:my-6 flex flex-wrap lg:items-center justify-center gap-2 lg:gap-4">
        <kbd className="kbd kbd-lg w-20 h-20 lg:w-40 lg:h-40 text-[40px] lg:text-[80px] transition-transform duration-200 bg-base-300 ">
          4
        </kbd>
        <kbd className="kbd kbd-lg w-20 h-20 lg:w-40 lg:h-40 text-[40px] lg:text-[80px] transition-transform duration-200 bg-base-300 ">
          0
        </kbd>
        <kbd className="kbd kbd-lg w-20 h-20 lg:w-40 lg:h-40 text-[40px] lg:text-[80px] transition-transform duration-200 bg-base-300 ">
          4
        </kbd>
      </Container>
      <p className="text-xs md:text-md lg:text-lg text-error">
        Requested resource cannot be Found.
      </p>
    </>
  );
}
