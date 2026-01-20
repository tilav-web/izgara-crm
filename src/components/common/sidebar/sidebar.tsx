import { useNavigate } from "react-router-dom";
import { menu } from "./menu";
import { mainImage } from "@/shared/images";
export default function Sidebar() {
  const navigate = useNavigate();
  const handleChangePosition = (link: string) => {
    navigate(link);
  };

  return (
    <aside className="max-w-75 w-full border-r">
      <div className="m-2 rounded-md overflow-hidden shadow">
        <img className="w-full h-full object-cover" src={mainImage} alt="logo" />
      </div>
      <ul>
        {menu.map((item) => {
          return (
            <li
              className="flex items-center gap-2 p-2 rounded border m-2 cursor-pointer"
              key={item.link}
              onClick={() => handleChangePosition(item.link)}
            >
              <item.icon size={16} />
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
