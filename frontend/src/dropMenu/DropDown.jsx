import "../dropMenu/DropMenu.css";
import NavigationDesktop from "../dropMenu/NavigationDesktop";
import navLinksData from "../dropMenu/data.json";

function DropDown() {
  return (
    <div className="App bg-slate-50 pb-3">
      <div className="header-parent">
        <header className="header">
          <NavigationDesktop navLinksData={navLinksData} />
        </header>
      </div>

    </div>
  );
}

export default DropDown;
