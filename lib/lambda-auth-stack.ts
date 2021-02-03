import { Construct, Stack, StackProps } from '@aws-cdk/core'

export interface ILambdaAuthStackProps extends StackProps {
  readonly stage: string
  readonly lambdaCodePath: string
  readonly sentryProject: string
  readonly sentryVersion: string
}

export default class LambdaAuthStack extends Stack {
  constructor(scope: Construct, id: string, props: ILambdaAuthStackProps) {
    super(scope, id, props)

    
  }
}
