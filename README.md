# DearDiary [![Build Status](https://travis-ci.org/Russell-Loh-NUS/deardiary.svg?branch=master)](https://travis-ci.org/Russell-Loh-NUS/deardiary)

## Pre-requisites:
1.	[MongoDB](https://docs.mongodb.com/manual/installation/) installed
2.	[NodeJS](https://nodejs.org/en/download/) installed
3.	[NPM](https://www.npmjs.com/get-npm) installed
4.	[Postman](https://www.postman.com/downloads/) installed
5.	Ensure no application is running on port 3000 and 8080

## Task B1

### Instructions to start the server:
1.	Clone the repository into your local machine.
2.	Open Command Prompt/Terminal and run `mongod` to start MongoDB. Please see FAQ at the end of this document, if you are having trouble starting MongoDB.
3.	Open another Command Prompt/Terminal window and `cd` into the cloned repository.
4.	Run `npm install` to install the dependencies.
5.	Run `npm run dev` to start the NodeJS server locally.

### Making API requests
There are two ways to call the APIs which is either locally or to the deployed endpoint. The instruction for both is similar except that they differ in their respective endpoints that you will be making the calls to.

To start, launch Postman and refer to the guide below according to which endpoint you will make the API calls to.

#### Instructions for making API requests locally:
1.	Access the following API documentation on your browser:
https://documenter.getpostman.com/view/12587456/TVCfWTSV
2.	On the top right, select ‘Run in Postman’ and select ‘Postman for Mac/Windows/Linux’.
3.	Import the ‘DearDiary Localhost’ collection.
4.	Select any request* and select ‘Send’ to call the API. For the POST request, it is necessary to specify both title and body fields under the Body tab whereas for the PUT request, only either the title or body field needs to be specified. You may refer to the documentation for the description of each API call.

#### Instructions for making API requests to the deployed endpoint:
1.	Access the following API documentation on your browser: https://documenter.getpostman.com/view/12587456/TVCjySLY
2.	On the top right, select ‘Run in Postman’ and select ‘Postman for Mac/Windows/Linux’ 
3.	Import the ‘DearDiary Deployed’ collection.
4.	Select any request* and select ‘Send’ to call the API. For the POST request, it is necessary to specify both title and body fields under the Body tab whereas for the PUT request, only either the title or body field needs to be specified. You may refer to the documentation for the description of each API call.

*Note: 
For requests that requires an id, please change the id field according to the entries returned from the ‘GET diary entries’ API request. Copy the ‘¬_id’ field from the entry and update the value of the request that you are making.

For example, if you are updating a diary entry, copy the ‘_id’ field of that entry returned from the ‘GET diary entries’ API request, and replace the value of the ‘id’ field under the Params tab in the ‘PUT an updated diary entry’ API request with the copied id.

## Task B2
Testing can be done either manually(locally) or automatically using Travis which will run our tests after every push to the GitHub repository. The instructions to run these tests locally and how testing is being automated with Travis is detailed below.

### To run the tests locally:
1.	Clone the repository into your local machine.
2.	Open Command Prompt/Terminal and run `mongod` to start MongoDB. Please see FAQ at the end of this document, if you are having trouble starting MongoDB.
3.	Open another Command Prompt/Terminal window and `cd` into the cloned repository.
4.	Run `npm install` to install the dependencies.
5.	Run `npm test` to run the tests locally.

### Automate testing with Travis:
The following will detail how Travis is setup to help automate testing for the project with every push to the repository.

1.	Travis is first linked to the GitHub Repository by granting it access.
2.	A ‘.travis.yml’ file is created at the root folder containing the necessary build configuration settings for Travis such as the language and version. Also, since we are using mongoDB, in order for the tests to run, we need to specify ‘mongodb’ under ‘services’ so that Travis will setup the database for us during the build.
3.	Once the configuration file is saved, every time a push has been made to the GitHub repository, Travis will be automatically triggered to perform a build and run our tests.

## Task B3
The backend has been deployed to AWS Lambda which is a serverless service and Amazon API Gateway was used to invoke the functions whenever an API call is made. For ease of deployment, Serverless framework was integrated into the project that helps to manage the various services needed for deployment. The following will detail the deployment process and how it can be triggered manually with a single command, or automatically using Travis.

### Setting up the project for deployment:
1.	We first have to setup a new user on AWS that will grant Serverless access to our resources. To do this, we simply head to IAM on AWS and create a new user with programmatic and administrative access that will give us an access key and secret.
2.	Next, we will have to wrap our ExpressJS backend for serverless use by simply placing our `app` in app.js within the Serverless function like `serverless(app)` and export it as the handler.
3.	A `serverless.yml` file is then created containing the necessary configuration settings for Serverless to deploy our application.
4.	Additionally, we will have to install the Serverless CLI in order to perform the deployment by using NPM and running the command `npm install -g serverless`. In order for Serverless to know which AWS account to use, we have to specify the AWS access key and secret that we created earlier by running the command `serverless config credentials --provider aws --key ACCESS_KEY --secret SECRET_KEY`.
5.	Lastly, we will need to use MongoDB Atlas as our public facing database by creating a new cluster and specifying the connection string in `app.js`. Note that we use the `NODE_ENV` variable to distinguish between our local database and the MongoDB Atlas database.
6.	The application is now ready to be deployed. Open a Command Prompt/Terminal window and `cd` to the project directory and run `serverless deploy` to deploy the application.

### Automated deployment with Travis:
1.	On Travis, we specify the same AWS access and secret key which we created in the previous section which will be used for deployment with Serverless when Travis is building our application. We will name them `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` respectively under `Environment Variables`.
2.	As deployment should happen only after testing is done, the `after_success` key is used in `.travis.yml` to run our deployment script. The commands used are similar to that of deploying the application manually except that we replace the actual access and secret key with Travis environment variables.
3.	Whenever a new push is made to the repository, the application will be deployed when the build succeeds.

For making API calls to the deployed endpoint, see ‘Instructions for making API requests to the deployed endpoint’ in Task B1.
 
## Task B4
The frontend is built using the VueJS framework with Bootstrap being used for styling. The following are instructions on how to setup the frontend and additionally, instructions on how to use the application.

### Instructions to run the frontend:
1.	Clone the repository into your local machine.
2.	Start the server as instructed in ‘Task B1’ under ‘Instructions to start the server’.
3.	Open another Command Prompt/Terminal window and `cd` into the `frontend` folder in the cloned repository.
4.	Run `npm install` to install the dependencies.
5.	Run `npm run serve` to start the client.
6.	On your browser, enter the following url to access the webpage:
http://localhost:3000/

### How to use the application:
Upon entering the webpage, the diary entries are automatically retrieved from the server through a GET request. Every subsequent action will automatically refresh the entries to reflect the changes made. The following are the various instructions on how to interact with the webpage.

1.	To add a new diary entry, select ‘+ Add Entry’ on the top right and input the title and body fields. Select ‘OK’ to submit the entry. This will make a POST request to the local server creating a new entry.
2.	To edit a diary entry, select the yellow pencil icon beside an entry and edit the necessary fields. Select ‘OK’ to submit your changes. This will make a PUT request to the local server updating the entry.
3.	To delete a diary entry, select the red trash icon beside an entry. Select ‘OK’ to confirm the deletion. This will make a DELETE request to the local server which will delete the entry.

## FAQ
Q: I am getting “‘mongod’ is not recognized as an internal or external command”.

A: Please see https://stackoverflow.com/a/41507803 for a guide on how to add MongoDB to your system’s environment variable.

Q: I am getting “NonExistentPath: Data directory C:\\data\\db\\ not found” on Windows when running `mongod`.

A: Due to new installations of MongoDB not having the `data\db` folder created under the C drive, you will need to create it. Follow the following steps to create this folder:
1. Open your C drive `C:\`.
2. Create a folder with name `data` and open it.
3. Create a subfolder with name `db`.
4. You should now be able to run `mongod`.
