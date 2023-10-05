import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

 

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

 

export default function Databar() {
  return (
<Card sx={{ width: 505, height: 244 }}>
<CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: "24px"
        }}
>
<Stack spacing={2}>
<Typography variant="body2" color="text.secondary">
            Full Stack Java Developer
</Typography>
<Stack direction="row" spacing={1}>
<Typography variant="body2" color="text.secondary">
              NSEIT
</Typography>
<Divider orientation="vertical" flexItem />
<Stack direction="row" spacing={0.5} alignItems="center">
<LocationOnOutlinedIcon fontSize="small" />
<Typography variant="body2" color="text.secondary">
                Mumbai
</Typography>
</Stack>
</Stack>
<Stack direction="row" spacing={6}>
<Typography variant="body2" color="text.secondary">
              ₹3.5 - 10 LPA
</Typography>
<Typography variant="body2" color="text.secondary">
              4 - 6yrs
</Typography>
</Stack>
<Typography variant="body2" color="text.secondary">
            Posted on 24 JUL 2023
</Typography>
</Stack>
<img
          src="/assets/1.jpg"
          alt="company name"
          height="64px"
          width="64px"
        />
</CardContent>
<Stack
        direction="row"
        spacing={36}
        sx={{ marginBottom: "12px", paddingRight: "24px" }}
>
<Button>View Job</Button>
<Button>Save Job</Button>
</Stack>
</Card>
  );
}