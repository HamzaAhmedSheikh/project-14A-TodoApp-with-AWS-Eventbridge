import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as events from '@aws-cdk/aws-events';
import * as eventsTargets from '@aws-cdk/aws-events-targets';
import * as lambda from '@aws-cdk/aws-lambda';
// import { EVENT_SOURCE, requestTemplate, responseTemplate } from '../utils/appsync-request-response';

export class BackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    ///APPSYNC API gives you a graphql api with api key

    const api = new appsync.GraphqlApi(this, "Api", {
      name: "project14aEventbridgeAPI",
      schema: appsync.Schema.fromAsset("utils/schema.gql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,          
        },
      },     
    });

    ///Defining a DynamoDB Table
    const todoTableEvent = new dynamodb.Table(this, 'todoAppEvent', {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
    });

    ///Attaching Datasource to api
    const todoTable = api.addDynamoDbDataSource('todoAppTable', todoTableEvent);
    

    

    new cdk.CfnOutput(this, 'Graphql_Endpoint', {
      value: api.graphqlUrl
    });
    
    new cdk.CfnOutput(this, "GraphQLAPIKEY", {
      value: api.apiKey || "",
    });

    new cdk.CfnOutput(this, "RegionName", {
      value: this.region,
    });  

  }
}
