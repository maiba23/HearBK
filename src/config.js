// const api = "https://api-test.breakernation.com";
const api = "https://api.breakernation.com";


export const genericHeaders = () => ({
  "Content-Type": "application/json",
  Accept: "application/json",
});

export const authHeaders = () => ({
  ...genericHeaders(),
  "x-access-token": localStorage.getItem("x-access-token"),
});

export const magicLinkHeader = token => ({
  ...genericHeaders(),
  Authorization: `Bearer ${token}`,
});

export const formDataHeader = (hasToken = true) => ({
  "Content-Type": "multipart/form-data",
  ...(hasToken && { "x-access-token": localStorage.getItem("x-access-token") }),
});

// for test
 // export const STRIPE_KEY = "pk_test_HhCQqzIxD2wH7EXferZHg18W";
// export const BRANCH_DOMAIN = "https://breakernation.test-app.link"; 

// for  PROD
export const STRIPE_KEY = "pk_live_WxDWmJ53hswHLIAYQx3Xc15B";
export const ACCESS_CODE = "BREAKERISCOMING!!!";
export const MAGICLINK_PUBLISHER_KEY = "pk_test_DAFEF4673E5E73F0";
export const BRANCH_DOMAIN = "https://breakernation.app.link"; 

// export const BRANCH_DOMAIN = "https://breakernation.test-app.link";
export default api;
