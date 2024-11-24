const InputText = ({
  type,
  placeholder,
  value,
  onChange,
  required = false,
  children,
}) => {
  return (
    <>
      <div className="w-full max-w-sm min-w-[200px]">
        <div className="relative">
          <input
            type={type}
            className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-600 text-white text-sm border border-solid border-slate-600 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-500 shadow-sm focus:shadow"
            placeholder={`${placeholder}${required ? "*" : ""}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
          />

          {children}
        </div>
      </div>
    </>
  );
};
export default InputText;
