export const FormErrorDisplay = ({ errorList = [] }) => {
  if (errorList.length > 0)
    return (
      <div>
        <p>Please check the following:</p>
        <ul>
          {errorList.map((error, index) => (
            <li key={error.field || index}>{error.msg}</li>
          ))}
        </ul>
      </div>
    );
  else {
    return null;
  }
};
