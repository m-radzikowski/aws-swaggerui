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

Before deployment change the `project` and/or `service` name
in [serverless.yml](./serverless.yml) file
to have unique `baseName`, that is used as a Cognito auth domain.

Deploy:

```bash
yarn run deploy --region REGION
```

Run Swagger UI locally (for Swagger UI website development):

```bash
yarn run start
```

It will start the development server at http://localhost:8080.

The service must be deployed first to run Swagger UI locally
because the website connects to the deployed AWS services.

Remove deployed stack:

```bash
yarn run remove --region REGION
```
