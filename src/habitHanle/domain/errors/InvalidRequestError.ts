class InvalidRequestError extends Error {
  public readonly details: any;
  constructor(details: any) {
    super("Invalid request data");
    this.name = "InvalidRequestError";
    this.details = details;
  }
}

export default InvalidRequestError;
