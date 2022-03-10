"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const helper = (body) => {
    const eventbridge = new aws_sdk_1.EventBridge(); //default region lega jo hai hmara
    return (eventbridge.putEvents({
        Entries: [
            {
                EventBusName: "MyFirstProducerEvent",
                Source: "custom.api",
                DetailType: "order",
                Detail: '{ "country": "${body.country}" }'
            },
        ],
    }).promise());
};
exports.handler = async (event) => {
    console.log("event", event);
    const e = await helper(JSON.parse(event.body));
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/html" },
        body: `<h1>Event Published to Eventbridge</h1>${JSON.stringify(e, null, 2)}`,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9kdWNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUFzQztBQUV0QyxNQUFNLE1BQU0sR0FBRyxDQUFDLElBQVMsRUFBRSxFQUFFO0lBQ3pCLE1BQU0sV0FBVyxHQUFHLElBQUkscUJBQVcsRUFBRSxDQUFDLENBQW9DLGtDQUFrQztJQUM1RyxPQUFPLENBQ0gsV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUNsQixPQUFPLEVBQUU7WUFDTDtnQkFDSSxZQUFZLEVBQUUsc0JBQXNCO2dCQUNwQyxNQUFNLEVBQUUsWUFBWTtnQkFDcEIsVUFBVSxFQUFFLE9BQU87Z0JBQ25CLE1BQU0sRUFBRSxrQ0FBa0M7YUFDN0M7U0FDSjtLQUNKLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FDZixDQUFBO0FBQ0wsQ0FBQyxDQUFBO0FBRUQsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLEVBQUUsS0FBVSxFQUFFLEVBQUU7SUFFbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDNUIsTUFBTSxDQUFDLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMvQyxPQUFPO1FBQ0gsVUFBVSxFQUFFLEdBQUc7UUFDZixPQUFPLEVBQUUsRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFO1FBQ3hDLElBQUksRUFBRSwwQ0FBMEMsSUFBSSxDQUFDLFNBQVMsQ0FDMUQsQ0FBQyxFQUNELElBQUksRUFDSixDQUFDLENBQ0osRUFBRTtLQUNOLENBQUE7QUFFTCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEJyaWRnZSB9IGZyb20gXCJhd3Mtc2RrXCI7XG5cbmNvbnN0IGhlbHBlciA9IChib2R5OiBhbnkpID0+IHtcbiAgICBjb25zdCBldmVudGJyaWRnZSA9IG5ldyBFdmVudEJyaWRnZSgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVmYXVsdCByZWdpb24gbGVnYSBqbyBoYWkgaG1hcmFcbiAgICByZXR1cm4gKFxuICAgICAgICBldmVudGJyaWRnZS5wdXRFdmVudHMoe1xuICAgICAgICAgICAgRW50cmllczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRCdXNOYW1lOiBcIk15Rmlyc3RQcm9kdWNlckV2ZW50XCIsXG4gICAgICAgICAgICAgICAgICAgIFNvdXJjZTogXCJjdXN0b20uYXBpXCIsXG4gICAgICAgICAgICAgICAgICAgIERldGFpbFR5cGU6IFwib3JkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgRGV0YWlsOiAneyBcImNvdW50cnlcIjogXCIke2JvZHkuY291bnRyeX1cIiB9J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICB9KS5wcm9taXNlKClcbiAgICApXG59XG5cbmV4cG9ydHMuaGFuZGxlciA9IGFzeW5jIChldmVudDogYW55KSA9PiB7XG5cbiAgICBjb25zb2xlLmxvZyhcImV2ZW50XCIsIGV2ZW50KTtcbiAgICBjb25zdCBlID0gYXdhaXQgaGVscGVyKEpTT04ucGFyc2UoZXZlbnQuYm9keSkpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcInRleHQvaHRtbFwiIH0sXG4gICAgICAgIGJvZHk6IGA8aDE+RXZlbnQgUHVibGlzaGVkIHRvIEV2ZW50YnJpZGdlPC9oMT4ke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAgZSxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAyXG4gICAgICAgICl9YCxcbiAgICB9XG5cbn0iXX0=