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
Or 
npm install 
```

Before deployment change the `project` and/or `service` name
in [serverless.yml](./serverless.yml) file
to have unique `baseName`, that is used as a Cognito auth domain.

Deploy:

```bash
yarn run deploy --region REGION
Or 
npm run deploy --region REGION 
```

Run Swagger UI locally (for Swagger UI website development):

```bash
yarn run start
Or 
npm run start 
```

It will start the development server at http://localhost:8080.

The service must be deployed first to run Swagger UI locally
because the website connects to the deployed AWS services.

Remove deployed stack:

```bash
yarn run remove --region REGION
or
npm run remove --region REGION
```


# Serverless deployment steps

### Step 1 :
```
sls config credentials --provider aws --key 1234 --secret 5678
```
### Step 2 :
```
sls deploy
or
sls deploy --region REGION
```
### Step 3 :
```
sls remove --region REGION
```
### Step 4 : 
```
create a new user under "Manage User Pools > newly created user pull"
```
### Step 5 : 
```
Go to CloudFront click the Url it will open the website with login form 
```
### Step 6 :
```
Login with the user id and pass that you have created in step 4
```
### Step 7 :
```
After successful login it will redirect to the UI with all the API details  
```
