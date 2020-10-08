import Auth, {CognitoUser} from '@aws-amplify/auth';
import Amplify, {Hub} from '@aws-amplify/core';
import {config} from './config';

/**
 * Is OAuth authentication in progress.
 * After redirection from Cognito Hosted UI to obtain user tokens
 * several requests are executed to finish OAuth Authorization code grant path.
 */
let isAuthenticating = false;

let isAuthenticationFailure = false;

/**
 * Promise that will be resolved after successful user signing in
 * or rejected after unsuccessul. If signing in is not initiated,
 * this will never be resolved.
 * As a side-effect, current auth status is updated along the process.
 */
const signedInUser: Promise<CognitoUser> = new Promise((resolve, reject) => {
    Hub.listen('auth', ({payload: {event, data}}) => {
        switch (event) {
        case 'codeFlow':
            isAuthenticating = true;
            break;
        case 'signIn':
            isAuthenticating = false;
            resolve(data);
            break;
        case 'signIn_failure':
            isAuthenticating = false;
            isAuthenticationFailure = true;
            reject();
            break;
        }
    });
});

/**
 * Configure Amplify authentication.
 * If required, this will trigger user token validation (to finish Authorization code grant path after redirect from Cognito Hosted UI)
 * or refresh (to get new access token).
 */
Amplify.configure({
    Auth: {
        // Amazon Cognito Region
        region: config.region,
        // Amazon Cognito Identity Pool ID
        identityPoolId: config.cognito.identityPoolId,
        // Amazon Cognito User Pool ID
        userPoolId: config.cognito.userPoolId,
        // Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: config.cognito.userPoolWebClientId,
        oauth: {
            // Amazon Cognito domain name
            domain: config.cognito.oauthDomain,
            scope: ['email', 'openid'],
            redirectSignIn: window.location.origin,
            redirectSignOut: window.location.origin,
            // 'code' for Authorization code grant, 'token' for Implicit grant
            responseType: 'code',
        },
    },
});

/**
 * Waits for authentication end (if necessary)
 * and resolves with logged in user or rejects if user is not logged in.
 */
export const getUser = async (): Promise<CognitoUser> => {
    if (isAuthenticating) {
        return signedInUser;
    } else {
        return Auth.currentAuthenticatedUser();
    }
};

export const getIsAuthenticationFailure = (): boolean => isAuthenticationFailure;
