import { useState } from "react"
import { CategoryEnum } from "../../common/common"
import { Car } from "../car/Car"
import { Food } from "../Food"
import { HomeSVG } from "../../svgs/svgs"


export function Dashboard() {
  const [cat, setCat] = useState<CategoryEnum | undefined>(CategoryEnum.CAR)
  return (
    <>
      {cat === undefined && (
        <>
          <button
            onClick={() => {
              setCat(CategoryEnum.FOOD)
            }}
          >
            Food
          </button>
          <button
            onClick={() => {
              setCat(CategoryEnum.CAR)
            }}
          >
            Car
          </button>
        </>
      )}
      {cat !== undefined && (
        <>
          <HomeSVG
            style={{ position: "fixed", left: "20px", top: "20px", zIndex: 999}}
            onClick={() => setCat(undefined)}/>
          {/*<img*/}
          {/*  src={"img/home.png"}*/}
          {/*  style={{ position: "fixed", left: "20px", top: "20px", zIndex: 999, width: "100px" }}*/}
          {/*  onClick={() => setCat(undefined)}*/}
          {/*/>*/}
        </>
      )}
      {cat === CategoryEnum.FOOD && <Food />}
      {cat === CategoryEnum.CAR && <Car />}
    </>
  )
}
