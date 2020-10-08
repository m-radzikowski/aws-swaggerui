import './style.css';
import {getIsAuthenticationFailure, getUser} from './auth';
import {initSwagger} from './swagger';
import Auth from '@aws-amplify/auth';

getUser().then(user => {
    if (!user) {
        throw new Error('User not resolved');
    }

    // noinspection UnnecessaryLocalVariableJS
    const email = user.getSignInUserSession()?.getIdToken().payload.email;
    document.getElementById('username')!.innerText = email;

    document.getElementById('logout')!.addEventListener('click', () => {
        // noinspection JSIgnoredPromiseFromCall
        Auth.signOut();
    });
}).catch(() => {
    // don't redirect to login page if there was authentication failure to prevent redirection loop
    if (!getIsAuthenticationFailure()) {
        // noinspection JSIgnoredPromiseFromCall
        Auth.federatedSignIn();
    }
});

initSwagger()
    .catch(e => console.error('Swagger init error:', e));
