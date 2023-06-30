import * as React from 'react';
import { PageSectionVariants, PageSection, Title, Flex, FlexItem, Gallery, GalleryItem, Split, SplitItem, Grid, GridItem } from '@patternfly/react-core';
import { Helmet } from 'react-helmet';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';
import Footer from '@app/components/Footer';
import logo from '@app/bgimages/ohc-hero.png';
import { ImageTable } from '@app/components/ImageTable';
import { ExternalLinksCard } from '@app/components/ExternalLinksCard';
import { InternalLinksCard } from '@app/components/InternalLinkCard';

const Home: React.FunctionComponent<{ title: string }> = ({ title }) => {
  useDocumentTitle(title);
  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="The Cloud Image Directory is a tool that makes finding and running
          Red Hat Enterprise Linux (RHEL) cloud images on AWS, Azure and Google Cloud
          platforms easy."
        />
        <link rel="canonical" href="https://imagedirectory.cloud/" />
      </Helmet>
      <PageSection className="hero-section">
        <Flex
          className="hero-text"
          alignItems={{
            default: 'alignItemsCenter',
          }}
        >
          <FlexItem>
            <Title headingLevel="h1" size="3xl">
              Welcome to Cloud Image Directory
            </Title>
            <Title headingLevel="h1" size="lg">
              Get the images you need to start developing your Linux on-cloud experience.
            </Title>
          </FlexItem>
          <FlexItem spacer={{ default: 'spacer2xl' }} align={{ default: 'alignRight' }}>
            <img alt={'Red Hat Enterprise Linux for the Open Hybrid Cloud'} src={logo} style={{ height: 200 }} />
          </FlexItem>
        </Flex>
      </PageSection>
      <PageSection variant={PageSectionVariants.light}>
        <Flex grow={{ default: 'grow' }}>
          <FlexItem flex={{ default: 'flex_2'}}>
            <InternalLinksCard />
          </FlexItem>
          <FlexItem>
            <ExternalLinksCard />
          </FlexItem>
        </Flex>
      </PageSection>
      <PageSection variant={PageSectionVariants.light}>
        <ImageTable />
      </PageSection>
      <Footer />
    </div>
  );
};

export { Home };
