import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../utils/images/guild_logo.png";
import { AiOutlineSearch } from "react-icons/ai";
// import styles from "./css/navigation.module.css";
import { infoToast } from "../../utils/hooks/useToast";
import { VscListFlat } from "react-icons/vsc";

const Navigation = ({
  loginCheckClient,
  logOutClient,
  loginCheckMember,
  logOutMember,
}) => {
  // const [login, setLogin] = useState(false);

  const navigate = useNavigate();
  const goToLoginPage = () => navigate("/members/account/login");
  const goToClientLoginPage = () => navigate("/clients/login");

  const logOutMem = () => {
    goToLoginPage();
    logOutMember();
  };

  const logOutCli = () => {
    goToClientLoginPage();
    logOutClient();
  };

  return (
    <nav>
      <Navbar bg="custom" expand="xl" variant="guild" collapseOnSelect>
        <Container>
          <Navbar.Brand>
            <img src={logo} alt="Guild-Logo" id="guild-logo" />
            <Link to="/" id="nav-guild-name">
              <span>East Annwm</span>
              <span>Adventurer's Guild</span>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <VscListFlat color="white" />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" color="">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/about" eventKey="1">
                About the Guild
              </Nav.Link>

              <Nav.Link as={NavLink} to="/members" eventKey="2">
                Member Services
              </Nav.Link>

              <NavDropdown
                title="Mission Services"
                id="basic-nav-dropdown"
                menuVariant="dark"
                eventKey="3"
              >
                <NavDropdown.Item as={NavLink} to="/missions/all">
                  Mission Board
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/missions/search">
                  Search Missions <AiOutlineSearch />
                </NavDropdown.Item>

                <NavDropdown.Divider />
                {loginCheckClient ? (
                  <NavDropdown.Item as={NavLink} to="/missions/create">
                    Create new Mission
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item
                    as={NavLink}
                    to="/clients/login"
                    onClick={() => {
                      infoToast("Please log in before creating a mission.");
                    }}
                  >
                    Create new Mission
                  </NavDropdown.Item>
                )}
              </NavDropdown>
              <NavDropdown
                title="Account Management"
                id="basic-nav-dropdown"
                menuVariant="dark"
                eventKey="4"
              >
                {!loginCheckMember && (
                  <NavDropdown.Item as={NavLink} to="/members/account/login">
                    Member Login
                  </NavDropdown.Item>
                )}
                {!loginCheckClient && (
                  <NavDropdown.Item as={NavLink} to="/clients/login">
                    Client Login
                  </NavDropdown.Item>
                )}
                {loginCheckClient && (
                  <NavDropdown.Item as={NavLink} to="/clients/info">
                    Details - Client
                  </NavDropdown.Item>
                )}
                {loginCheckMember && (
                  <NavDropdown.Item as={NavLink} to="/members/account/info">
                    Details - Member
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                {loginCheckMember && (
                  <NavDropdown.Item onClick={logOutMem}>
                    Member Logout
                  </NavDropdown.Item>
                )}
                {loginCheckClient && (
                  <NavDropdown.Item onClick={logOutCli}>
                    Client Logout
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </nav>
  );
};

export default Navigation;

// const alexNav = (
//   <nav id="nav-main">
//     <ul>
//       <li className="nav-logo">
//         <Link to="/">
//           <img src={logo} alt="The Guild Logo" />
//         </Link>
//         <Link to="/" id="nav-guild-name">
//           <span>East Annwm</span>
//           <span>Adventurer's Guild</span>
//         </Link>
//       </li>
//       <li>
//         <Link to="/about">About the Guild</Link>
//       </li>
//       <li>
//         <Link to="/members">Member Services</Link>
//       </li>
//       <li>
//         <Link to="/missions">Mission Board</Link>
//       </li>
//       <li>
//         <Link to="/">Login</Link>
//       </li>
//     </ul>
//   </nav>
// );

// const bootNav = (
//   <nav>
//     <Navbar bg="custom" expand="xl" variant="guild">
//       <Container>
//         <Navbar.Brand>
//           <img src={logo} alt="Guild-Logo" />
//           <Link to="/" id="nav-guild-name">
//             <span>East Annwm</span>
//             <span>Adventurer's Guild</span>
//           </Link>
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav" color="">
//           <Nav className="me-auto">
//             <Nav.Link as={NavLink} to="/about">
//               About the Guild
//             </Nav.Link>

//             <Nav.Link as={NavLink} to="/members">
//               Member Services
//             </Nav.Link>

//             <Nav.Link as={NavLink} to="/missions">
//               Mission Board
//             </Nav.Link>

//             <Nav.Link as={NavLink} to="/login">
//               <FiLogIn /> Login
//             </Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   </nav>
// );
