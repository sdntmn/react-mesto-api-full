class InternalServerError500 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}
module.exports = InternalServerError500;
