const config = {
  PORT: 3000,
  DB_URI: `mongodb://localhost/Bone-Shared-Trip`,
  SALT_ROUNDS: 10,
  SECRET: "retake",
  COOKIE_NAME: "token",
};

module.exports = config;
