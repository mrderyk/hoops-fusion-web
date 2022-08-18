import { Header } from 'shared-components/Header';
import { Nav, NavConfig } from 'shared-components/Nav';
import { PageWrapper, SectionHeader, SectionInnerWrapper, SectionSubheader, SectionWrapper } from './styled';

interface PageProps {
  headerContent: React.ReactNode | React.ReactNode[];
  children: React.ReactNode | React.ReactNode[];
}

const navLinks = [
  {
    text: 'LEAGUE LEADERS',
    href: '/league-leaders',
  }, {
    text: 'PLAYER DIRECTORY',
    href: '/players/a',
  }, {
    text: 'STAT CHARTER',
    href: '/stat-charter',
  }, 
];

export const Page: React.FC<PageProps> = ({ headerContent, children }) => {
  return (
    <PageWrapper>
      <Header>
        { headerContent }
      </Header>
      <Nav links={navLinks} />
      { children }
    </PageWrapper>
  );
};

interface SectionProps {
  children: React.ReactNode | React.ReactNode[];
  linkTo?: string;
  title?: string;
}

export const Section: React.FC<SectionProps> = ({ title, linkTo, children }) => {
  return (
    <SectionWrapper>
      {
        linkTo && <a id={`${linkTo}`}/>
      }
      { 
        title &&
        <SectionHeader>{ title }</SectionHeader>
      }
      <SectionInnerWrapper>
        { children }
      </SectionInnerWrapper>
    </SectionWrapper>
  );
};

interface SubSectionProps {
  title: string;
  children: React.ReactNode | React.ReactNode[];
}

export const SubSection: React.FC<SubSectionProps> = ({ title, children }) => {
  return (
    <>
      <SectionSubheader>{ title }</SectionSubheader>
      { children }
    </>
  );
};
