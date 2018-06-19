import axios from "axios";

const URL_SERVER =
  "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth";

export function postRequest(input) {
  const { name, email } = input;

  return axios
    .post(URL_SERVER, {
      name,
      email
    })
    .then(response => {
      if (response && response.status === 200 && response.data) {
        return { message: response.data, success: true };
      } else {
        return Promise.reject({ error: "Unexpected error" });
      }
    })
    .catch(error => {
      const response = error.response;
      const message = response && response.data && response.data.errorMessage
        ? response.data.errorMessage
        : "Unexpected error";
      return { message, success: false};
    });
}
