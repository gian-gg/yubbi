import { redirect } from "next/navigation";
import Loading from "./loading";

const Home = () => {
  redirect("/roulette");

  return <Loading />;
};

export default Home;
