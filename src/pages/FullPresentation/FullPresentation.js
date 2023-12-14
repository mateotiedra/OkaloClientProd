import React from 'react';

import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import { HashLink as RouterLink } from 'react-router-hash-link';

import Navbar from '../../components/Navbar/Navbar';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import Footer from '../../components/Footer/Footer';
import PageButton from '../../components/PageButton/PageButton';
import SectionDivider from '../../components/SectionDivider/SectionDivider';

import {
  HiMinusCircle,
  HiPlusCircle,
  HiArrowCircleRight,
} from 'react-icons/hi';
import genevaStudentsChart from '../../assets/images/geneva-students-chart.svg';
import lausanneStudentsChart from '../../assets/images/lausanne-students-chart.svg';
import tomChart from '../../assets/images/tom-chart.svg';
import { LoadingButton } from '@mui/lab';

import FullPresentationLogic from './FullPresentationLogic';
import FormFields from '../../components/FormFields/FormFields';

export default function FullPresentation(props) {
  const { register, errors, onSubmit, pageStatus, fields } =
    FullPresentationLogic(props);

  function TableOfContents() {
    const createData = (primary, to) => {
      return { primary, to };
    };
    return (
      <SectionContainer>
        <Box sx={{ width: '100%', ml: 1 }}>
          {[
            createData('Problem', '#problem'),
            createData('Solution', '#solution'),
            createData('Business Plan', '#business'),
            createData('Market', '#market'),
            createData('Competition', '#competition'),
            createData('Traction', '#traction'),
            createData('Next Milestones', '#milestones'),
            createData('Joint the project', '#cta'),
          ].map((section, i) => (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <HiArrowCircleRight />
              <Link
                variant='body1'
                to={'/presentation/' + section.to}
                component={RouterLink}
                ml={2}
                sx={{ textDecoration: 'underline' }}
              >
                {section.primary}
              </Link>
            </Box>
          ))}
        </Box>
      </SectionContainer>
    );
  }
  function TitleSection() {
    return (
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='inherit'
          sx={{
            fontSize: {
              xs: '20vw',
              sm: '20vw',
              md: '8vw',
              lg: '8vw',
              xl: '8vw',
            },
            fontWeight: 700,
          }}
        >
          Okalo
        </Typography>
        <Box
          sx={{
            backgroundColor: 'primary.main',
            width: '100%',
            borderRadius: 10,
            position: 'relative',
            height: 7,
            right: { xs: '23vw', sm: '23vw', md: '39vw' },
            bottom: { xs: '5vw', sm: '5vw', md: '2.5vw' },
          }}
        />
        <Typography
          variant='inherit'
          sx={{
            fontSize: {
              xs: '8vw',
              sm: '8vw',
              md: '2.5vw',
            },
            fontWeight: 700,
            px: 5,
          }}
        >
          The online second-hand marketplace for students
        </Typography>
        <Box
          sx={{
            backgroundColor: 'primary.main',
            borderRadius: '10px 0 0 10px',
            position: 'relative',
            height: 7,
            alignSelf: 'flex-end',
            width: { xs: '91vw', sm: '94vw', md: '81vw' },
          }}
        />
      </Box>
    );
  }

  const AdjencedBoxSx = (maxWidth) => {
    return {
      maxWidth: {
        xs: '100%',
        sm: '100%',
        md: maxWidth,
        lg: maxWidth,
        xl: maxWidth,
      },
      alignItems: {
        xs: 'flex-start',
        sm: 'flex-start',
        md: 'center',
        lg: 'center',
        xl: 'center',
      },
    };
  };

  const subTitleSx = {
    ml: 0,
    mb: 2,
  };

  function NumberWithText({ number, children: text }) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          ...AdjencedBoxSx(300),
        }}
      >
        <Avatar
          sx={{
            bgcolor: 'primary.main',
            width: 50,
            height: 50,
            ...subTitleSx,
          }}
        >
          {number}
        </Avatar>
        <Typography variant='body1'>{text}</Typography>
      </Box>
    );
  }

  function PlusMinusListElem({ minus, children: text }) {
    return (
      <ListItem disablePadding alignItems='flex-start'>
        <ListItemIcon>
          {minus ? (
            <HiMinusCircle size={20} color={red[500]} />
          ) : (
            <HiPlusCircle size={20} color={green[500]} />
          )}
        </ListItemIcon>
        <ListItemText variant='body1' primary={text} />
      </ListItem>
    );
  }

  function ProblemSection() {
    return (
      <SectionContainer>
        <Typography variant='h2' mb={5}>
          The Problem
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: 6,
          }}
        >
          <NumberWithText number={1}>
            Students in High school and at University have to spend a lot of
            money to buy books
          </NumberWithText>
          <NumberWithText number={2}>
            At the end of the academic year, students often find themselves with
            books they no longer need and want to get rid of
          </NumberWithText>
          <NumberWithText number={3}>
            Students may be lazy and not inclined to make any effort, such as
            going to the bookshop, to grab their books
          </NumberWithText>
        </Box>
      </SectionContainer>
    );
  }

  function SolutionSection() {
    return (
      <SectionContainer>
        <Typography variant='h2' mb={5}>
          The Solution
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            gap: 6,
            flexWrap: 'wrap',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              ...AdjencedBoxSx(450),
            }}
          >
            <Typography
              variant='h3'
              sx={{ ...subTitleSx, mb: 0, color: 'primary.main' }}
            >
              V1
            </Typography>
            <Typography variant='subtitle1' sx={subTitleSx}>
              Released in 2022
            </Typography>
            <Typography variant='body1' mb={1} sx={{}}>
              An online marketplace connecting students looking to sell to those
              wanting to buy. The buyer contacts the seller, and together, they
              coordinate a meeting to exchange the book. The money is directly
              passing from a student to another without going through the
              platform.
            </Typography>
            <List sx={{ width: '100%', mt: 2 }}>
              <PlusMinusListElem>Books sell at a lower cost</PlusMinusListElem>
              <PlusMinusListElem>
                Students can sell their old books
              </PlusMinusListElem>
              <PlusMinusListElem>
                No bookstore visits needed, they can grab books directly at
                school
              </PlusMinusListElem>
              <PlusMinusListElem minus>
                It can be tedious to acquire multiple books from different
                sellers, especially if nobody offers them all bundled together
              </PlusMinusListElem>
            </List>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              ...AdjencedBoxSx(450),
            }}
          >
            <Typography
              variant='h3'
              sx={{ ...subTitleSx, mb: 0, color: 'primary.main' }}
            >
              V2
            </Typography>
            <Typography variant='subtitle1' sx={subTitleSx}>
              Upcoming
            </Typography>
            <Typography variant='body1' mb={1} sx={{}}>
              Similar to the V1, the next version will introduce a new premium
              feature: users will be able to order and pay all their books
              directly on the website. The platform will take care of contacting
              the sellers, buying the books and have them delivered directly to
              the buyers’ place. The money will be moving through the platform
              for every transaction.
            </Typography>
            <List sx={{ width: '100%', mt: 2 }}>
              <PlusMinusListElem>Books come at a lower cost</PlusMinusListElem>
              <PlusMinusListElem>
                Students can sell their old books
              </PlusMinusListElem>
              <PlusMinusListElem>
                No bookstore visits needed, they can grab books directly at
                school
              </PlusMinusListElem>
              <PlusMinusListElem>
                If the buyer wants to buy multiple books, they can order and
                receive them all at once
              </PlusMinusListElem>
            </List>
          </Box>
        </Box>
      </SectionContainer>
    );
  }

  function BusinessModelSection() {
    return (
      <SectionContainer>
        <Typography variant='h2' mb={5}>
          Business Model
        </Typography>
        <Typography>
          The business model relies heavily on a marketplace structure. In the
          upcoming V2, the website will charge a commission of 10% on every
          transaction. The commission will be deducted from the seller, a
          strategic decision that emerged from our observation in V1, where we
          identified a surplus of offers compared to demand.
        </Typography>
      </SectionContainer>
    );
  }

  function HorizontalAdjencedBox({ number, subtitle, children: text }) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          maxWidth: {
            xs: '100%',
            sm: 300,
            md: 300,
            lg: 400,
            xl: 400,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            mr: 3,
            minWidth: 100,
            alignItems: 'center',
          }}
        >
          <Typography variant='h3' sx={{ mb: 0, color: 'primary.main' }}>
            {number}
          </Typography>
          <Typography variant='subtitle1'>{subtitle}</Typography>
        </Box>
        <Typography variant='body1' mb={1} sx={{}}>
          {text}
        </Typography>
      </Box>
    );
  }

  function InfoWithFacultativeDetails({ number, title, children }) {
    const [expanded, setExpanded] = React.useState(false);
    const toggleExpand = () => {
      setExpanded(!expanded);
    };
    return (
      <Box sx={{ width: '100%', mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            flexDirection: 'row',
          }}
        >
          <Typography variant='h3' component='span'>
            {title + ' = '}
            <Typography
              variant='h3'
              sx={{ color: 'secondary.main' }}
              component='span'
            >
              {number}
            </Typography>
          </Typography>
          <Link sx={{ textDecoration: 'underline' }} onClick={toggleExpand}>
            {expanded ? 'hide details' : 'show details'}
          </Link>
        </Box>
        <Box
          sx={{
            backgroundColor: 'primary.main',
            borderRadius: '10px 0 0 10px',
            position: 'relative',
            height: 4,
            width: '100%',
            mb: expanded ? 2 : 0,
          }}
        />
        {expanded && children}
      </Box>
    );
  }

  function MarketSection() {
    return (
      <SectionContainer>
        <Typography variant='h2' mb={5}>
          The Market
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            gap: 6,
            flexWrap: 'wrap',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              ...AdjencedBoxSx(450),
            }}
          >
            <img src={genevaStudentsChart} alt='Geneva students chart' />
            <Typography variant='subtitle2' sx={{ mt: 2, textAlign: 'center' }}>
              Number of students in Geneva per category
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              ...AdjencedBoxSx(450),
            }}
          >
            <img src={lausanneStudentsChart} alt='Vaud students chart' />

            <Typography variant='subtitle2' sx={{ mt: 2, textAlign: 'center' }}>
              Number of students in Vaud per category
            </Typography>
          </Box>
        </Box>
        <SectionDivider />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            gap: 6,
            flexWrap: 'wrap',
          }}
        >
          <HorizontalAdjencedBox number={175} subtitle='CHF / year'>
            Average amount spent for books by high school students
          </HorizontalAdjencedBox>
          <HorizontalAdjencedBox number={135} subtitle='CHF / year'>
            Average amount spent for books by vocationnal training students
          </HorizontalAdjencedBox>
          <HorizontalAdjencedBox number={25} subtitle='CHF / year'>
            Average amount spent for books by apprentices
          </HorizontalAdjencedBox>
        </Box>
        <SectionDivider />
        <InfoWithFacultativeDetails number='401K' title='TAM'>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 6,
              flexDirection: {
                xs: 'column',
                sm: 'column',
                md: 'column',
                lg: 'row',
                xl: 'row',
              },
            }}
          >
            <Typography variant='body1'>
              Average university student spending varies by faculty. For
              instance, a law student in Geneva might allocate around 1000 CHF
              for books in a three-year bachelor's program, while a computer
              science student in Lausanne may have no book expenses. In addition
              to that they are not the more inclined to use the premium feature.
              It is then ignored in the TAM SAM, and SOM here.
            </Typography>
            <Box component='img' src={tomChart} sx={{ maxWidth: 600 }} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              my: 3,
              flexDirection: {
                xs: 'column',
                sm: 'column',
                md: 'row',
                lg: 'row',
                xl: 'row',
              },
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 200,
                alignItems: 'center',
              }}
            >
              <Typography variant='h4' sx={{ mb: 0, color: 'primary.main' }}>
                TAM
              </Typography>
              <Typography variant='subtitle2' textAlign='center'>
                Total Available Market
              </Typography>
            </Box>
            <Typography variant='h4'>=</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 200,
                alignItems: 'center',
              }}
            >
              <Typography variant='h4' sx={{ mb: 0, color: 'secondary.main' }}>
                6.7 mio
              </Typography>
              <Typography variant='subtitle2' textAlign='center'>
                Total spent by students to buy books in GE and VD
              </Typography>
            </Box>
            <Typography variant='h4'>x</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 200,
                alignItems: 'center',
              }}
            >
              <Typography variant='h4' sx={{ mb: 0, color: 'secondary.main' }}>
                60%
              </Typography>
              <Typography variant='subtitle2' textAlign='center'>
                The average price ratio of new book to Okalo book
              </Typography>
            </Box>
            <Typography variant='h4'>x</Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 200,
                alignItems: 'center',
              }}
            >
              <Typography variant='h4' sx={{ mb: 0, color: 'secondary.main' }}>
                10%
              </Typography>
              <Typography variant='subtitle2' textAlign='center'>
                Commission taken by Okalo on each transaction
              </Typography>
            </Box>
          </Box>
        </InfoWithFacultativeDetails>
        <InfoWithFacultativeDetails number='55.7K' title='SAM'>
          <Typography variant='body1'>
            In the pilot high school, where nearly every student was aware of
            the platform's existence thanks to "perfect marketing", 15% of them
            registered on the website. In the V1, it is only necessary to create
            an account to sell books, not to buy them.
            <br />
            We found out that apprentices, with their salaries and relatively
            low expenses, may show minimal interest in the platform. We then
            remove them to compute the SAM.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                sm: 'column',
                md: 'row',
                lg: 'row',
                xl: 'row',
              },
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '100%',
              my: 3,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 200,
                alignItems: 'center',
              }}
            >
              <Typography variant='h4' sx={{ mb: 0, color: 'primary.main' }}>
                SAM
              </Typography>
              <Typography variant='subtitle2' textAlign='center'>
                Serviceable Addressable Market
              </Typography>
            </Box>
            <Typography variant='h4'>=</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 200,
                alignItems: 'center',
              }}
            >
              <Typography variant='h4' sx={{ mb: 0, color: 'secondary.main' }}>
                371K
              </Typography>
              <Typography variant='subtitle2' textAlign='center'>
                TAM without apprentices
              </Typography>
            </Box>
            <Typography variant='h4'>x</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 200,
                alignItems: 'center',
              }}
            >
              <Typography variant='h4' sx={{ mb: 0, color: 'secondary.main' }}>
                15%
              </Typography>
              <Typography variant='subtitle2' textAlign='center'>
                Conversion rate
              </Typography>
            </Box>
          </Box>
          <Alert severity='warning'>
            The conversion rate and interest in the premium feature rate are
            expected to increase significantly as the problem 3, the primary
            reason why some students are not using the website, will be
            addressed and resolved in the V2
          </Alert>
        </InfoWithFacultativeDetails>
        <InfoWithFacultativeDetails number='18.3K' title='SOM'>
          <Typography variant='body1'>
            In other schools in Geneva, where only a small part of the students
            had heard of the platform because the marketing was not as present
            at in the pilot high school, the conversion rate droped to 5%. It
            gives an order of idea of a more realistic conversion rate.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                sm: 'column',
                md: 'row',
                lg: 'row',
                xl: 'row',
              },
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '100%',
              my: 3,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 200,
                alignItems: 'center',
              }}
            >
              <Typography variant='h4' sx={{ mb: 0, color: 'primary.main' }}>
                SOM
              </Typography>
              <Typography variant='subtitle2' textAlign='center'>
                Serviceable Obtainable Market
              </Typography>
            </Box>
            <Typography variant='h4'>=</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 200,
                alignItems: 'center',
              }}
            >
              <Typography variant='h4' sx={{ mb: 0, color: 'secondary.main' }}>
                55.7K
              </Typography>
              <Typography variant='subtitle2' textAlign='center'>
                SAM
              </Typography>
            </Box>
            <Typography variant='h4'>x</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 200,
                alignItems: 'center',
              }}
            >
              <Typography variant='h4' sx={{ mb: 0, color: 'secondary.main' }}>
                33%
              </Typography>
              <Typography variant='subtitle2' textAlign='center'>
                The realistic conversion rate over prefect conversion rate
              </Typography>
            </Box>
          </Box>
        </InfoWithFacultativeDetails>
      </SectionContainer>
    );
  }

  function CompetitionSection() {
    const createCompet = (name, example, minPlus) => {
      return { name, example, minPlus };
    };
    return (
      <SectionContainer>
        <Typography variant='h2' mb={5}>
          Competition
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: {
              xs: 'flex-start',
              sm: 'flex-start',
              md: 'space-around',
              lg: 'space-around',
              xl: 'space-around',
            },
            gap: 6,
          }}
        >
          {[
            createCompet('Physical bookstore', 'Payot, Fnac', [
              'Expensive books',
              'Not eco-friendly',
              'Cannot sell used books',
            ]),
            createCompet('Online Bookstores', 'Amazon, Decitre.fr', [
              'Not eco-friendly',
              'Cannot sell used books',
            ]),
            createCompet(
              'Classified Ad Websites',
              'Anibis, Ricardo, Leboncoin',
              [
                'Not specialized for books',
                'Not a common practice for any student',
              ]
            ),
            createCompet(
              'Resale Groups ',
              'Whatsapp Students Group, Instragram account',
              ['Not well maintained', 'Not always practical']
            ),
            createCompet('Book Fair', 'At school', ['Only once a year']),
          ].map((compet) => (
            <Box key={compet.name}>
              <Typography variant='h4'>{compet.name}</Typography>
              <Typography variant='subtitle1'>{compet.example}</Typography>
              <List sx={{ width: '100%', ml: 1 }}>
                {compet.minPlus.map((minPlus, i) => (
                  <PlusMinusListElem minus key={i}>
                    {minPlus}
                  </PlusMinusListElem>
                ))}
              </List>
            </Box>
          ))}
        </Box>
      </SectionContainer>
    );
  }

  function TractionSection() {
    return (
      <SectionContainer>
        <Typography variant='h2' mb={5}>
          Traction
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            gap: 6,
            flexWrap: 'wrap',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              ...AdjencedBoxSx(450),
            }}
          >
            <Typography
              variant='h3'
              sx={{ ...subTitleSx, mb: 0, color: 'primary.main' }}
            >
              V1 Beta
            </Typography>
            <Typography variant='subtitle1' sx={subTitleSx}>
              Released in September 2021
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                gap: 6,
              }}
            >
              {[
                { nbr: 237, text: 'Sellers' },
                { nbr: 1806, text: 'Books up for sale' },
                { nbr: 102, text: 'Books sold' },
              ].map((number) => (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant='h4'
                    sx={{ mb: 0, color: 'secondary.main' }}
                  >
                    {number.nbr}
                  </Typography>
                  <Typography variant='subtitle2' textAlign='center'>
                    {number.text}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Typography mt={2}>
              The primary marketing efforts were concentrated on the pilot high
              school, conducted in close collaboration with the school itself.
              Additional marketing initiatives were undertaken in partnership
              with other schools in Geneva, although their involvement was
              comparatively less significant.
            </Typography>
            <Alert severity='info' sx={{ mt: 2 }}>
              The V1 Beta has been completely erased, database, books and users
              included, in September 2022.
            </Alert>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              ...AdjencedBoxSx(450),
            }}
          >
            <Typography
              variant='h3'
              sx={{ ...subTitleSx, mb: 0, color: 'primary.main' }}
            >
              V1
            </Typography>
            <Typography variant='subtitle1' sx={subTitleSx}>
              Released in September 2022
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                gap: 6,
              }}
            >
              {[
                { nbr: 535, text: 'Sellers' },
                { nbr: 4639, text: 'Books up for sale' },
                { nbr: 251, text: 'Books sold' },
              ].map((number) => (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant='h4'
                    sx={{ mb: 0, color: 'secondary.main' }}
                  >
                    {number.nbr}
                  </Typography>
                  <Typography variant='subtitle2' textAlign='center'>
                    {number.text}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Typography mt={2}>
              In September 2022, the V1 was launched. Marketing efforts were
              evenly spread across all high schools in Geneva.
            </Typography>
            <Typography mt={2}>
              Not any marketing has been done since September 2022, and the
              website was even shut down in September 2023 because we thought
              not many people were using it. But once it was down, we got tons
              of messages from users asking what happened and really wanting it
              to come back.
            </Typography>
          </Box>
        </Box>
        <SectionDivider />
        <Typography variant='h3' mb={3}>
          Scalability
        </Typography>
        <Typography variant='body1'>
          As the academic year concludes, buyers transition into sellers,
          leading to a growing user base each year.
          <br />
          And fortunately, the website is hosted on two highly scalable
          platforms, allowing it to handle significant traffic simultaneously
          with ease.
          <br />
          In the V1, users conduct book exchanges in person. In the V2, the
          feature allowing users to order and receive their books at home, is
          entierly handled by the platform. It's providing the sellers with a
          prepaid label and shipping instructions.
          <br /> In any cases, Okalo maintains its scalability without
          physically handling items.
        </Typography>
      </SectionContainer>
    );
  }

  function NextMilestones() {
    return (
      <SectionContainer>
        <Typography variant='h2' mb={5}>
          Next Milestones
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: {
              xs: 'flex-start',
              sm: 'flex-start',
              md: 'space-between',
              lg: 'space-between',
              xl: 'space-between',
            },
            gap: 6,
          }}
        >
          <Box>
            <Typography variant='h4'>Next semester</Typography>
            <Typography variant='subtitle1'>February 2024</Typography>
            <Typography>
              Promote the current version of the platform to universities in
              Geneva and Vaud.
            </Typography>
          </Box>
          <Box>
            <Typography variant='h4'>Next Back-to-School period</Typography>
            <Typography variant='subtitle1'>September 2024</Typography>
            <Typography>
              Release the V2 of the platform, allowing users to order and
              receive their books at home and starting to charge a commission on
              every transaction.
              <br />
              Promote the platform to high schools in Vaud.
            </Typography>
          </Box>
          <Box>
            <Typography variant='h4'>
              Next next Back-to-School period
            </Typography>
            <Typography variant='subtitle1'>September 2025</Typography>
            <Typography>
              Promote the platform to all high school and University in
              Switzerland.
            </Typography>
          </Box>
        </Box>
      </SectionContainer>
    );
  }

  function CallToActionSection() {
    return (
      <SectionContainer>
        <Typography variant='h2' mb={5}>
          Join the project
        </Typography>
        <Typography variant='body1'>
          You're interested in the project ? You manage a startup accelerator
          and you think Okalo can have his place in it ? You want to join the
          team ? You want to know more about the project ? You want to give
          feedbacks or advice ?{' '}
          <Typography component='span' fontWeight='bold'>
            Do not hesitate to contact us!
          </Typography>
        </Typography>
        <Container maxWidth='sm' sx={{ py: 6 }}>
          <Button
            variant='contained'
            fullWidth
            sx={{ fontSize: { xs: 18, sm: 21, md: 20 }, mb: 3 }}
            href='mailto:contact@okalo.ch'
            component='a'
          >
            Contact us
          </Button>
        </Container>
        {/* <Typography variant='body1'>
          Hesitant to contribute because you think the project is still in its
          early stages? Curious about its future development? Sign up for the
          project's mailing list to stay informed and engaged!{' '}
          <Typography component='span' fontWeight='bold'>
            Sign up for the project's mailing list to stay informed and engaged!
          </Typography>
        </Typography>
        <Container maxWidth='sm' sx={{ py: 6 }}>
          <Box component='form' noValidate onSubmit={onSubmit}>
            <TextField
              id={fields[0].id}
              label={fields[0].label}
              autoComplete={fields[0].id}
              helperText={errors[fields[0].id] && errors[fields[0].id].message}
              error={errors[fields[0].id] !== undefined}
              disabled={fields[0].disabled}
              inputProps={{
                ...fields[0].inputProps,
              }}
              variant='outlined'
              required={true}
              multiline={Boolean(fields[0].rows)}
              rows={fields[0].rows}
              InputProps={{
                endAdornment: fields[0].endAdornment,
              }}
              {...register(fields[0].id, fields[0].registration)}
            />
          </Box>
          <Alert severity='info' sx={{ mt: 2 }}>
            Rest assured, no spam! You'll only receive a few emails when
            significant milestones are achieved.
          </Alert>
        </Container> */}
      </SectionContainer>
    );
  }

  return (
    <>
      <Navbar empty />
      <SectionDivider h={2} />
      <TitleSection />
      <SectionDivider h={2} />
      <TableOfContents />
      <SectionDivider id='problem' />
      <ProblemSection />
      <SectionDivider id='solution' />
      <SolutionSection />
      <SectionDivider id='business' />
      <BusinessModelSection />
      <SectionDivider id='market' />
      <MarketSection />
      <SectionDivider id='competition' />
      <CompetitionSection />
      <SectionDivider id='traction' />
      <TractionSection />
      <SectionDivider id='milestones' />
      <NextMilestones />
      <SectionDivider id='cta' />
      <CallToActionSection />
      <PageButton component='a' href='mailto:contact@okalo.ch'>
        Contact Us
      </PageButton>
      <Footer />
    </>
  );
}
