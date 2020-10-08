import Auth from '@aws-amplify/auth';
import {config} from './config';
import APIGateway from 'aws-sdk/clients/apigateway';
import {ICredentials} from '@aws-amplify/core';
import {Spec, SwaggerUIBundle} from 'swagger-ui-dist'

export const initSwagger = async (): Promise<void> => {
    const credentials = await Auth.currentCredentials();
    const apiGateway = createAPIGatewayClient(credentials);
    const spec = await getAPIGatewaySpec(apiGateway);

    renderUI(spec);
};

const createAPIGatewayClient = (credentials: ICredentials): APIGateway => new APIGateway({
    region: config.region,
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey,
    sessionToken: credentials.sessionToken,
});

const getAPIGatewaySpec = async (apiGateway: APIGateway): Promise<Spec> => {
    const data = await apiGateway.getExport({
        restApiId: config.apiGateway.restApiId,
        stageName: config.apiGateway.stageName,
        exportType: 'oas30',
        accepts: 'application/json',
    }).promise();

    if (!data.body) {
        throw new Error('No documentation body received');
    }

    const spec = JSON.parse(data.body.toString()) as Spec;

    /** Remove leading "/" in base path that leads to incorrect URL with double "//". */
    spec.servers.forEach((server: { variables: { basePath: { default: string } } }) => {
        const basePath = server.variables.basePath.default;
        if (basePath.startsWith('/')) {
            server.variables.basePath.default = basePath.substr(1);
        }
    });

    return spec;
};

const renderUI = (spec?: Spec): void => {
    SwaggerUIBundle({
        spec: spec,
        'dom_id': '#swagger',
        deepLinking: true,
    });
};
