class ForbiddenErr403 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.message = message;
  }
}
module.exports = ForbiddenErr403;
