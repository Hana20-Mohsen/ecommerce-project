const { expressjwt: jwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.passtoken;
  const api = process.env.API_URL;
  return jwt({
    secret,
    algorithms: ["HS256"],
    // isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/product(.*)/, methods: ["GET", "OPTIONS", "DELETE"] },
      { url: /\/api\/v1\/category(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/order(.*)/, methods: ["GET", "OPTIONS", "POST"] },
      { url: /\/api\/v1\/product(.*)/ },
      "/api/v1/user/product",
      "/api/v1/user/login",
      "/api/v1/user/register",
      "/api/v1/user/forgotpassword",
    ],
  });
}
// async function isRevoked(req, payload, done) {
//   if (!payload.isAdmin) {
//     done(null, true);
//   }
//   done();
// }
module.exports = authJwt;
