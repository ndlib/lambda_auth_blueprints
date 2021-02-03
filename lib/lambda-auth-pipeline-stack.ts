import { Construct, Stack, StackProps } from '@aws-cdk/core'

export interface ILambdaAuthPipelineStackProps extends StackProps {
  readonly gitOwner: string
  readonly gitTokenPath: string
  readonly serviceRepository: string
  readonly serviceBranch: string
  readonly blueprintsRepository: string
  readonly blueprintsBranch: string
  readonly emailReceivers: string
  readonly slackNotifyStackName?: string
  // Following props needed for build project
  readonly contact: string
  readonly owner: string
  readonly sentryTokenPath: string
  readonly sentryOrg: string
  readonly sentryProject: string
}

export default class LambdaAuthPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props: ILambdaAuthPipelineStackProps) {
    super(scope, id, props)


  }
}
