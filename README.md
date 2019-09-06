# lambda-watchasian

Monitors the chinese movie page on watchasian.co and notifies you if there's any additions.

# Requirements
* Node - https://nodejs.org/en/download/

# Installation
* Run `npm install`
* Zip folder contents
* Create a new lambda on [AWS](https://console.aws.amazon.com/lambda/home?region=us-east-1#/create/function) using the zip file as the function code 
  * Make sure the lambda role has permissions to use SES
* Create a Schedule rule in [CloudWatch ](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#rules:action=create) with the lambda function as the target.
* ???
* Profit