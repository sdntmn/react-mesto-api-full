class BadRequestError400 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.message = message;
  }
}
module.exports = BadRequestError400;
