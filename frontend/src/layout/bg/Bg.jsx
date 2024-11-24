import d from "@/assets/Bg1.png";
import Gatos from "@/assets/bg/cat4.jpeg";

const Bg = () => {
  return (
    <>
      <span className="bgContainer -z-20"></span>

      <div className="Bg">
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundSize: "109px",
            backgroundRepeat: "repeat",
            backgroundImage: `url(${Gatos})`,
            opacity: 0.01,
            borderRadius: "0",
          }}
        ></div>
      </div>

      <span className="fixed w-full max-w-32 max-h-32 h-full sm:max-w-48 sm:max-h-48  md:max-w-64 md:max-h-64 lg:max-w-96 lg:max-h-96 bottom-3 left-3 overflow-hidden no-interaction">
        <span className="absolute h-full max-h-52 w-2 left-0 bottom-0 decorative-gradient-t"></span>
        <span className="absolute h-2 w-full max-w-96 left-0 bottom-0 decorative-gradient-l"></span>
        <span className="absolute h-5 w-5 left-0 bottom-0 decorative-corners-triangle"></span>
      </span>

      <span className="fixed w-full max-w-32 max-h-32 h-full sm:max-w-48 sm:max-h-48  md:max-w-64 md:max-h-64 lg:max-w-96 lg:max-h-96 bottom-3 right-3 overflow-hidden no-interaction">
        <span className="absolute h-full max-h-52 w-2 right-0 bottom-0 decorative-gradient-t"></span>
        <span className="absolute h-2 w-full max-w-96 right-0 bottom-0 decorative-gradient-r"></span>
        <span className="absolute h-5 w-5 right-0 bottom-0 decorative-corners-triangle -rotate-90"></span>
      </span>
    </>
  );
};

export default Bg;
