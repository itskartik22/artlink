import { AuthError } from "next-auth";

/** Custom error for invalid credentials */
export class InvalidCredentialsError extends AuthError {
  static type = "InvalidCredentials";

}
/** Custom error for invalid credentials */
export class InvalidOtpError extends AuthError {
  static type = "InvalidOtp";

}
export class OtpNotFoundError extends AuthError {
  static type = "OtpNotFound";

}

/** Custom error when the user is not found */
export class OtpExpiredError extends AuthError {
  static type = "OtpExpired";

}

export class UserNotFoundError extends AuthError {
  static type = "UserNotFound";
  
}

type ErrorOptions = Error | Record<string, unknown>

/** Custom error for invalid credentials */
type ExtendedErrorType = "InvalidCredentials" | "InvalidOtp" | "OtpNotFound" | "OtpExpired" | "UserNotFound"

export class ExtendedAuthError extends AuthError {
  static type: ExtendedErrorType;
  kind?: "signIn" | "error"
  cause?: Record<string, unknown> & { err?: Error }
  constructor(
    message?: string | Error | ErrorOptions,
    errorOptions?: ErrorOptions
  ) {
    if (message instanceof Error) {
      super(undefined, {
        cause: { err: message, ...(message.cause as any), ...errorOptions },
      })
    } else if (typeof message === "string") {
      if (errorOptions instanceof Error) {
        errorOptions = { err: errorOptions, ...(errorOptions.cause as any) }
      }
      super(message, errorOptions)
    } else {
      super(undefined, message)
    }
    this.name = this.constructor.name
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/3841
    this.type = this.constructor.type ?? "AuthError"
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/3841
    this.kind = this.constructor.kind ?? "error"

    Error.captureStackTrace?.(this, this.constructor)
    const url = `https://errors.authjs.dev#${this.type.toLowerCase()}`
    this.message += `${this.message ? ". " : ""}Read more at ${url}`
  }
}