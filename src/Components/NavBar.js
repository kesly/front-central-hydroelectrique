import React from 'react';

class NavBar extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <a className="navbar-brand" href="#">Hydraulics</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">

            <li className="nav-item active">
              <a className="nav-link" href="#">Import</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">Export</a>
            </li>

          </ul>
        </div>
      </nav>
    );
  }

}

export default NavBar;