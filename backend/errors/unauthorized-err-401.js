class UnauthorizedErr401 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.message = message;
  }
}
module.exports = UnauthorizedErr401;
