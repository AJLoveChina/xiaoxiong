import { useState } from "react"
import { CategoryEnum } from "../../common/common"
import { Car } from "../car/Car"
import { Food } from "../Food"
import { HomeSVG } from "../../svgs/svgs"
import { DashboardCard } from "./DashboardCard"
import "./dashboard.css"

export function Dashboard() {
  const [cat, setCat] = useState<CategoryEnum | undefined>(undefined)
  const cards = [
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
  ]

  return (
    <>
      {cat === undefined && (
        <div className={"dashboard"}>
          {cards.map((card) => {
            return (
              <DashboardCard
                style={{ margin: "20px" }}
                img={card.img}
                title={card.title}
                onClick={() => setCat(card.cat)}
              />
            )
          })}
        </div>
      )}
      {cat !== undefined && (
        <HomeSVG
          style={{
            position: "fixed",
            left: "20px",
            top: "20px",
            zIndex: 999,
          }}
          onClick={() => setCat(undefined)}
        />
      )}
      {cat === CategoryEnum.FOOD && <Food />}
      {cat === CategoryEnum.CAR && <Car />}
    </>
  )
}
