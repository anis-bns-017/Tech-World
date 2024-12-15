import "../dropMenu/DropMenu.css";
import NavigationDesktop from "../dropMenu/NavigationDesktop";
import anisData from "../dropMenu/anis.json";
import Anis from "./Anis";

function AnisDown() {
  return (
    <div className="App bg-slate-50 pb-3">
      <div className="header-parent">
        <header className="header">
          <Anis menuData={anisData} />
        </header>
      </div>

    </div>
  );
}

export default AnisDown;
