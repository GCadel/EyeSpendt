export const submitFormData = async (url, payload) => {
  const req = await fetch(url, {
    body: JSON.stringify(payload),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  let res = await req.json();
  let errors = res.error;

  if (errors) {
    if (errors.msg && errors.msg == "Form Errors") {
      return { errors: [...errors.messages] };
    } else {
      return { errors: [errors] };
    }
  }
  return { data: { ...res } };
};
