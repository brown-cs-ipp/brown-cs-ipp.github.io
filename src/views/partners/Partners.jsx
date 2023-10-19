import React from "react";
import { useLoaderData } from "react-router-dom";
import {
  TextField,
  Autocomplete,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import { matchSorter } from "match-sorter";
import PartnerCard from "../../components/partner-card/PartnerCard";
import {
  ArrowBack,
  NavigateBefore,
  NavigateNext,
  People,
  Place,
  Work,
  Business,
} from "@mui/icons-material";
import HiringCard from "../../components/hiring-card/HiringCard";
import logo from "../../assets/ipp-logo.png";
import BadgeSocial from '../../assets/ipp_badge_social.png';
import BadgeEquity from '../../assets/ipp_badge_equity.png';
import BadgeGrowth from '../../assets/ipp_badge_growth.png';
import BadgeEnviro from '../../assets/ipp_badge_enviro.png';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import "./Partners.css";

export default function Partners() {
  /**
   * all partners gathered on page load from firebase -- of the form:
   * [{partner-object}, ...]
   */
  const partners = useLoaderData().sort((a, b) => {
    const aHiring = a.current.filter((position) => position.active).length > 0;
    const bHiring = b.current.filter((position) => position.active).length > 0;
    if ((aHiring & bHiring) | (!aHiring & !bHiring)) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    }
    return aHiring ? -1 : 1;
  });

  /**
   * input value for search bar
   */
  const [searchValue, setSearchValue] = React.useState(null);

  /**
   * selected company to display expanded information
   */
  const [selectedCompany, setSelectedCompany] = React.useState();
  // console.log(selectedCompany);

  const values = {
    dei: "Diversity, Equity, and Inclusion",
    envRes: "Environmental Responsibility",
    mentor: "Mentorship",
    socImp: "Social Implications",
  };
  const [currentValueInd, setCurrentValueInd] = React.useState(-1);

  /**
   * custom filter option for search bar
   * alternatively, we can use matchSorter to filter all displayed companies rather than in an autocomplete box
   * @param {string} options options provided to autocomplete
   * @param {string} input - search string
   * @returns array of options which match over name and mission statement
   */
  const filterOptions = (options, { inputValue }) => {
    return matchSorter(options, inputValue.trim(), {
      keys: ["name", "mission"],
    });
  };

  function buildPartnerSelectionPanel() {
    return (
      <div className={isBrowser ? "" : "partners-selection-panel"}>
        <Paper variant="outlined" className={isBrowser ? "partners-selection-panel" : ""}>
          {partners &&
            Object.keys(partners).map((id) => {
              const partnerData = partners[id];
              return (
                <PartnerCard
                  key={partnerData.applicationId}
                  partnerData={partnerData}
                  setSelectedCompany={setSelectedCompany}
                  selectedCompany={selectedCompany}
                />
              );
            })}
        </Paper>
      </div>
    );
  }

  function buildPartnerCardPanel() {
    return (
      <div className="partners-card-panel">
        {/* Back button only for mobile */}
        <MobileView>
          <div onClick={() => setSelectedCompany(null)} style={{ width: "100%", backgroundColor: "rgb(9,64,179)", paddingBlock: "5px", zIndex: 999 }}>
            <IconButton onClick={() => setSelectedCompany(null)} sx={{ color: "white" }}>
              <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                <ArrowBack />
                <div style={{ fontSize: "22px" }}>Back</div>
              </div>
            </IconButton>
          </div>
        </MobileView>

        {selectedCompany ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: isBrowser ? "row" : "column",
                gap: isBrowser ? "20px" : "5px",
              }}
            >
              <img
                src={selectedCompany.storageData[0]}
                alt="logo placeholder"
                style={{
                  height: isBrowser ? "200px" : "120px",
                  width: isBrowser ? "200px" : "120px"
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: isBrowser ? "20px" : "5px",
                }}
              >
                <Typography variant="h2">
                  {selectedCompany.name}
                </Typography>
                <Typography variant="p">
                  {selectedCompany.mission}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    marginTop: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Place />
                    <Typography variant="p">
                      {selectedCompany.locations.join(", ")}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <People />
                    <Typography variant="p">
                      {selectedCompany.size} employees
                    </Typography>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Business />
                    <Typography variant="p">
                      {selectedCompany.industry.join(", ")}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            <Typography sx={{ marginTop: "30px", marginBottom: "10px" }} variant="h3">
              Values
            </Typography>
            <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "50px",
                }}
              >
                {!selectedCompany["dei"] && !selectedCompany["envRes"] && !selectedCompany["mentor"] && !selectedCompany["socImp"] &&
                  <Typography variant="p">{`${selectedCompany.name} did not declare any values.`}</Typography>}

                <div style={{ display: "flex", justifyContent: "space-around" }}>
                  {selectedCompany["dei"] &&
                    <button class="home_badge_button smaller_button">
                      <img
                        class="home_badge_img"
                        src={BadgeEquity}
                        alt="equity and diversity badge"
                        onClick={() => setCurrentValueInd(0)}
                        onMouseOver={() => setCurrentValueInd(0)}
                        onMouseLeave={() => setCurrentValueInd(-1)}
                      />
                    </button>
                  }
                  {selectedCompany["envRes"] &&
                    <button class="home_badge_button smaller_button">
                      <img
                        class="home_badge_img"
                        src={BadgeEnviro}
                        alt="environment badge"
                        onClick={() => setCurrentValueInd(1)}
                        onMouseOver={() => setCurrentValueInd(1)}
                        onMouseLeave={() => setCurrentValueInd(-1)}
                      />
                    </button>
                  }
                  {selectedCompany["mentor"] &&
                    <button class="home_badge_button smaller_button">
                      <img
                        class="home_badge_img"
                        src={BadgeGrowth}
                        alt="mentorship and growth badge"
                        onClick={() => setCurrentValueInd(2)}
                        onMouseOver={() => setCurrentValueInd(2)}
                        onMouseLeave={() => setCurrentValueInd(-1)}
                      />
                    </button>
                  }
                  {selectedCompany["socImp"] &&
                    <button class="home_badge_button smaller_button">
                      <img
                        class="home_badge_img"
                        src={BadgeSocial}
                        alt="social badge"
                        onClick={() => setCurrentValueInd(3)}
                        onMouseOver={() => setCurrentValueInd(3)}
                        onMouseLeave={() => setCurrentValueInd(-1)}
                        />
                    </button>
                  }
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
                {currentValueInd === -1 ? (
                  <div></div>
                ) : (
                  <div>
                    <Typography variant="h4">
                      {values[Object.keys(values)[currentValueInd]]}
                    </Typography>
                    <Typography variant="p">
                      {selectedCompany[Object.keys(values)[currentValueInd]]
                        ?? `${selectedCompany.name} did not provide a response to this value.`}
                    </Typography>
                  </div>
                )}
            </div>
            <div style={{ margin: "20px 0" }}>
              <Typography sx={{ marginTop: "20px", marginBottom: "10px" }} variant="h3">
                Hiring
              </Typography>
              {selectedCompany.current.length == 0 &&
                <Typography variant="p">{`${selectedCompany.name} is not hiring at this time.`}</Typography>}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px"
                }}
              >
                {selectedCompany.current
                  .filter((hiringInfo) => hiringInfo.active)
                  .map((hiringInfo) => (
                    <HiringCard hiringInfo={hiringInfo} />
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ padding: "30px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography variant="h1">Our Partners</Typography>
            <Typography variant="p">
              View information about current IPP partners looking to connect with Brown students! Search by name or mission statement or click on the company profiles to view more information!
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "5px",
                marginTop: "50px"
              }}
            >
              <PartnerCard
                partnerData={{
                  name: "Company Name",
                  locations: ["Locations"],
                  size: "No. of",
                  industry: ["Industry 1", "Industry 2"],
                  busType: "Org Type",
                  storageData: [logo],
                  current: [{active: true, demo: true}],
                }}
                setSelectedCompany={() => null}
              />
            </div>
          </div>
        )}
        <br />
      </div>
    );
  }

  return (
    <div className="partners-content">
      <div>
        <Autocomplete
          style={{ width: "100%" }}
          id="partner-search"
          options={partners}
          getOptionLabel={(option) => option.name}
          filterOptions={filterOptions}
          value={searchValue}
          onChange={(e, v, _) => {
            e.preventDefault();
            setSelectedCompany(v);
            setSearchValue(v);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Search Partners" />
          )}
          sx={{ marginBottom: "30px" }}
        ></Autocomplete>
      </div>

      {/* <div style={{ backgroundColor: "#193AA5", borderRadius: "5px", padding: "10px", marginTop: "-10px", marginBottom: "20px" }}>
        <Typography style={{ fontFamily: "franklin-gothic-atf", fontWeight: 400, fontSize: isBrowser ? "16px" : "14px", color: "white"}}>
          Please note that the companies currently listed on this page are fictional and for demonstration purposes only.
        </Typography>
      </div> */}

      <BrowserView>
        <Paper variant="outlined" sx={{ height: "60vh" }}>  {/* 70vh originally, but using 60vh to make it look better for demo mode */}
          <div className="partners-panels">
            {buildPartnerSelectionPanel()}
            {buildPartnerCardPanel()}
          </div>
        </Paper>
      </BrowserView>

      <MobileView>
        <Paper variant="outlined" sx={{ height: "60vh" }}>  {/* 70vh originally, but using 60vh to make it look better for demo mode */}
          {selectedCompany ? buildPartnerCardPanel() : buildPartnerSelectionPanel()} 
        </Paper>
      </MobileView>
    </div>
  );
}
