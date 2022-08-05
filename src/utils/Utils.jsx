var auth_error = {
    "auth/account-exists-with-different-credential": "Account already exists with the email address provided.",
    "auth/admin-restricted-operation": "This operation is restricted to administrators only.",
    "auth/code-expired": "The SMS code has expired. Please re-send the verification code to try again.",
    "auth/credential-already-in-use": "This credential is already associated with a different user account.",
    "auth/email-already-in-use": "Email is already in use.",
    "auth/expired-action-code": "Verification code has expired.",
    "auth/internal-error": "An internal error has occurred.",
    "auth/invalid-credential": "The supplied auth credential is malformed or has expired.",
    "auth/invalid-email": "Email address is not valid.",
    "auth/invalid-phone-number": "Invalid Phone number",
    "auth/invalid-verification-code": "Invalid Verification Code.",
    "auth/network-request-failed": "Network error.",
    "auth/operation-not-allowed" : "This operation is not allowed.",
    "auth/popup-blocked": "Popup was blocked by the browser",
    "auth/popup-closed-by-user": "Popup closed by the user",
    "auth/too-many-requests": "We have blocked all requests from this device due to unusual activity. Try again later.",
    "auth/unverified-email": "The operation requires a verified email.",
    "auth/user-disabled": "The user account has been disabled by an administrator.",
    "auth/user-mismatch": "The supplied credentials do not correspond to the previously signed in user.",
    "auth/user-not-found": "Incorrect email id or password.",
    "auth/user-token-expired": "User credential has expired. Please sign in again.",
    "auth/invalid-verification-id": "Invalid verification id",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/web-storage-unsupported": "This browser is not supported or 3rd party cookies and data may be disabled",
    "auth/wrong-password": "Incorrect email id or password.",
  }
  
  export function errors(e) {
      if(e.code in auth_error){
        return (auth_error[e.code]);
      }
       else {
          var errorMessage = e.message.toString();
          return (errorMessage);
       }
  }
  