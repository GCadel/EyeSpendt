export const getTransactionData = async (url, token) => {
  const req = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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

export const createTransaction = async (url, token, payload) => {
  const req = await fetch(url, {
    body: JSON.stringify(payload),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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

export const updateTransaction = async (url, token, payload) => {
  const req = await fetch(url, {
    body: JSON.stringify(payload),
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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

export const deleteTransaction = async (url, token) => {
  const req = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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
