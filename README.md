# Self-hosted serverless Swagger UI for API Gateway

## Development

Install dependencies:

```bash
yarn
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

The service must be deployed first to run Swagger UI locally
because the website connects to the deployed AWS services.
