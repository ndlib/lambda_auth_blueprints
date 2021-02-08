# lambda_auth_blueprints

Infrastructure-as-code for the Hesburgh Libraries [lambda_auth](https://github.com/ndlib/lambda_auth).

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `yarn build`   compile typescript to js
 * `yarn watch`   watch for changes and compile
 * `yarn test`    perform the jest unit tests
 * `cdk deploy`   deploy this stack to your default AWS account/region
 * `cdk diff`     compare deployed stack with current state
 * `cdk synth`    emits the synthesized CloudFormation template

## Deployment
```
cdk deploy lambda-auth-pipeline -c slackNotifyStackName=[stack-name]
```
Please ensure Slack notifications will go to #wse-deployment-approvals.
