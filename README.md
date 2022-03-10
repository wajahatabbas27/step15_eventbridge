# step15_eventbridge

Modern applications are not tightly coupled , they are connected to eachother through apis in the modern stack as they are loosely coupled and they are flexible and has increased reusabilty , scalability and less interdependency and it uses the event driven architecture

- Aws event driven architecture is carried out by Event Bridge.
- In Event driven architecture , there is producer and the consumer , where there is a producer , who generates the event with some data and it is consumed by the consumer in the event driven architecture.

## Event Bridge

In the Event bridge, there is event bus from where all the producers are connected and from which every consumer is also connected , which causes in a manner so that each one has a way to connect to each one though.

The main idea is - for the events every producer is connected to a bridge and to a particular consumer as well and they can communicate in such a manner though

- In non-event architecture services are tightly coupled to each other and if one service fails the other one is automatically failed as well
- In non-event driven architecture , application is basically synchronous , as dependent on the previous service as it needs to be synced , if one fails so the other one will also have to be failed as it is connected to it.

## Event Bus

It is the critical part of any event driven system as the service is connected to this event bus , though if any service wants to access the other service so it will actually have to ask the event bus for the service to work , Bus works as the hub for the connectivity between the two or many services so as its the bridge to work in the manner , that is effective all the way.

- so in such a manner its not an issue for the services to fail
- Its a asynchronous service , which means that we have to request for something that what we wanted.
- Event bus actually receives events from different services , it stores the events and send the event to many other services as well thats the main working of the Event Bus.
- It also filter events -- it means that it only sends those events which are needed.

So this actually means that , every service is not directly connected to every service , it is connected to the bus which works as the bridge between the two services to communicate to , thats the EventBridge for the Event-Driven-Architecture. It actually has the filter which sends the event to those services who are interested and has requested and once they receive the event they start executing it.

### EventBridge in AWS

There is the event Bus , which we will going to create if we wanted to but when we created the aws account , its created by itself, and its te default bus

### Rules in AWS

We have to define the rules in aws and there in the rules the most important part is the pattern

- Pattern : we define the pattern e.g aws-lambda so it takes everything to the aws lambda and how it knows it as we define the pattern so as it knows this shit , where to send it , with the help of the patterns.
- pattern is the part which tells why we fire the event , and where we consume the event
- Target: It is the service , which will receive the event as here is the lambda function as it is in the pattern.

#### To Produce and to Consume an event - Four properties are important to create the pattern and pattern is generated on the basis of below steps mentioned:

- Event Bus
- Event source
- Detail type
- Event detail

This refers in such a manner that , when the event is triggered there are rules and by looking at the rules we will going to have the pattern and pattern takes to the target , where the event will be forwarded all the way up by the way.

- event event-bus se console pe bhj skte hain lekin source same hona chahiye hai hmare pass.
- We will tell by listening , which type we will going to have , when listening the event as mentioned above.
