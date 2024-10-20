import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'
import { ARecord, AaaaRecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53'
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets'
import { ParameterTier, StringParameter } from 'aws-cdk-lib/aws-ssm'
import { SSTConfig } from 'sst'
import { Bucket, NextjsSite } from 'sst/constructs'

const DOMAIN_NAME = 'stylelook.app'
const JENKINS_ENV = 'jenkins'
const PROD = 'prod'
const DASHBOARD = 'dashboard'

const AWS_PROFILE = process.env.AWS_PROFILE
const AWS_REGION = process.env.AWS_REGION
const PRODUCT_NAME = process.env.PRODUCT_NAME
const SERVICE_NAME = process.env.SERVICE_NAME
const RUNTIME_ENV = process.env.RUNTIME_ENV
const BACKEND_SERVICE_NAME = process.env.BACKEND_SERVICE_NAME

console.log('AWS_PROFILE:', AWS_PROFILE)
console.log('AWS_REGION:', AWS_REGION)
console.log('PRODUCT_NAME:', PRODUCT_NAME)
console.log('SERVICE_NAME:', SERVICE_NAME)
console.log('RUNTIME_ENV:', RUNTIME_ENV)

function getSubDomainName(stage: string, subDomain?: string) {
  if (subDomain) {
    return `${subDomain}${stage != PROD ? `.${stage}` : ''}`
  } else {
    return stage != PROD ? `${stage}` : undefined
  }
}

function getDashboardDomainName(stage: string, domain: string) {
  return stage != PROD ? `${DASHBOARD}.${stage}.${domain}` : `${DASHBOARD}.${domain}`
}

export default {
  config(_input) {
    return {
      name: `${PRODUCT_NAME}-frontend-web`,
      region: AWS_REGION,
      ...(AWS_PROFILE && RUNTIME_ENV != JENKINS_ENV && { profile: AWS_PROFILE }),
    }
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const { stage } = stack
      const wildcardCertParamName = `/${PRODUCT_NAME}/${stage}/${BACKEND_SERVICE_NAME}/frontend/wildcard-cert-arn`
      const certificateArn = StringParameter.valueForStringParameter(this, wildcardCertParamName)
      const subDomainName = getSubDomainName(stage, SERVICE_NAME)
      const productDomain = subDomainName ? `${subDomainName}.${DOMAIN_NAME}` : DOMAIN_NAME
      const dashboardDomainName = getDashboardDomainName(stage, DOMAIN_NAME)
      const hostedZone = HostedZone.fromLookup(stack, `${PRODUCT_NAME}-${stage}-HostedZone`, {
        domainName: DOMAIN_NAME,
      })
      const certificate = Certificate.fromCertificateArn(stack, `${PRODUCT_NAME}-${stage}-Certificate`, certificateArn)
      const bucket = new Bucket(stack, `${PRODUCT_NAME}-${SERVICE_NAME}-frontend-${stage}`)
      const site = new NextjsSite(stack, `${PRODUCT_NAME}-${stage}-site`, {
        bind: [bucket],
        customDomain: {
          domainName: productDomain,
          alternateNames: [dashboardDomainName],
          cdk: { hostedZone, certificate },
        },
      })
      if (site.cdk?.distribution) {
        const recordProps = {
          recordName: dashboardDomainName,
          zone: hostedZone,
          target: RecordTarget.fromAlias(new CloudFrontTarget(site.cdk.distribution)),
        }
        new ARecord(stack, `AlternateARecord${stage}`, recordProps)
        new AaaaRecord(stack, `AlternateAAAARecord${stage}`, recordProps)
        new StringParameter(this, `${PRODUCT_NAME}-${SERVICE_NAME}-front-url-${stage}`, {
          parameterName: `/${PRODUCT_NAME}/${stage}/${SERVICE_NAME}/frontend/url`,
          stringValue: `https://${dashboardDomainName}`,
          tier: ParameterTier.STANDARD,
        })
        new StringParameter(this, `${PRODUCT_NAME}-${SERVICE_NAME}-module-url-${stage}`, {
          parameterName: `/${PRODUCT_NAME}/${stage}/${SERVICE_NAME}/frontend/module-url`,
          stringValue: `https://${productDomain}`,
          tier: ParameterTier.STANDARD,
        })
      }

      if (site.cdk && site.customDomainUrl) {
        new StringParameter(this, `${PRODUCT_NAME}-${SERVICE_NAME}-front-dist-${stage}`, {
          parameterName: `/${PRODUCT_NAME}/${stage}/${SERVICE_NAME}/frontend/distribution-id`,
          stringValue: site.cdk.distribution.distributionId,
          tier: ParameterTier.STANDARD,
        })
      }
      if (site.cdk?.function?.functionName) {
        site.cdk.function?.functionName &&
          new StringParameter(this, `${PRODUCT_NAME}-${SERVICE_NAME}-front-func-name-${stage}`, {
            parameterName: `/${PRODUCT_NAME}/${stage}/${SERVICE_NAME}/frontend/server-func-name`,
            stringValue: site.cdk.function?.functionName,
            tier: ParameterTier.STANDARD,
          })
      }
      stack.addOutputs({ SiteUrl: site.customDomainUrl })
      stack.addOutputs({ DashboardUrl: `https://${dashboardDomainName}` })
    })
  },
} satisfies SSTConfig
