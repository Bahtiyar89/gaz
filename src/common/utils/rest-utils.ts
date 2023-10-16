const origin = "http://localhost:3000";

export const getData = (endpoint: string) =>
  fetch(`${origin}/${endpoint}`).then((r) => r.json());

export const putData = async <T>(endpoint: string, { arg }: { arg: T }) => {
  await fetch(`${origin}/${endpoint}`, {
    method: "PUT",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const postData = async <T>(endpoint: string, { arg }: { arg: T }) => {
  await fetch(`${origin}/${endpoint}`, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const patchData = async <T>(endpoint: string, { arg }: { arg: T }) => {
  await fetch(`${origin}/${endpoint}`, {
    method: "PATCH",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
