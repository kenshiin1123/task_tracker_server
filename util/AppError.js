class AppError extends Error {
  constructor() {
    this.status = status;
    this.message = message;
  }
}

export default AppError;
