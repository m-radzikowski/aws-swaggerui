'use strict';

/*
 * Obtains API Gateway and Cognito parameters from deployed stack resources
 * and saves them as JSON file.
 */

const fs = require('fs');

const provider = serverless.service.provider;
const awsProvider = serverless.getProvider('aws');

const listStackResources = async (resources, nextToken) => {
    resources = resources || [];
    const response = await awsProvider.request('CloudFormation', 'listStackResources', {
        StackName: awsProvider.naming.getStackName(),
        NextToken: nextToken
    });
    resources.push(...response.StackResourceSummaries);

    if (response.NextToken) {
        return listStackResources(resources, response.NextToken);
    }

    return resources;
}

const createConfig = stackResources => ({
    region: provider.region,
    cognito: {
        identityPoolId: getPhysicalId(stackResources, 'SwaggerUIIdentityProvider'),
        userPoolId: getPhysicalId(stackResources, 'UserPool'),
        userPoolWebClientId: getPhysicalId(stackResources, 'SwaggerUIAppClient'),
        oauthDomain: `${getPhysicalId(stackResources, 'UserPoolDomain')}.auth.${provider.region}.amazoncognito.com`,
    },
    apiGateway: {
        restApiId: getPhysicalId(stackResources, 'ApiGatewayRestApi'),
        stageName: provider.stage,
    },
});

const getPhysicalId = (stackResources, logicalId) => {
    return stackResources.find(r => r.LogicalResourceId === logicalId).PhysicalResourceId || '';
};

const writeConfigFile = config => {
    fs.writeFileSync('./src/config.json', JSON.stringify(config));
};

listStackResources()
    .then(createConfig)
    .then(writeConfigFile);
