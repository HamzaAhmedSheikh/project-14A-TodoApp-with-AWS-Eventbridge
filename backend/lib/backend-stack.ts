import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as events from '@aws-cdk/aws-events';
import * as eventsTargets from '@aws-cdk/aws-events-targets';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";
import { EVENT_SOURCE, requestTemplate, responseTemplate } from '../utils/appsync-request-response';

export class BackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    ///APPSYNC API gives you a graphql api with api key

    // const api = new appsync.GraphqlApi(this, "Api", {
    //   name: "project14aEventbridgeAPI",
    //   schema: appsync.Schema.fromAsset("utils/schema.gql"),
    //   authorizationConfig: {
    //     defaultAuthorization: {
    //       authorizationType: appsync.AuthorizationType.API_KEY,          
    //     },
    //   },     
    // });

    ///Defining a DynamoDB Table
    // const todoTableEvent = new dynamodb.Table(this, 'todoAppEvent', {
    //   billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    //   partitionKey: {
    //     name: 'id',
    //     type: dynamodb.AttributeType.STRING,
    //   },
    // });

    ///Attaching Datasource to api
    // const todoTable = api.addDynamoDbDataSource('todoAppTable', todoTableEvent);

    // Create Http Data source that will put our event to the eventbus
    // const httpEventTriggerDS = api.addHttpDataSource(
    //   "eventTriggerDS",
    //   "https://events." + this.region + ".amazonaws.com/", // This is the ENDPOINT for eventbridge.
    //   {
    //     name: "httpDsWithEventBridge",
    //     description: "From Appsync to Eventbridge",
    //     authorizationConfig: {
    //       signingRegion: this.region,
    //       signingServiceName: "events",
    //     },
    //   }
    // );

    // events.EventBus.grantAllPutEvents(httpEventTriggerDS);

    // Resolver
    // todoTable.createResolver({
    //   typeName: "Query",
    //   fieldName: "getTodos",
    //   requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(),
    //   responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    // });

    // const mutations = ["addTodo","deleteTodo"]
   
    // mutations.forEach((mut) => {
    //   let details = `\\\"id\\\": \\\"$ctx.args.id\\\"`;

    //   if (mut === 'addTodo') {
    //     details = `\\\"task\\\":\\\"$ctx.args.todo.task\\\", \\\"id\\\":\\\"$ctx.args.todo.id\\\"`
    //   } 

    //   httpEventTriggerDS.createResolver({
    //     typeName: "Mutation",
    //     fieldName: mut,
    //     requestMappingTemplate: appsync.MappingTemplate.fromString(requestTemplate(details, mut)),
    //     responseMappingTemplate: appsync.MappingTemplate.fromString(responseTemplate()),
    //   });
    // });

    // const dynamoHandlerLambda = new lambda.Function(this, 'Dynamo_Handler', {
    //   code: lambda.Code.fromAsset('lambda'),
    //   runtime: lambda.Runtime.NODEJS_12_X,
    //   handler: 'dynamoHandler.handler',
    //   environment: {
    //     DYNAMO_TABLE_NAME:  todoTableEvent .tableName,
    //   }     
    // });

    // Giving Table access to dynamoHandlerLambda
    // todoTableEvent .grantReadWriteData(dynamoHandlerLambda);

    // new events.Rule(this, "TodoTableRule", {
    //   targets:[new eventsTargets.LambdaFunction(dynamoHandlerLambda)],
    //   eventPattern: {
    //     source: [EVENT_SOURCE],
    //     detailType: [...mutations],
    //   },
    // });   

    /*----------------------------------------------------------*/
    // new s3.Bucket(this, 'MyFirstBucket', {
    //   versioned: true
    // }); 

    // const websiteBucket = new s3.Bucket(this, 'MyWebBucket', {
    //   publicReadAccess: true,
    //   removalPolicy: cdk.RemovalPolicy.DESTROY,   
    //   websiteIndexDocument: 'index.html',
    // });
 
    // const distribution = new cloudfront.Distribution(this, 'Distribution', {
    //   defaultBehavior: { origin: new origins.S3Origin(websiteBucket) },
    // });

    // new s3deploy.BucketDeployment(this, 'DeployWebsite', {
    //   sources: [s3deploy.Source.asset('../frontend/public')],
    //   destinationBucket: websiteBucket,      
    //   distribution: distribution,
    // });

    // new cdk.CfnOutput(this, "CloudFrontURL", {
    //   value: distribution.domainName
    // })

    // new cdk.CfnOutput(this, 'Graphql_Endpoint', {
    //   value: api.graphqlUrl
    // });
    
    // new cdk.CfnOutput(this, "GraphQLAPIKEY", {
    //   value: api.apiKey || "",
    // });

    // new cdk.CfnOutput(this, "RegionName", {
    //   value: this.region,
    // });  

  }
}
