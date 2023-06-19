import React from 'react';
import {
  Button,
  ClipboardCopyButton,
  CodeBlock,
  CodeBlockAction,
  CodeBlockCode,
  TextContent,
  TextList,
  TextListItem,
  Tabs,
  Tab,
  TabTitleText,
  Truncate,
  Title
} from '@patternfly/react-core';
import { PlayIcon } from '@patternfly/react-icons';

export const DetailsView: React.FunctionComponent<{ details: object }> = ({ details }) => {
  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);
  const [copied, setCopied] = React.useState<boolean>(false);

  const handleTabClick = (
    event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveTabKey(tabIndex);
  };

  let cliCommand;
  let shellUrl;
  let displayItems = [
    {
      Title: 'Cloud Provider',
      Data: details['provider'],
    },
    {
      Title: 'RHEL Version',
      Data: details['version'],
    },
    {
      Title: 'Release Date',
      Data: new Date(details['date']).toDateString(),
    },
    {
      Title: 'Architecture',
      Data: details['arch'],
    },
  ];
  // Conditionally configure the content of the image details view
  switch (details['provider']) {
    case 'aws':
      const instanceType: string = details['arch'] === 'x86_64' ? 't3.medium' : 't4g.medium';
      cliCommand = `aws ec2 run-instances \\
        --image-id ${details['imageId']} \\
        --count 1 \\
        --instance-type ${instanceType} \\
        --key-name <MyKeyPair> \\
        --security-group-ids <MySecurityGroupID>`;
      shellUrl = 'https://console.aws.amazon.com/cloudshell/home';
      displayItems.push(
        {
          Title: 'Region',
          Data: details['region'],
        },
        {
          Title: 'Image ID',
          Data: details['imageId'],
        }
      );
      break;

    case 'azure':
      const urnParts = details['imageId'].split(':');
      const offer = urnParts[1];
      const sku = urnParts[2];
      cliCommand = `az vm create -n <MachineName> -g <ResourceGroup> --image ${details['imageId']}`;
      shellUrl = 'https://portal.azure.com/';
      displayItems.push(
        {
          Title: 'Urn',
          Data: details['imageId'],
        },
        {
          Title: 'Offer',
          Data: offer,
        },
        {
          Title: 'Sku',
          Data: sku,
        }
      );
      break;

    case 'google':
      cliCommand = 'gcloud beta compute instances create <MachineName>' +
        '--machine-typei=e2-medium' +
        '--subnet=default' +
        `---image="${details['imageId']}"` +
        '---boot-disk-device-name=<MachineName>' +
        '---project <ProjectName>';
      shellUrl = 'https://shell.cloud.google.com/?show=terminal';
      displayItems.push({
        Title: 'Image ID',
        Data: details['imageId'],
      });
      break;

    default:
      break;
  }

  return (
    <React.Fragment>
      <Tabs
        isFilled
        activeKey={activeTabKey}
        onSelect={handleTabClick}
        isBox={true}
        aria-label="Cloud image details view"
        role="region"
      >
        <Tab eventKey={0} title={<TabTitleText>Image Details</TabTitleText>} aria-label="Show RHEL cloud image details">
          <Title headingLevel='h1'>
            {details['name']}
          </Title>
          <TextContent id="test2" className="pf-u-py-xl">
            <TextList component="dl">
              {displayItems.map((item, index) => {
                return (
                  <div key={`menu-details-${item.Title}-${index}`}>
                    <TextListItem key={`menu-title-${item.Title}-${index}`} component="dt">
                      {item.Title}
                    </TextListItem>
                    <TextListItem key={`menu-data-${item.Title}-${index}`} component="dd">
                      <Truncate
                        content={item.Data}
                        position={'start'}
                      />
                    </TextListItem>
                  </div>
                );
              })}
            </TextList>
            {details['provider'] != 'azure' && (
              <Button component="a" href={details['selflink']} target="_blank" rel="noreferrer" variant="danger">
                Launch now
              </Button>
            )}
          </TextContent>
        </Tab>
        <Tab eventKey={1} title={<TabTitleText>Launch from CLI</TabTitleText>} aria-label="Show RHEL cloud image details">
          <CodeBlock
            actions={
              <>
                <CodeBlockAction>
                  <ClipboardCopyButton
                    id="basic-copy-button"
                    textId="code-content"
                    aria-label="Copy to clipboard"
                    onClick={() => {
                      navigator.clipboard.writeText(cliCommand);
                      setCopied(true)
                    }}
                    exitDelay={600}
                    maxWidth="110px"
                    variant="plain"
                  >
                    {copied ? 'Successfully copied to clipboard!' : 'Copy to clipboard'}
                  </ClipboardCopyButton>
                </CodeBlockAction>
                <CodeBlockAction>
                  <Button
                    variant="plain"
                    aria-label="Play icon"
                    component="a"
                    href={shellUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <PlayIcon />
                  </Button>
                </CodeBlockAction>
              </>
            }
          >
            <CodeBlockCode id="code-content">
              <TextContent>{cliCommand}</TextContent>
            </CodeBlockCode>
          </CodeBlock>
        </Tab>
      </Tabs>
    </React.Fragment>
  );

}
