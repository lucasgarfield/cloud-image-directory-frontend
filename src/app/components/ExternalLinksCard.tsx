import React from 'react';
import { Title, Bullseye, Flex, FlexItem, Button, Card, CardTitle, CardBody, CardFooter, DividerVariant, Divider, Stack, StackItem } from '@patternfly/react-core';

import redhat_logo from '@app/bgimages/redhat_clear.png';
import aws_logo from '@app/bgimages/aws_clear.png';
import azure_logo from '@app/bgimages/azure_clear.png';
import google_logo from '@app/bgimages/google_clear.png';

const providerInfos = [
  {
    name: 'aws',
    text: 'Launch in AWS ->',
    url: 'https://aws.amazon.com/marketplace/pp/prodview-kv5mi3ksb2mma?sr=0-1&ref_=beagle&applicationId=AWSMPContessa',
  },
  {
    name: 'google',
    text: 'Launch in Google Cloud ->',
    url: 'https://console.cloud.google.com/marketplace/product/rhel-cloud/rhel-9?project=cockpituous',
  },
  {
    name: 'azure',
    text: 'Launch in Azure ->',
    url: 'https://azuremarketplace.microsoft.com/en-us/marketplace/apps/redhat.rhel-20190605?tab=Overview',
  },
];

const loadImage = (name) => {
  switch (name) {
    case 'aws':
      return aws_logo;
    case 'azure':
      return azure_logo;
    case 'google':
      return google_logo;
  }
};

enum Provider {
  'aws',
  'azure',
  'google'
}

type ProviderCardProps = {
    provider: Provider;
  }

const ProviderCard = ({ provider }: ProviderCardProps) => {
  return (
              <Stack>
              <StackItem>
                <img style={{ height: 200, width: 200 }} src={loadImage(provider)} />
              </StackItem>
              <StackItem>
                <Button component="a" href={'https://example.com'} target="_blank" rel="noreferrer" variant="link">
                  click here 
                </Button>
              </StackItem>
              </Stack>
            )
}

const ExternalLinksCard: React.FunctionComponent = () => {
  return (
    <Card isLarge isFlat>
      <CardTitle>Get the latest Red Hat Enterprise Linux certified image for cloud deployment</CardTitle>
      <CardBody>
      <p>Launch the latest RHEL certified cloud image through available cloud service provider marketplaces.</p>
  <Flex justifyContent={{ default: 'justifyContentCenter' }}>
    <FlexItem>
      <ProviderCard provider={Provider.aws} />
    </FlexItem>
    <Divider
      orientation={{
        default: 'vertical'
      }}
    />
    <FlexItem>
      <ProviderCard provider={Provider.google} />
    </FlexItem>
    <Divider
      orientation={{
        default: 'vertical'
      }}
    />
    <FlexItem>
      <ProviderCard provider={Provider.azure} />
    </FlexItem>
  </Flex>

      </CardBody>
    </Card>
    // <Flex
    //   direction={{ default: 'column' }}
    //   flex={{ default: 'flex_3' }}
    //   justifyContent={{ default: 'justifyContentSpaceBetween' }}
    //   style={{ border: '1px solid #D2D2D2', padding: '2%' }}
    // >
    //   <FlexItem>
    //     <img
    //       src={redhat_logo}
    //       style={{
    //         height: '2vw',
    //         width: '2vw',
    //       }}
    //     />
    //     <br />
    //     <Title headingLevel="h1">Get the latest Red Hat Enterprise Linux certified image for cloud deployment</Title>
    //     <br />
    //     <p>Launch the latest RHEL certified cloud image through available cloud service provider marketplaces.</p>
    //   </FlexItem>
    //   <Flex>
    //     {providerInfos.map(({ name, text, url }, index) => (
    //       <>
    //         <FlexItem
    //           key={`provider_card_${name}`}
    //           style={{ borderRight: index != providerInfos.length - 1 ? '1px solid #979797' : 'null' }}
    //         >
    //           <img style={{ height: 200, width: 200 }} src={loadImage(name)} />
    //           <Bullseye>
    //             <Button component="a" href={url} target="_blank" rel="noreferrer" variant="link">
    //               {text}
    //             </Button>
    //           </Bullseye>
    //         </FlexItem>
    //       </>
    //     ))}
    //   </Flex>
    // </Flex>
  );
};

export { ExternalLinksCard };
