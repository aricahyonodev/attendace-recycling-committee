import Avatar from "react-avatar";
import { FaCross } from "react-icons/fa";
export default function NavbarTop(second) {
  return (
    <div className="lg:hidden absolute top-0 w-full right-0 mt-4 px-4">
      <div className="flex justify-between items-center text-sm">
        <div className="flex space-x-1 text-start">
          <Avatar
            color="#4F6F52"
            name="Wim Mostmans"
            size="40"
            className="rounded-full"
          />
          <div>
            <p className="font-semibold">Wim Mostmans</p>
            <p className="text-xs">God to be Glory!</p>
          </div>
        </div>

        <div>
          <FaCross size={"2em"} color="#006400" />
        </div>
      </div>
    </div>
  );
}
