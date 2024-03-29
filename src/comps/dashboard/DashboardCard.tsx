import { CSSProperties } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { randomColors } from "../../common/common";

export function DashboardCard(props: {
  style?: CSSProperties;
  img: string;
  title: string;
  onClick?: () => void;
}) {
  return (
    // <div
    //   style={{
    //     width: "260px",
    //     height: "330px",
    //     border: "2px solid #eee",
    //     padding: "20px",
    //     boxShadow: "0 0 2px 2px lightblue",
    //     ...props.style,
    //   }}
    //   onClick={props.onClick}
    // >
    //   <div style={{ width: "220px", height: "220px" }}>
    //     <img src={props.img} alt="" style={{ width: "100%" }} />
    //   </div>
    //   <p style={{ width: "100%", textAlign: "center", fontSize: "22px" }}>
    //     {" "}
    //     {props.title}
    //   </p>
    // </div>

    <div style={props.style}>
      <Card
        style={{
          background: `${
            randomColors[Math.floor(Math.random() * randomColors.length)]
          }`,
        }}
      >
        <CardMedia component="img" height="140" image={props.img} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
          >
            {props.title}
          </Typography>
        </CardContent>
        {/*<CardActions>*/}
        {/*  <Button size="small">打开</Button>*/}
        {/*  /!* <Button size="small">Learn More</Button> *!/*/}
        {/*</CardActions>*/}
      </Card>
    </div>
  );
}
