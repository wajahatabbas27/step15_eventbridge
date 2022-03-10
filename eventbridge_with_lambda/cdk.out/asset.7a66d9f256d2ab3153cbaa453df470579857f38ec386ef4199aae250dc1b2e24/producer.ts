import { EventBridge } from "aws-sdk";

const helper = (body: any) => {
    const eventbridge = new EventBridge();                                    //default region lega jo hai hmara
    return (
        eventbridge.putEvents({
            Entries: [
                {
                    EventBusName: "MyFirstProducerEvent",
                    Source: "custom.api",
                    DetailType: "order",
                    Detail: '{ "country": "${body.country}" }'
                },
            ],
        }).promise()
    )
}

exports.handler = async (event: any) => {

    console.log("event", event);
    const e = await helper(JSON.parse(event.body));
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/html" },
        body: `<h1>Event Published to Eventbridge</h1>${JSON.stringify(
            e,
            null,
            2
        )}`,
    }

}