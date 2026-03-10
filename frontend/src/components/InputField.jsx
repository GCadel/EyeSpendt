export const InputField = ({
  fieldType,
  fieldName,
  fieldValue,
  onChange,
  fieldLabel,
  required = false,
}) => {
  const fieldTypes = ["text", "email", "password", "date"];
  return (
    <div className='flex flex-col gap-1.5 mb-4'>
      <label
        htmlFor={fieldName}
        className={`text-sm font-medium text-slate-300 ${required ? "after:content-['*'] after:ml-0.5 after:text-emerald-500" : ""}`}
      >
        {fieldLabel}
      </label>

      <input
        type={
          fieldTypes.filter((aType) => fieldType == aType) ? fieldType : "text"
        }
        value={fieldValue}
        onChange={onChange}
        required={required}
        name={fieldName}
        id={fieldName}
        max={fieldType == "date" ? fieldValue : "none"}
        autoComplete={fieldType == "email" ? "email" : "off"}
        className='w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 transition-all outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
      />
    </div>
  );
};
