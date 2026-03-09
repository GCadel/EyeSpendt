export const InputField = ({
  fieldType,
  fieldName,
  fieldValue,
  onChange,
  fieldLabel,
  required = false,
}) => {
  const fieldTypes = ["text", "email", "password"];
  return (
    <div>
      <label
        htmlFor={fieldName}
        className={required ? "requiredField" : ""}
      >
        {fieldLabel}
      </label>
      <br />
      <input
        type={
          fieldTypes.filter((aType) => fieldType == aType) ? fieldType : "text"
        }
        value={fieldValue}
        onChange={onChange}
        required={required}
        name={fieldName}
        id={fieldName}
        autoComplete={fieldType == "email" ? "email" : "off"}
      />
    </div>
  );
};
