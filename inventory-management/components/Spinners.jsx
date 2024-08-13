import { PropagateLoader } from "react-spinners";
export default function Spinners() {
  return (
    <div className="flex justify-center">
      <PropagateLoader color={"#36d7b7"} speedMultiplier={2} size={30} />
    </div>
  );
}
