import type { AccountDetail, LoginPayload } from "@/types";

const url = "/api";

export const authLogin = async (
  payload: LoginPayload
): Promise<AccountDetail | undefined> => {
  const fullUrl = `${url}/login`;
  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      const responseData = await response.json();
      return Promise.resolve(responseData);
    } else {
      const responseData = await response.json();
      return Promise.reject(responseData);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

export const authLogout = async (payload: {
  session_id?: string;
}): Promise<unknown> => {
  const fullUrl = `${url}/logout`;
  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const responseData = await response.json();
    if (response.ok) {
      return Promise.resolve(responseData);
    } else {
      return Promise.reject(responseData);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getDetailAccount = async (payload: {
  id: string;
}): Promise<AccountDetail | undefined> => {
  const fullUrl = `${url}/account/detail`;
  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
    return Promise.resolve(undefined);
  }
};
