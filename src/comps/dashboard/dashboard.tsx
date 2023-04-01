import { CSSProperties, useEffect, useState } from "react";
import { CategoryEnum, randomColors } from "../../common/common";
import { HomeSVG, Reload } from "../../svgs/svgs";
import { DashboardCard } from "./DashboardCard";
import "./dashboard.scss";
import { Playground } from "../playground/playground";
import { Christmas } from "../chris/christmas";
import { Food } from "../Food";
import { Car } from "../car/Car";
import { loadBG } from "../../common/background";
import styles from "./dashboard.module.scss";
import { Carcartoon } from "../car/CarCartoon";

export function Dashboard() {
  const [type, setType] = useState<CategoryEnum | "playground">();
  const localStorageKey = "playgroundCatType";
  useEffect(() => {
    loadBG();
    const local = localStorage.getItem(localStorageKey);
    if (!local) {
      return;
    }
    if (Object.values(CategoryEnum).includes(local as CategoryEnum)) {
      setType(local as CategoryEnum);
    }
    if (local === "playground") {
      setType(local);
    }
  }, []);

  useEffect(() => {
    if (type) {
      localStorage.setItem(localStorageKey, type);
    } else {
      localStorage.removeItem(localStorageKey);
    }
  }, [type]);

  const cards = [
    {
      img: "img/dashboard/car-cartoon.jpg",
      title: "交通工具",
      cat: CategoryEnum.CAR_CARTOON,
    },
    {
      img: "img/dashboard/food.jpg",
      title: "美味的食物",
      cat: CategoryEnum.FOOD,
    },
    {
      img: "img/dashboard/boli.jpg",
      title: "交通工具",
      cat: CategoryEnum.CAR,
    },
    {
      img: "img/dashboard/jiangbinren.png",
      title: "圣诞节",
      cat: CategoryEnum.CHRISTMAS,
    },
  ];

  const homeBackPosCss: CSSProperties = {
    position: "fixed",
    left: "20px",
    top: "20px",
    zIndex: 999,
  };

  const reloadposCss: CSSProperties = {
    position: "fixed",
    right: "20px",
    top: "20px",
    zoom: 2,
    color: "red",
    fill: "red",
    zIndex: 999,
  };

  return (
    <>
      {type === undefined && (
        <div className={styles.dashboard}>
          {cards.map((card) => {
            return (
              <div className={styles.boxParent} key={card.cat}>
                <div className={styles.box} onClick={() => setType(card.cat)}>
                  <div className={styles.boxInside}>
                    <div className={styles.boxInsideContent}>
                      <img style={{ width: "100%" }} src={card.img} />
                      {/*<DashboardCard img={card.img} title={card.title} />*/}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {process.env.NODE_ENV === "development" && (
            <div onClick={() => setType("playground")}>playground</div>
          )}
        </div>
      )}
      {type === CategoryEnum.FOOD && (
        <div>
          <Food />
          <div onClick={() => setType(undefined)}>
            <HomeSVG style={homeBackPosCss} />
          </div>
          <Reload onClick={() => location.reload()} style={reloadposCss} />
        </div>
      )}
      {type === CategoryEnum.CAR && (
        <div>
          <Car />
          <div onClick={() => setType(undefined)}>
            <HomeSVG style={homeBackPosCss} />
          </div>
          <Reload onClick={() => location.reload()} style={reloadposCss} />
        </div>
      )}
      {type === CategoryEnum.CHRISTMAS && (
        <div>
          <Christmas />
          <div onClick={() => setType(undefined)}>
            <HomeSVG style={homeBackPosCss} />
          </div>
          <Reload onClick={() => location.reload()} style={reloadposCss} />
        </div>
      )}
      {type === CategoryEnum.CAR_CARTOON && (
        <div>
          <Carcartoon />
          <div onClick={() => setType(undefined)}>
            <HomeSVG style={homeBackPosCss} />
          </div>
          <Reload onClick={() => location.reload()} style={reloadposCss} />
        </div>
      )}
      {type === "playground" && (
        <div>
          <Playground />
          <div onClick={() => setType(undefined)}>
            <HomeSVG style={homeBackPosCss} />
          </div>
        </div>
      )}
      {/*<Router>*/}
      {/*<Switch>*/}
      {/*  <Route path="/" exact>*/}
      {/*    <div className={"dashboard"}>*/}
      {/*      {cards.map((card) => {*/}
      {/*        return (*/}
      {/*          <Link to={card.path} key={card.path}>*/}
      {/*            <DashboardCard*/}
      {/*              style={{ margin: "20px" }}*/}
      {/*              img={card.img}*/}
      {/*              title={card.title}*/}
      {/*            />*/}
      {/*          </Link>*/}
      {/*        );*/}
      {/*      })}*/}
      {/*      {process.env.NODE_ENV === "development" && (*/}
      {/*        <Link to={"/playground"}>playground</Link>*/}
      {/*      )}*/}
      {/*    </div>*/}
      {/*  </Route>*/}
      {/*  <Route path="/food">*/}
      {/*    <Food />*/}
      {/*    <Link to="/">*/}
      {/*      <HomeSVG style={homeBackPosCss} />*/}
      {/*    </Link>*/}
      {/*    <Reload onClick={() => location.reload()} style={reloadposCss} />*/}
      {/*  </Route>*/}
      {/*  <Route path="/car">*/}
      {/*    <Car />*/}
      {/*    <Link to="/">*/}
      {/*      <HomeSVG style={homeBackPosCss} />*/}
      {/*    </Link>*/}
      {/*    <Reload onClick={() => location.reload()} style={reloadposCss} />*/}
      {/*  </Route>*/}
      {/*  <Route path="/christmas">*/}
      {/*    <Christmas />*/}
      {/*    <Link to="/">*/}
      {/*      <HomeSVG style={homeBackPosCss} />*/}
      {/*    </Link>*/}
      {/*  </Route>*/}
      {/*  <Route path="/playground">*/}
      {/*    <Playground />*/}
      {/*    <Link to="/">*/}
      {/*      <HomeSVG style={homeBackPosCss} />*/}
      {/*    </Link>*/}
      {/*  </Route>*/}
      {/*</Switch>*/}
      {/*</Router>*/}
    </>
  );
}
