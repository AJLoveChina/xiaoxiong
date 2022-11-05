import { CSSProperties, useState } from "react";
import { CategoryEnum } from "../../common/common";
import { Car } from "../car/Car";
import { Food } from "../Food";
import { HomeSVG } from "../../svgs/svgs";
import { DashboardCard } from "./DashboardCard";
import "./dashboard.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Playground } from "../playground/playground";

export function Dashboard() {
  const cards = [
    {
      img: "img/dashboard/food.jpg",
      title: "美味的食物",
      cat: CategoryEnum.FOOD,
      path: "/food",
    },
    {
      img: "img/dashboard/boli.jpg",
      title: "交通工具",
      cat: CategoryEnum.CAR,
      path: "/car",
    },
  ];

  const homeBackPosCss: CSSProperties = {
    position: "fixed",
    left: "20px",
    top: "20px",
    zIndex: 999,
  };

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <div className={"dashboard"}>
            {cards.map((card) => {
              return (
                <Link to={card.path} key={card.path}>
                  <DashboardCard
                    style={{ margin: "20px" }}
                    img={card.img}
                    title={card.title}
                  />
                </Link>
              );
            })}
            {process.env.NODE_ENV === "development" && (<Link to={"/playground"}>playground</Link>)}
          </div>
        </Route>

        <Route path="/food">
          <Food />
          <Link to="/">
            <HomeSVG style={homeBackPosCss} />
          </Link>
        </Route>

        <Route path="/car">
          <Car />
          <Link to="/">
            <HomeSVG style={homeBackPosCss} />
          </Link>
        </Route>

        <Route path="/playground">
          <Playground />
          <Link to="/">
            <HomeSVG style={homeBackPosCss} />
          </Link>
        </Route>
      </Switch>
    </Router>
  );
}
