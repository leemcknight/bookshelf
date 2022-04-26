### Bookshelf
## A web based book catalog

## Features
* Barcode scanning to ISBN

## Projects
### bookshelf-api
This is the backend api for the bookshelf application.  

It is a nodejs backend running deployed as AWS Lambda functions.  Deployments are managed by the Serverless framework, and the api definitions can be found in the `serverless.yml` file within that project.

### bookshelf-web
This is the web frontend.  It is a react-web application using react-bootstrap, react-redux, and react-toolkit (with RTK Query)