import { ServicePrincipal } from '@aws-cdk/aws-iam'
import { Function, Code, Runtime } from '@aws-cdk/aws-lambda'
import { RetentionDays } from '@aws-cdk/aws-logs'
import { StringParameter } from '@aws-cdk/aws-ssm'
import { Construct, Stack, StackProps, Duration, CfnOutput } from '@aws-cdk/core'

export interface ILambdaAuthStackProps extends StackProps {
  readonly stage: string
  readonly lambdaCodePath: string
  readonly sentryProject: string
  readonly sentryVersion: string
}

export default class LambdaAuthStack extends Stack {
  constructor(scope: Construct, id: string, props: ILambdaAuthStackProps) {
    super(scope, id, props)

    const oktaBasePath = StringParameter.valueForStringParameter(this, `/all/okta/base_path`)
    const oktaAuthServer = StringParameter.valueForStringParameter(this, `/all/okta/auth_server`)

    const paramStorePath = `/all/lambda-auth/${props.stage}`
    const env = {
      SENTRY_DSN: StringParameter.valueForStringParameter(this, `${paramStorePath}/sentry_dsn`),
      SENTRY_ENVIRONMENT: props.stage,
      SENTRY_RELEASE: `${props.sentryProject}@${props.sentryVersion}`,
      OKTA_ISSUER: `${oktaBasePath}/oauth2/${oktaAuthServer}`,
    }

    const authFunction = new Function(this, 'AuthFunction', {
      functionName: props.stackName,
      code: Code.fromAsset(props.lambdaCodePath),
      handler: 'index.handler',
      runtime: Runtime.NODEJS_12_X,
      logRetention: RetentionDays.ONE_WEEK,
      memorySize: 512,
      timeout: Duration.seconds(10),
      environment: env,
    })
    authFunction.addPermission('InvokePermission', {
      principal: new ServicePrincipal('apigateway.amazonaws.com'),
      action: 'lambda:InvokeFunction',
    })

    new CfnOutput(this, 'LambdaNameExport', {
      value: authFunction.functionName,
      exportName: `${props.stackName}:LambdaName`,
    })

    new CfnOutput(this, 'LambdaArnExport', {
      value: authFunction.functionArn,
      exportName: `${props.stackName}Arn`, // Named for backwards compatibility
    })
  }
}
