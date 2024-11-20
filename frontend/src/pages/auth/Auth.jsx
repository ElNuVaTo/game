import FormUser from "@/pages/auth/components/FormUser";

const Home = () => {
  return (
    <section className=" relative flex sm:items-center sm:justify-center pt-16 justify-start sm:h-screen sm:p-0">
      <div className="sm:relative sm:-top-20">
        <FormUser />
      </div>
    </section>
  );
};

export default Home;
