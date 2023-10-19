import {
  AttachMoney,
  Business,
  Work,
  WorkOff
} from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from "@mui/material";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import React from "react";

export default function PartnerCard(props) {
  const { partnerData, setSelectedCompany, selectedCompany } = props;
  const selected = selectedCompany
    ? selectedCompany.applicationId === partnerData.applicationId
    : false;

  function buildCompanyLogo() {
    return (
      <CardMedia
        component="img"
        image={partnerData.storageData[0]}
        sx={{ height: "75px", width: "75px", margin: "15px", flex: 1 }}
      />
    );
  }

  function buildCompanyInfo() {
    return (
      <CardContent sx={{ flex: 5 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ fontSize: 18 }}
            color="text.secondary"
            gutterBottom
          >
            {partnerData.name}
          </Typography>
        </div>
        <Typography variant="body2">{partnerData.locations.join(", ")}</Typography>
        <Typography variant="body2">{partnerData.size} employees</Typography>
        {/* <Typography variant="body2">{partnerData.mission}</Typography> */}
      </CardContent>
    );
  }

  function buildCompanyTags() {
    const isHiring = partnerData.current.filter((position) => position.active).length > 0;
    const isDemo = partnerData.current.filter((position) => position.demo).length > 0

    return (
      <CardContent sx={{ display: "flex", flexDirection: isBrowser ? "column" : "row", gap: "10px", flex: 1 }}>
        <Card sx={{ backgroundColor: "#E7ECFF", width: "125px" }}>
          <Tooltip title="Business type" placement="right">
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "5px",
                alignItems: "center",
                padding: "5px",
                "&:last-child": { pb: "5px" },
              }}
            >
              <AttachMoney />
              <Typography variant="body2">{partnerData.busType}</Typography>
            </CardContent>
          </Tooltip>
        </Card>
        <Card sx={{ backgroundColor: isHiring ? "#E7ECFF" : "#616675", width: "125px" }}>
          <Tooltip title="Hiring status" placement="right">
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "5px",
                alignItems: "center",
                padding: "5px",
                color: isHiring ? "black" : "white",
                "&:last-child": { pb: "5px" },
              }}
            >
              {isHiring ? <Work /> : <WorkOff />}
              <Typography variant="body2">
                {isDemo ? "Hiring Status" : isHiring ? "Hiring Now" : "Not Hiring"}
              </Typography>
            </CardContent>
          </Tooltip>
        </Card>
      </CardContent>
    );
  }

  function buildCompanyIndustries() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "start",
          alignItems: "start",
          paddingInline: "10px",
          marginTop: "-5px"
        }}
      >
        {partnerData.industry.map((industry) => (
          <div
            style={{
              backgroundColor: "#616675",
              paddingInline: "10px",
              paddingBlock: "5px",
              margin: "5px",
              color: "white",
              fontSize: "13px",
              borderRadius: "25px",
            }}
          >
            {industry}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ margin: "-1px", width: isBrowser ? "fit-content" : "100%"}}>
      <Card
        variant="outlined"
        sx={
          selected
            ? { backgroundColor: "#CAD3F3", borderRadius: 0 }
            : { borderRadius: 0 }
        }
      >
        <CardActionArea
          sx={{
            width: isBrowser ? 430 : "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "start",
          }}
          onClick={() => {
            setSelectedCompany(partnerData);
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: "-10px" }}>
            {isBrowser && buildCompanyLogo()}
            {isBrowser && buildCompanyInfo()}
            {isBrowser && buildCompanyTags()}
          </div>

          <div style={{ justifyContent: "space-between", alignItems: "start", width: "100%", marginBottom: "10px" }}>
            {isBrowser && buildCompanyIndustries()}
          </div>
          
          <MobileView>
            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <div style={{ display: "flex", flexDirection: "row", width: "100%", marginBottom: "-25px" }}>
                {buildCompanyLogo()}
                {buildCompanyInfo()}
              </div>
              <div style={{ display: "flex", flexDirection: "column", width: "100%", marginBottom: "10px" }}>
                {buildCompanyTags()}
                {buildCompanyIndustries()}
              </div>
            </div>
          </MobileView>
        </CardActionArea>
      </Card>
    </div>
  );
}
