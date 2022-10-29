import { CSSProperties } from "react"

export function DashboardCard(props: {
  style?: CSSProperties
  img: string
  title: string
  onClick: () => void
}) {
  return (
    <div
      style={{
        width: "260px",
        height: "330px",
        border: "2px solid #eee",
        padding: "20px",
        boxShadow: "0 0 2px 2px lightblue",
        ...props.style,
      }}
      onClick={props.onClick}
    >
      <div style={{ width: "220px", height: "220px" }}>
        <img src={props.img} alt="" style={{ width: "100%" }} />
      </div>
      <p style={{ width: "100%", textAlign: "center", fontSize: "22px" }}>
        {" "}
        {props.title}
      </p>
    </div>
  )
}
