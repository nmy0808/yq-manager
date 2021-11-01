const env = import.meta.env.MODE || "production";

const EnvConfig = {
  development: {
    baseURL: "/api",
    mockURL: "https://www.fastmock.site/mock/70e8756abab0dce464dde39c0e304042/api",
  },
  test: {
    baseURL: "//test.nmymay.top/api",
    mockURL: "",
  },
  production: {
    baseURL: "//nmymay.top/api",
    mockURL: "",
  },
};

export default {
  env,
  mock: true,
  namespace: 'manage',
  ...EnvConfig[env],
};
