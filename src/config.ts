import configFile from './config.json';

export const config = configFile as Config;

export interface Config {
    region: string;
    cognito: {
        identityPoolId: string;
        userPoolId: string;
        userPoolWebClientId: string;
        oauthDomain: string;
    };
    apiGateway: {
        restApiId: string;
        stageName: string;
    };
}
