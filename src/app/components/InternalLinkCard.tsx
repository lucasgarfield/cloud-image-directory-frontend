import React from 'react';
import {
  Bullseye, Button, Card, CardBody, CardFooter, CardHeader, CardTitle,
  Flex, FlexItem, Title
} from '@patternfly/react-core'


import redhat_logo from '@app/bgimages/redhat_clear.png'


const providerInfo = {
  name: 'redhat',
  title: 'Build your own RHEL cloud image',
  description: "With Red Hat's image builder, you can create customizable and repeatable operating system images and server images",
  text: 'Build an image ->',
  url: 'https://console.redhat.com/insights/image-builder'
}

const InternalLinksCard: React.FunctionComponent = () => {
  return (
    <Flex direction={{default: 'column'}} flex={{default: 'flex_1'}}
          justifyContent={{default: 'justifyContentSpaceBetween'}}
          alignSelf={{default: "alignSelfStretch"}}
          style={{border: '1px solid #D2D2D2', padding: '2%'}}>
      <FlexItem>
        <img
          src={redhat_logo}
          style={{
            height: '2vw',
            width: '2vw',
          }}
        />
        <br/>
        <Title headingLevel='h1'>{providerInfo.title}</Title>
        <br/>
        <p>{providerInfo.description}</p>
      </FlexItem>
      <FlexItem key={`provider_card_${providerInfo.name}`}>
        &nbsp;
      </FlexItem>
      <FlexItem>
        <Button component="a" href={providerInfo.url} target="_blank" rel="noreferrer"
                variant="link">{providerInfo.text}</Button>
      </FlexItem>
    </Flex>

  )
}

export {InternalLinksCard}
