import {
  AttachMoney,
  Badge,
  Grading,
  Schedule,
  Today,
  Wifi,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";

export default function HiringCard(props) {
  const { hiringInfo } = props;
  return (
    <div>
      <Card elevation={2}>
        <CardContent>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
              margin: "5px 20px 20px 0",
            }}
          >
            <Badge fontSize="large" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h3">{hiringInfo.jobTitle}</Typography>
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", color: "grey" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Today />
              <Typography variant="p">{`Deadline: ${hiringInfo.deadline}`}</Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <AttachMoney />
              <Typography variant="p">{`Compensation Range: ${hiringInfo.compensationRange}`}</Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Schedule />
              <Typography variant="p">{`Date Range: ${hiringInfo.startDate} - ${hiringInfo.endDate}`}</Typography>
            </div>
            {hiringInfo.remote && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Wifi />
                <Typography variant="p">{`Remote Friendly`}</Typography>
              </div>
            )}
            {hiringInfo.skillsQual && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Grading />
                <Typography variant="p">{`Skills: ${hiringInfo.skillsQual.join(", ")}`}</Typography>
              </div>
            )}
          </div>
          <div style={{ marginTop: "10px" }}>
            <Typography variant="h4">How to Apply</Typography>
            <Typography variant="p">{hiringInfo.howApply}</Typography>
          </div>
        </CardContent>
        <CardActions
          sx={{ justifyContent: "flex-end", padding: "0 20px 20px 0" }}
        >
          {/* <Button
            variant="contained"
            onClick={() => console.log("engage with job!")}
          >
            Engage
          </Button> */}
        </CardActions>
      </Card>
    </div>
  );
}
