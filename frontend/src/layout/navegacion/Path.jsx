const Path = ({ href, label }) => {
  return (
    <>
      <li className="w-full max-w-36">
        <a
          href={href}
          className="block w-full text-center hover:text-gray-400 transition-colors duration-300 hover:bg-black/80 p-2"
        >
          {label}
        </a>
      </li>
    </>
  );
};
export default Path;
