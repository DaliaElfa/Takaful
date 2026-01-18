const CLIENT_ID = "DsJFUrAADg1tZIvjHdGMgfEC40ToAEag";
const REDIRECT_URI = "https://b";
const BASE_URL = "https://apiociuat.alrajhitakaful.com";
const BASIC_AUTH = "RHNKRlVyQUFEZzF0Wkl2akhkR01nZkVDNDBUb0FFYWc6VnZXN1BteG1iWU53S0c2OQ==";

/**
 * Generic helper to handle HTTP JSON responses By Ahmed Salah
 */
async function handleJsonResponse(
  response: { ok: () => any; status: () => any; text: () => any; json: () => any },
  label: string,
) {
  if (!response.ok()) {
    throw new Error(`${label} failed: ${response.status()} - ${await response.text()}`);
  }
  const data = await response.json();
  console.log(`${label} Response:`, data);
  return data;
}
// 1) GET AuthCode
async function getAuthorizationCode(request: { get: (arg0: string) => any }) {
  const url =
    `${BASE_URL}/dcp-oauth/authorizationcode` +
    `?response_type=code` +
    `&client_id=${encodeURIComponent(CLIENT_ID)}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

  const response = await request.get(url);
  const data = await handleJsonResponse(response, "AuthCode");

  const code = data.Authorization_code;
  if (!code) {
    throw new Error(`Authorization_code missing: ${JSON.stringify(data)}`);
  }

  return code;
}

// 2) POST AccessToken
async function getAccessToken(
  request: {
    post: (
      arg0: string,
      arg1: {
        headers: {
          Authorization: string; // same as your curl
          "Content-Type": string;
          Accept: string;
        };
        data: string;
      },
    ) => any;
  },
  code: any,
) {
  const url =
    `${BASE_URL}/dcp-oauth/accesstoken` +
    `?grant_type=authorization_code` +
    `&client_id=${encodeURIComponent(CLIENT_ID)}`;

  const body = new URLSearchParams({
    code,
    grant_type: "authorization_code",
    redirect_uri: REDIRECT_URI,
  });

  const response = await request.post(url, {
    headers: {
      Authorization: `Basic ${BASIC_AUTH}`, // same as your curl
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    data: body.toString(),
  });

  const data = await handleJsonResponse(response, "AccessToken");

  const token = data.Access_token;
  if (!token) {
    throw new Error(`Access_token missing: ${JSON.stringify(data)}`);
  }

  return token;
}

// 3) GET Master OTP
async function getOtpFromApi(
  request: {
    get: (arg0: string, arg1: { headers: { Authorization: string; Accept: string } }) => any;
  },
  accessToken: any,
) {
  const url = `${BASE_URL}/v1/art/master-otp/otp`;

  const response = await request.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  const data = await handleJsonResponse(response, "OTP");

  const otp = data?.data?.otp;
  if (!otp) {
    throw new Error(`otp missing: ${JSON.stringify(data)}`);
  }

  return otp.toString();
}

// 4) Full Flow
async function fetchOtpFlow(request: any) {
  const code = await getAuthorizationCode(request);
  const token = await getAccessToken(request, code);
  const otp = await getOtpFromApi(request, token);
  return otp;
}

module.exports = {
  fetchOtpFlow,
};
