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
        max={fieldType == "date" ? fieldValue : "none"}
        autoComplete={fieldType == "email" ? "email" : "off"}
      />
    </div>
  );
};
