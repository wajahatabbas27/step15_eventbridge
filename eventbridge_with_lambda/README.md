# Event Bridge with Lambda

Here What we are doing that , we have 2 lambda functions

- one lambda function will produce the event
- one lambda function will consume the event

- Event will only be consumed by the lambda function only when we will receive the pattern , which are there in the rule

## lambda producer function

In this we will be producing an event and sending the event to the event bus

- It will create the event
- Put the event into event bus

and It will be listened by the consumer function

## Stack Code

- There are two lambda functions one is producer function and the other one is consumer function
- producer function will going to write in the event Bridge
- and to write as we have studied , we should have to define the policy so that the producer lambda function should have the access to write in the lambda function of the producer
- so the producer lambda function will going to fire an event and the consumer will going to listen to it through the bus , so the event should be in the event bus

## Rule

- targets : target means what will trigger , when the event will going to come , Its an array so what we will tell in it to have run the lambda function as we have mentioned that , what is the service we will going to trigger as here it is the lambda function

- pattern : there will be the pattern and the pattern is generated on the basis of source - detail - detailType

- source mein pattern ki yh btaeinge jb yh source ka lambda function call ho to yh service lambda function call hojae jese yhn pe consumer call hojae

- We are providing a range of values as there are a range of values so here what we are doing is actually giving the arrays in the pattern , target

- detail jo producer function mein bateinge hm uski bina pe hm rules mein btaeinge ke kb consumer function trigger krna hai

- rules bnate hi is liye hain hm kionke - un rules ki waja se jb match hojaein hmare pas to consumer function trigger hojae

# Conclusion

Here what we are doing is lambda functions are decoupled and are connected to each other through the eventbus not directly connected to each other.
If the rules do not match eachother so that it will not pass the producer function to the consumer function
