import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class EventbridgeWithLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //lambda that will produce our custom event
    const producerFn = new lambda.Function(this, "producerFunction", {
      functionName: "ProducerEventFunction",
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'producer.handler'
    });

    //giving permission to the lambda producer function to put events into event Buses
    events.EventBus.grantAllPutEvents(producerFn);

    //api call krleinge hm event produce krne ke liye jo producer function ko trigger kre
    const api = new apigateway.LambdaRestApi(this, "testApiforClient", {
      handler: producerFn
    });

    //the consumer function which will trigger when the patterns match in the rules all the way with the source , details  - it depends upon us what thing we use 
    const consumerFn = new lambda.Function(this, "consumerFunction", {
      functionName: "ConsumerFunction",
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'consumer.handler'
    });

    //rules  to match and target the lambdafunction of consumer
    const rules = new events.Rule(this, "RulesToMatch", {
      targets: [new targets.LambdaFunction(consumerFn)],                  //targetting the lambda function
      description: "Filter events that come from country PK and invoke lambda with it.",
      eventPattern: {
        source: ["custom.api"],                                       //if source matches trigger the consumer lambda function
        detail: {
          "country": ["PK"]                                           //if country code matches trigger the target kambda function 
        }
      }
    })

  }
}
