# Serverless Swagger UI for API Gateway

Example of automatically built and deployed
Swagger UI website with interactive documentation
for the API Gateway, protected with Cognito user authentication.

See the article with full description:
[Serverless Swagger UI for API Gateway](https://betterdev.blog/serverless-swagger-ui-for-api-gateway/)

## Development

Install dependencies:

```bash
yarn install
```

Change the `project` and/or `service` name
in [serverless.yml](./serverless.yml) file
to have unique `baseName`, that is used as a Cognito auth domain.

Deploy:

```bash
yarn run deploy --region REGION
```

In AWS Console, go to Cognito → Manage User Pools → newly created User Pool →
Users and groups, and create user.

Go to CloudFront, find created Distribution, copy the Domain Name
and open in a browser. Login with user credentials created in Cognito.
You will be redirected to the Swagger UI.

Run Swagger UI locally (for Swagger UI website development):

```bash
yarn run start
```

It will start the development server at http://localhost:8080.
It uses the same deployed AWS resources. To log in,
use the same user created in the Cognito.

Remove deployed stack to clean resources:

```bash
yarn run remove --region REGION
```
