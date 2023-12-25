import { Outlet, Link } from "react-router-dom";
import './../style/Layout.css';

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/Home">Home</Link>
          </li>
          <li>
            <Link to="/Dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/Channels">Channels</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
