"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventbridgeWithLambdaStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const events = require("aws-cdk-lib/aws-events");
const targets = require("aws-cdk-lib/aws-events-targets");
const apigateway = require("aws-cdk-lib/aws-apigateway");
class EventbridgeWithLambdaStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
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
            targets: [new targets.LambdaFunction(consumerFn)],
            description: "Filter events that come from country PK and invoke lambda with it.",
            eventPattern: {
                source: ["custom.api"],
                detail: {
                    "country": ["PK"] //if country code matches trigger the target kambda function 
                }
            }
        });
    }
}
exports.EventbridgeWithLambdaStack = EventbridgeWithLambdaStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRicmlkZ2Vfd2l0aF9sYW1iZGEtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJldmVudGJyaWRnZV93aXRoX2xhbWJkYS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBZ0Q7QUFFaEQsaURBQWlEO0FBQ2pELGlEQUFpRDtBQUNqRCwwREFBMEQ7QUFDMUQseURBQXlEO0FBRXpELE1BQWEsMEJBQTJCLFNBQVEsbUJBQUs7SUFDbkQsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QiwyQ0FBMkM7UUFDM0MsTUFBTSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRTtZQUMvRCxZQUFZLEVBQUUsdUJBQXVCO1lBQ3JDLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUNyQyxPQUFPLEVBQUUsa0JBQWtCO1NBQzVCLENBQUMsQ0FBQztRQUVILGtGQUFrRjtRQUNsRixNQUFNLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTlDLHFGQUFxRjtRQUNyRixNQUFNLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFO1lBQ2pFLE9BQU8sRUFBRSxVQUFVO1NBQ3BCLENBQUMsQ0FBQztRQUVILDhKQUE4SjtRQUM5SixNQUFNLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFO1lBQy9ELFlBQVksRUFBRSxrQkFBa0I7WUFDaEMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ3JDLE9BQU8sRUFBRSxrQkFBa0I7U0FDNUIsQ0FBQyxDQUFDO1FBRUgsMkRBQTJEO1FBQzNELE1BQU0sS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ2xELE9BQU8sRUFBRSxDQUFDLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNqRCxXQUFXLEVBQUUsb0VBQW9FO1lBQ2pGLFlBQVksRUFBRTtnQkFDWixNQUFNLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3RCLE1BQU0sRUFBRTtvQkFDTixTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBMkMsNkRBQTZEO2lCQUMxSDthQUNGO1NBQ0YsQ0FBQyxDQUFBO0lBRUosQ0FBQztDQUNGO0FBekNELGdFQXlDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSc7XG5pbXBvcnQgKiBhcyBldmVudHMgZnJvbSAnYXdzLWNkay1saWIvYXdzLWV2ZW50cyc7XG5pbXBvcnQgKiBhcyB0YXJnZXRzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1ldmVudHMtdGFyZ2V0cyc7XG5pbXBvcnQgKiBhcyBhcGlnYXRld2F5IGZyb20gJ2F3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5JztcblxuZXhwb3J0IGNsYXNzIEV2ZW50YnJpZGdlV2l0aExhbWJkYVN0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8vbGFtYmRhIHRoYXQgd2lsbCBwcm9kdWNlIG91ciBjdXN0b20gZXZlbnRcbiAgICBjb25zdCBwcm9kdWNlckZuID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCBcInByb2R1Y2VyRnVuY3Rpb25cIiwge1xuICAgICAgZnVuY3Rpb25OYW1lOiBcIlByb2R1Y2VyRXZlbnRGdW5jdGlvblwiLFxuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEyX1gsXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoJ2xhbWJkYScpLFxuICAgICAgaGFuZGxlcjogJ3Byb2R1Y2VyLmhhbmRsZXInXG4gICAgfSk7XG5cbiAgICAvL2dpdmluZyBwZXJtaXNzaW9uIHRvIHRoZSBsYW1iZGEgcHJvZHVjZXIgZnVuY3Rpb24gdG8gcHV0IGV2ZW50cyBpbnRvIGV2ZW50IEJ1c2VzXG4gICAgZXZlbnRzLkV2ZW50QnVzLmdyYW50QWxsUHV0RXZlbnRzKHByb2R1Y2VyRm4pO1xuXG4gICAgLy9hcGkgY2FsbCBrcmxlaW5nZSBobSBldmVudCBwcm9kdWNlIGtybmUga2UgbGl5ZSBqbyBwcm9kdWNlciBmdW5jdGlvbiBrbyB0cmlnZ2VyIGtyZVxuICAgIGNvbnN0IGFwaSA9IG5ldyBhcGlnYXRld2F5LkxhbWJkYVJlc3RBcGkodGhpcywgXCJ0ZXN0QXBpZm9yQ2xpZW50XCIsIHtcbiAgICAgIGhhbmRsZXI6IHByb2R1Y2VyRm5cbiAgICB9KTtcblxuICAgIC8vdGhlIGNvbnN1bWVyIGZ1bmN0aW9uIHdoaWNoIHdpbGwgdHJpZ2dlciB3aGVuIHRoZSBwYXR0ZXJucyBtYXRjaCBpbiB0aGUgcnVsZXMgYWxsIHRoZSB3YXkgd2l0aCB0aGUgc291cmNlICwgZGV0YWlscyAgLSBpdCBkZXBlbmRzIHVwb24gdXMgd2hhdCB0aGluZyB3ZSB1c2UgXG4gICAgY29uc3QgY29uc3VtZXJGbiA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgXCJjb25zdW1lckZ1bmN0aW9uXCIsIHtcbiAgICAgIGZ1bmN0aW9uTmFtZTogXCJDb25zdW1lckZ1bmN0aW9uXCIsXG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTJfWCxcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnbGFtYmRhJyksXG4gICAgICBoYW5kbGVyOiAnY29uc3VtZXIuaGFuZGxlcidcbiAgICB9KTtcblxuICAgIC8vcnVsZXMgIHRvIG1hdGNoIGFuZCB0YXJnZXQgdGhlIGxhbWJkYWZ1bmN0aW9uIG9mIGNvbnN1bWVyXG4gICAgY29uc3QgcnVsZXMgPSBuZXcgZXZlbnRzLlJ1bGUodGhpcywgXCJSdWxlc1RvTWF0Y2hcIiwge1xuICAgICAgdGFyZ2V0czogW25ldyB0YXJnZXRzLkxhbWJkYUZ1bmN0aW9uKGNvbnN1bWVyRm4pXSwgICAgICAgICAgICAgICAgICAvL3RhcmdldHRpbmcgdGhlIGxhbWJkYSBmdW5jdGlvblxuICAgICAgZGVzY3JpcHRpb246IFwiRmlsdGVyIGV2ZW50cyB0aGF0IGNvbWUgZnJvbSBjb3VudHJ5IFBLIGFuZCBpbnZva2UgbGFtYmRhIHdpdGggaXQuXCIsXG4gICAgICBldmVudFBhdHRlcm46IHtcbiAgICAgICAgc291cmNlOiBbXCJjdXN0b20uYXBpXCJdLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgc291cmNlIG1hdGNoZXMgdHJpZ2dlciB0aGUgY29uc3VtZXIgbGFtYmRhIGZ1bmN0aW9uXG4gICAgICAgIGRldGFpbDoge1xuICAgICAgICAgIFwiY291bnRyeVwiOiBbXCJQS1wiXSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmIGNvdW50cnkgY29kZSBtYXRjaGVzIHRyaWdnZXIgdGhlIHRhcmdldCBrYW1iZGEgZnVuY3Rpb24gXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gIH1cbn1cbiJdfQ==