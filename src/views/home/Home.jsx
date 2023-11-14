import React, { useState } from "react";
import { Image } from "mui-image";
import {
  createTheme,
  IconButton,
  ThemeProvider,
  Typography,
  Button,
  Paper,
  Link,
  Tooltip,
  TooltipProps,
  tooltipClasses,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  ArrowBack,
  ArrowForward,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import styled, { css } from "styled-components";
import "./Home.css";

import BadgeSocial from "../../assets/ipp_badge_social.png";
import BadgeEquity from "../../assets/ipp_badge_equity.png";
import BadgeGrowth from "../../assets/ipp_badge_growth.png";
import BadgeEnviro from "../../assets/ipp_badge_enviro.png";

import Logo from "../../assets/ipp-logo.png";
import BrownLogo from "../../assets/brownlogo.png";
import Students from "../../assets/students.jpg";
import CIT from "../../assets/CIT.jpg";
import CITwide from "../../assets/CIT_wide.jpg";
import CITcropped from "../../assets/CIT_cropped.jpg";

import Charlotte from "../../assets/Charlotte_Picture.jpg";
import Herbert from "../../assets/Herbert_Picture.jpg";
import Kendra from "../../assets/Kendra_Picture.jpg";
import William from "../../assets/Ze_Hua_Picture.jpg";
import Stephanie from "../../assets/Stephanie_Picture.jpg";
import Justin from "../../assets/Justin_Picture.jpg";
import Lauren from "../../assets/Lauren_Picture.jpg";
import Jeff from "../../assets/Jeff_Picture.jpg";
import Grant from "../../assets/Grant_Picture.jpg";
import Siming from "../../assets/Siming_Picture.jpg";

import Pdf from "../application/IPP Membership Levels.pdf";

export default function Home() {
  const StaffMembers = [
    {
      name: "Lauren Clarke",
      title: "Department Manager",
      year: "Brown Staff Member",
      fact: "Lauren Clarke is the Brown University Computer Science Department Manager",
      picture: Lauren,
    },
    {
      name: "Jeff Huang",
      title: "Advisor",
      year: "Brown Staff Member",
      fact: "Jeff Huang is the Associate Chair of Computer Science at Brown University",
      picture: Jeff,
    },
    {
      name: "Charlotte Chan Lee",
      title: "Team Lead",
      year: "2024",
      fact: "Outside of CS, i've been doing creative writing and film photography as a hobby lately",
      picture: Charlotte,
    },
    {
      name: "Kendra Lee",
      title: "Student Relations",
      year: "2024",
      fact: "Wonderful team member",
      picture: Kendra,
    },
    {
      name: "William Chen",
      title: "Outreach",
      year: "2024",
      fact: "Musician and Car Enthusiast",
      picture: William,
    },
    {
      name: "Justin Barlas",
      title: "Outreach",
      year: "2023",
      fact: "I’ve driven across the contiguous united states",
      picture: Justin,
    },
    {
      name: "Herbert Gaxiola Lopez",
      title: "Design",
      year: "2024",
      fact: "A fun fact about me is that I have played soccer my whole life",
      picture: Herbert,
    },
    {
      name: "Stephanie DaCruz",
      title: "Design",
      year: "2023",
      fact: "I do 3D modeling and animation in my spare time",
      picture: Stephanie,
    },
    {
      name: "Grant Lee",
      title: "Design",
      year: "2024",
      fact: "I'm currently building my very own SaaS startup!",
      picture: Grant,
    },
    // {
    //   name: "Siming Feng",
    //   title: "Design",
    //   year: "2025",
    //   fact: "I like to sing and I'm a big fan of musicals!",
    //   picture: Siming,
    // },
  ];

  const StaffTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));

  // TODO: Information here is not complete!
  const valueText = {
    deiT: "The overall diversity, equity, and inclusion mission of the Brown University Department of Computer Science is to create and sustain a diverse and inclusive environment in which all students, faculty, and staff can thrive. Likewise, the IPP is committed to partnering with companies and organizations that are striving to create a more diverse, equitable, and inclusive workplace and world. We seek partnerships with companies and organizations that demonstrate values of socially responsible computing – with a focus on the interplay of technology with centering marginalized communities, equity, social justice, social impact, accessibility, or power and privilege.",
    envResT:
      "In the face of today’s climate crisis, we seek partnerships with companies and organizations who exhibit environmental responsibility throughout their work and strive to create a more sustainable future through the intersection of technology, innovation, and environmental science.",
    mentorT:
      "We are passionate about connecting our students with opportunities where they will actively receive career mentorship for the duration of their work and beyond. We seek partnerships with companies and organizations with a demonstrated ability in helping our students develop industry skills, explore their career, and expand their network. At IPP, we recognize that mentorship is of particular importance for the career development of students who are historically underrepresented in our computer science community, and welcome partnerships with companies and organizations whose mentorship can increase representation, retention, and success among students that identify as underrepresented in CS (women, undocumented, first-generation college, low-income, living with a disability, and from historically underrepresented groups).",
    socImpT:
      "We are passionate about connecting our students with work that creates positive outcomes in a community – whether that is through the application of existing technology or the development of new, innovative technology.",
  };

  const valueTitles = {
    dei: "Diversity, Equity, and Inclusion",
    envRes: "Environmental Responsibility",
    mentor: "Mentorship",
    socImp: "Social Implications",
  };

  const valueIntroText1 =
    "IPP finds information about new and leading companies in the space to help you find an environment where responsibility, diversity, growth and mentorship are valued in the workplace. We also provide you with a steady stream of opportunities and information relevant to securing a job in the industry.";
  const valueIntroText2 =
    "Click through our values below to learn more about what they mean to us:";

  const [currentValueInd, setCurrentValueInd] = React.useState(-1);
  const [isCompany, setIsCompany] = useState(false);

  const theme = createTheme({
    typography: {
      h1: {
        fontFamily: "minion-pro, serif",
        fontWeight: 400,
        fontSize: "32px",
        color: "rgb(9,64,179)",
      },
      h1Mobile: {
        fontFamily: "minion-pro, serif",
        fontWeight: 400,
        fontSize: "28px",
        color: "rgb(9,64,179)",
      },
      h2: {
        fontFamily: "minion-pro, serif",
        fontWeight: 600,
        fontSize: "36px",
      },
      h3: {
        fontFamily: "minion-pro, serif",
        fontWeight: 700,
        fontSize: "24px",
      },
      h4: {
        fontFamily: "minion-pro, serif",
        fontWeight: 700,
        fontSize: "20px",
      },
      h4AlignRight: {
        fontFamily: "minion-pro, serif",
        fontWeight: 700,
        fontSize: "20px",
        textAlign: "right",
        display: "block",
        marginBottom: "10px",
      },
      h5: {
        fontFamily: "minion-pro, serif",
        fontWeight: 400,
        fontSize: "20px",
        color: "black",
      },
      h5Mobile: {
        fontFamily: "minion-pro, serif",
        fontWeight: 400,
        fontSize: "16px",
        color: "black",
      },
      splashText: {
        fontFamily: "minion-pro, serif",
        fontWeight: 400,
        fontSize: "40px",
        color: "black",
      },
      splashTextMobile: {
        fontFamily: "minion-pro, serif",
        fontWeight: 400,
        fontSize: "20px",
        color: "black",
      },
      p: {
        fontFamily: "franklin-gothic-atf",
        fontWeight: 200,
        fontSize: "16px",
      },
    },
    palette: {
      primary: {
        main: "#193AA5",
      },
      secondary: {
        main: "#FFFFFF",
      },
    },
  });

  function buildIntroScreen() {
    return (
      <div className="home_section home_splash">
        <div className="home_section_background">
          <div className="home_section_background_left">
            <BrowserView>
              <Image src={CIT} />
            </BrowserView>
            <MobileView>
              <Image src={CITcropped} style={{ maxHeight: "50vh" }} />
            </MobileView>
          </div>
          <div className="home_section_background_right">
            <div className="home_section_background_right_img">
              <Image src={CITwide} />
            </div>
            <div className="home_section_background_right_text">
              <div
                style={{
                  display: "flex",
                  marginLeft: "-20px",
                  marginBottom: "20px",
                  flexDirection: isMobile ? "column" : "row ",
                  marginTop: isMobile ? "40vh" : "0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: isMobile ? "167px" : "200px",
                  }}
                >
                  <Image
                    src={BrownLogo}
                    style={{
                      width: isMobile ? "40px" : "60px",
                      height: isMobile ? "67px" : "100px",
                    }}
                  />
                  <Image
                    src={Logo}
                    style={{
                      width: isMobile ? "67px" : "100px",
                      height: isMobile ? "67px" : isMobile ? "67px" : "100px",
                    }}
                  />
                </div>
                <div
                  style={{
                    marginLeft: "20px",
                    marginTop: "1rem",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant={isMobile ? "h1Mobile" : "h1"}>
                    Industry Partners Program
                  </Typography>
                  <Typography variant={isMobile ? "h5Mobile" : "h5"}>
                    @ Brown University's Department of Computer Science
                  </Typography>
                </div>
              </div>
              <Typography
                variant={isMobile ? "splashTextMobile" : "splashText"}
              >
                We connect corporations and non-profit organizations with
                students and faculty at Brown.
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  marginTop: "2rem",
                }}
              >
                <Link href="/#/apply">
                  <Typography variant="h5" style={{ color: "rgb(9,64,179)" }}>
                    Apply to be a partner
                  </Typography>
                </Link>
                <IconButton
                  sx={{ color: "rgb(9,64,179)" }}
                  size="small"
                  href="#"
                >
                  <ArrowForward />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function buildStudentsCompaniesBlurbScreen() {
    return (
      <div>
        <BrowserView>
          <div
            className="home_section"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignContent: "left",
                width: "250px",
                height: "380px",
              }}
            >
              <Typography variant="h3">Students</Typography>
              <Typography variant="p">
                IPP finds information about new and leading companies in the
                space to help you find an environment where responsibility,
                diversity, growth and mentorship are valued in the workplace. We
                also provide you with a steady stream of opportunities and
                information relevant to securing a job in the industry.
              </Typography>
              <Button
                variant="outlined"
                href="https://lists.cs.brown.edu/sympa/subscribe/ipp-annc"
                target="_blank"
                rel="noopener"
                style={{ borderRadius: "20px" }}
              >
                Join our List Serv
              </Button>
              <Button
                variant="outlined"
                href="/#/partners"
                style={{ borderRadius: "20px" }}
              >
                Go to Jobs and Partners
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignContent: "left",
                width: "250px",
                height: "380px",
              }}
            >
              <Typography variant="h3">Companies</Typography>
              <Typography variant="p">
                IPP is dedicated to promoting companies that contribute to their
                communities, giving startups and non-profits greater visibility
                in the hiring pool for Brown University students. Promote your
                opportunities, recruit talented students, and give information
                sessions to spread the word about your places of work.
              </Typography>
              <Button
                variant="outlined"
                href={Pdf}
                target="_blank"
                rel="noopener"
                style={{ borderRadius: "20px" }}
              >
                See Membership Benefits
              </Button>
              <Button
                variant="outlined"
                href="/#/apply"
                style={{ borderRadius: "20px" }}
              >
                Visit our Application Page
              </Button>
            </div>
            <div style={{ width: "500px" }}>
              <Image
                src={Students}
                style={{ width: "500px", height: "320px" }}
                shift="top"
              />
              <Typography variant="p" style={{ textAlign: "left" }}>
                Due to the Open Curriculum, Brown students are
                interdisciplinary, collaborative minded, and eager to engage
                with new opportunities.
              </Typography>
            </div>
          </div>
          <Paper
            elevation={0}
            style={{
              backgroundColor: "rgb(19, 43, 106)",
              padding: "40px",
              borderRadius: "0",
              marginBottom: "6rem",
            }}
          >
            <Typography
              variant="p"
              style={{ color: "white", fontSize: "20px" }}
            >
              We seek partners whose activities are aligned with the
              department's values and Brown's mission of education and research.
              Brown CS celebrates diversity and is committed to creating an
              inclusive environment for all our constituents. Membership in the
              IPP is by invitation. We welcome organizations whose business
              practices align with our expectation for equal opportunity and
              fair employment, as well as the responsible, transparent, and
              accessible use of technology.
            </Typography>
          </Paper>
        </BrowserView>

        <MobileView>
          <div className="home_section">
            <div className="home_identity_selection">
              <p>I am a...</p>
              <ToggleButtonGroup
                color="primary"
                value={isCompany ? "company" : "student"}
                exclusive
                onChange={(event, value) => {
                  setIsCompany(value === "company");
                }}
                aria-label="Identity"
              >
                <ToggleButton value="student">Student</ToggleButton>
                <ToggleButton value="company">Company</ToggleButton>
              </ToggleButtonGroup>
            </div>

            <div>
              {isCompany ? (
                <div className="home_identity_result">
                  <Typography variant="p">
                    IPP is dedicated to promoting companies that contribute to
                    their communities, giving startups and non-profits greater
                    visibility in the hiring pool for Brown University students.
                    Promote your opportunities, recruit talented students, and
                    give information sessions to spread the word about your
                    places of work.
                  </Typography>
                  <Button
                    variant="outlined"
                    href={Pdf}
                    target="_blank"
                    rel="noopener"
                    style={{ borderRadius: "20px" }}
                  >
                    See Membership Benefits
                  </Button>
                  <Button
                    variant="outlined"
                    href="/#/apply"
                    style={{ borderRadius: "20px" }}
                  >
                    Visit our Application Page
                  </Button>
                </div>
              ) : (
                <div className="home_identity_result">
                  <Typography variant="p">
                    IPP finds information about new and leading companies in the
                    space to help you find an environment where responsibility,
                    diversity, growth and mentorship are valued in the
                    workplace. We also provide you with a steady stream of
                    opportunities and information relevant to securing a job in
                    the industry.
                  </Typography>
                  <Button
                    variant="outlined"
                    href="https://lists.cs.brown.edu/sympa/subscribe/ipp-annc"
                    target="_blank"
                    rel="noopener"
                    style={{ borderRadius: "20px" }}
                  >
                    Join our List Serv
                  </Button>
                  <Button
                    variant="outlined"
                    href="/#/partners"
                    style={{ borderRadius: "20px" }}
                  >
                    Go to Jobs and Partners
                  </Button>
                </div>
              )}
            </div>

            <Paper
              elevation={0}
              style={{
                backgroundColor: "rgb(19, 43, 106)",
                padding: "30px",
                borderRadius: "0",
              }}
            >
              <Typography
                variant="p"
                style={{ color: "white", fontSize: "16px" }}
              >
                We seek partners whose activities are aligned with the
                department's values and Brown's mission of education and
                research. Brown CS celebrates diversity and is committed to
                creating an inclusive environment for all our constituents.
                Membership in the IPP is by invitation. We welcome organizations
                whose business practices align with our expectation for equal
                opportunity and fair employment, as well as the responsible,
                transparent, and accessible use of technology.
              </Typography>
            </Paper>
          </div>
        </MobileView>
      </div>
    );
  }

  function buildValuesAndStaffScreen() {
    return (
      <div>
        <BrowserView>
          <div
            className="home_section"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginBottom: "12rem",
            }}
          >
            <div>
              <Typography variant="h2">Our Staff</Typography>
              <div
                className="home_page_percentage"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignContent: "center",
                  marginBottom: "1rem",
                  width: "650px",
                  height: "600px",
                }}
              >
                {StaffMembers.map((staff, index) => (
                  <div class="home_staff_portrait_div">
                    <Tooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">{staff.name}</Typography>
                          <b>{"Class year:"}</b> {staff.year}
                          <br />
                          <b>{"Fun fact:"}</b> {staff.fact}
                        </React.Fragment>
                      }
                    >
                      <div style={{ textAlign: "center" }}>
                        <Image
                          style={{
                            padding: 0,
                            width: "100px",
                            height: "100px",
                          }}
                          src={staff.picture}
                          alt="pic"
                        />
                        <Typography
                          variant="h4"
                          className="home_staff_name"
                          style={{ marginBottom: "0" }}
                        >
                          {staff.name}
                        </Typography>
                        <Typography
                          variant="p"
                          className="home_p home_staff_text"
                          style={{ marginTop: "0" }}
                        >
                          {staff.title}
                        </Typography>
                      </div>
                    </Tooltip>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "550px",
                height: "400px",
              }}
            >
              <Typography variant="h2">Our Values</Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Typography variant="p">{valueIntroText1}</Typography>
                <Typography variant="p">{valueIntroText2}</Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "50px",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <button class="home_badge_button">
                    <img
                      class="home_badge_img"
                      src={BadgeEquity}
                      alt="equity and diversity badge"
                      onClick={() => setCurrentValueInd(0)}
                      onMouseOver={() => setCurrentValueInd(0)}
                      onMouseLeave={() => setCurrentValueInd(-1)}
                    />
                  </button>
                  <button class="home_badge_button">
                    <img
                      class="home_badge_img"
                      src={BadgeEnviro}
                      alt="environment badge"
                      onClick={() => setCurrentValueInd(1)}
                      onMouseOver={() => setCurrentValueInd(1)}
                      onMouseLeave={() => setCurrentValueInd(-1)}
                    />
                  </button>
                  <button class="home_badge_button">
                    <img
                      class="home_badge_img"
                      src={BadgeGrowth}
                      alt="mentorship and growth badge"
                      onClick={() => setCurrentValueInd(2)}
                      onMouseOver={() => setCurrentValueInd(2)}
                      onMouseLeave={() => setCurrentValueInd(-1)}
                    />
                  </button>
                  <button class="home_badge_button">
                    <img
                      class="home_badge_img"
                      src={BadgeSocial}
                      alt="social badge"
                      onClick={() => setCurrentValueInd(3)}
                      onMouseOver={() => setCurrentValueInd(3)}
                      onMouseLeave={() => setCurrentValueInd(-1)}
                    />
                  </button>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {currentValueInd === -1 ? (
                  <div></div>
                ) : (
                  <div>
                    <Typography variant="h4AlignRight">
                      {valueTitles[Object.keys(valueTitles)[currentValueInd]]}
                    </Typography>
                    <Typography variant="p">
                      {valueText[Object.keys(valueText)[currentValueInd]]}
                    </Typography>
                  </div>
                )}
              </div>
            </div>
          </div>
        </BrowserView>

        <MobileView>
          <div>
            <div className="home_section" style={{ padding: "20px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  marginBottom: "3rem",
                }}
              >
                <Typography variant="h2">Our Values</Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Typography variant="p">{valueIntroText1}</Typography>
                  <Typography variant="p">{valueIntroText2}</Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "50px",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <button class="home_badge_button">
                      <img
                        class="home_badge_img"
                        src={BadgeEquity}
                        alt="equity and diversity badge"
                        onClick={() => setCurrentValueInd(0)}
                        onMouseOver={() => setCurrentValueInd(0)}
                        onMouseLeave={() => setCurrentValueInd(-1)}
                      />
                    </button>
                    <button class="home_badge_button">
                      <img
                        class="home_badge_img"
                        src={BadgeEnviro}
                        alt="environment badge"
                        onClick={() => setCurrentValueInd(1)}
                        onMouseOver={() => setCurrentValueInd(1)}
                        onMouseLeave={() => setCurrentValueInd(-1)}
                      />
                    </button>
                    <button class="home_badge_button">
                      <img
                        class="home_badge_img"
                        src={BadgeGrowth}
                        alt="mentorship and growth badge"
                        onClick={() => setCurrentValueInd(2)}
                        onMouseOver={() => setCurrentValueInd(2)}
                        onMouseLeave={() => setCurrentValueInd(-1)}
                      />
                    </button>
                    <button class="home_badge_button">
                      <img
                        class="home_badge_img"
                        src={BadgeSocial}
                        alt="social badge"
                        onClick={() => setCurrentValueInd(3)}
                        onMouseOver={() => setCurrentValueInd(3)}
                        onMouseLeave={() => setCurrentValueInd(-1)}
                      />
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {currentValueInd === -1 ? (
                    <div></div>
                  ) : (
                    <div>
                      <Typography variant="h4AlignRight">
                        {valueTitles[Object.keys(valueTitles)[currentValueInd]]}
                      </Typography>
                      <Typography variant="p">
                        {valueText[Object.keys(valueText)[currentValueInd]]}
                      </Typography>
                    </div>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <Typography variant="h2">Our Staff</Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    height: "220px",
                    overflowX: "scroll",
                  }}
                >
                  {StaffMembers.map((staff, index) => (
                    <div class="home_staff_portrait_div">
                      <Image
                        className="home_staff_portrait"
                        style={{ padding: 0, width: "100px", height: "100px" }}
                        src={staff.picture}
                        alt="pic"
                      />
                      <Typography
                        className="home_staff_portrait"
                        variant="h4"
                        className="home_staff_name"
                        style={{ marginBottom: "0" }}
                      >
                        {staff.name}
                      </Typography>
                      <Typography
                        className="home_staff_portrait"
                        variant="p"
                        className="home_staff_text"
                        style={{ marginTop: "0" }}
                      >
                        {staff.title}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </MobileView>
      </div>
    );
  }

  return (
    <div className="homepage">
      {/* SPLASH */}
      <ThemeProvider theme={theme}>
        {buildIntroScreen()}
        {buildStudentsCompaniesBlurbScreen()}
        {buildValuesAndStaffScreen()}
      </ThemeProvider>
    </div>
  );
}
