class InvalidRequestError extends Error {
  public readonly details: unknown[];
  constructor(details: unknown[]) {
    super("Invalid request data");
    this.name = "InvalidRequestError";
    this.details = details;
  }
}

export default InvalidRequestError;
