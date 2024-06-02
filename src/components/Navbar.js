import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import doc from '../images/doc.png';
import { selectCartCount } from '../components/Cart/cartSlice';
import { selectLogged, selectUsername } from '../components/loginSlice';
import DefaultProfilePic from '../images/user.jpg';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const petTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#2979ff', // Bright blue
        },
        secondary: {
            main: '#00e676', // Vibrant green
        },
        background: {
            default: '#ffffff', // Medium gray
            paper: '#ffffff', // White background for navbar
        },
        text: {
            primary: '#000000', // Black text for better contrast on white background
            secondary: '#ffcc80', // Light orange
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h4: {
            color: '#ff8f00', // Orange
        },
        h5: {
            fontFamily: 'Roboto, Arial, sans-serif',
            color: '#ff8f00', // Orange
        },
        body2: {
            color: '#b0bec5', // Light gray
        },
    },
});

const navbarStyles = `
.navbar {
  background-color: ${petTheme.palette.background.paper} !important;
}

.navbar-nav .nav-link {
  color: ${petTheme.palette.text.primary};
  position: relative;
}

.navbar-nav .nav-link:hover {
  color: ${petTheme.palette.primary.main};
}

.navbar-nav .nav-link:hover i {
  color: ${petTheme.palette.primary.main};
}

.navbar-nav .nav-link::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  background-color: transparent;
  transition: background-color 0.3s ease;
}

.navbar-nav .nav-link:hover::before {
  background-color: ${petTheme.palette.primary.main};
}

.logo-frame img {
  border: 2px solid ${petTheme.palette.primary.main};
  border-radius: 8px;
}
`;

class Navbar extends React.Component {
  toggleNavbar = () => {
    this.props.dispatch({ type: "navbar/toggleNavbar" });
  };

  render() {
    const { isNavbarOpen, cartCount, logged, userName } = this.props;

    return (
      <ThemeProvider theme={petTheme}>
        <CssBaseline />
        <nav className="navbar navbar-expand-lg navbar-light">
          <style>{navbarStyles}</style>
          <div className="container-fluid">
            <div className="logo-frame">
              <a className="navbar-brand" href="/">
                <img src={doc} alt="Petstore Logo" width="60" height="auto" />
              </a>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              onClick={this.toggleNavbar}
              aria-controls="navbarSupportedContent"
              aria-expanded={isNavbarOpen}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={"collapse navbar-collapse" + (isNavbarOpen ? " show" : "")}
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    <i className="bi bi-house-door-fill text-primary"></i>
                    Home
                  </a>
                </li>
                {/* Products */}
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-shop text-success"></i>
                    Products
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {/* Add your dropdown items here */}
                    <li><a className="dropdown-item" href="/Products">Products</a></li>
                    <li><a className="dropdown-item" href="/Dogs">Dogs</a></li>
                    <li><a className="dropdown-item" href="/Cats">Cats</a></li>
                    {/* Add more categories as needed */}
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/AboutMe">
                    <i className="bi bi-file-person"></i>
                    About Us
                  </a>
                </li>
              </ul>
              <div className="navbar-nav">
                {!logged ? (
                  <>
                    <a className="nav-link btn btn-secondary me-2" href="/register">
                      <i className="bi bi-person-plus-fill text-info"></i>
                      Sign-up
                    </a>
                    <li className="nav-item">
                      <a className="nav-link btn btn-outline-light me-2" href="/login">
                        <i className="bi bi-box-arrow-in-right text-primary"></i>
                        Login
                      </a>
                    </li>
                  </>
                ) : (
                  <div className="navbar-nav">
                    <Link to="/Login" className="nav-link">
                      <img
                        src={DefaultProfilePic}
                        alt="Profile"
                        className="rounded-circle"
                        style={{ width: '40px', height: '40px', borderColor: '#ffcc80' }}
                      />
                      {userName}
                    </Link>
                  </div>
                )}
              </div>
              <div className="navbar-nav">
                <Link to="/cart" className="nav-link">
                  <i className="bi bi-cart-fill text-danger"></i>
                  ({cartCount})
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </ThemeProvider>
    );
  }
}

// Define PropTypes for the component
Navbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isNavbarOpen: PropTypes.bool.isRequired,
  cartCount: PropTypes.number.isRequired,
  logged: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isNavbarOpen: state.navbar.isNavbarOpen,
    cartCount: selectCartCount(state),
    logged: selectLogged(state),
    userName: selectUsername(state),
  };
};

export default connect(mapStateToProps)(Navbar);
