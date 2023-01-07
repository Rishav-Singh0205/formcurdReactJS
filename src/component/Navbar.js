import React from 'react';

export default function Navbar() {
  return (
    <div>
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid  ">
    <a className="navbar-brand" href="/">NoteBook</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        
      </ul>
      <form className="d-flex ">
        <a className="btn btn-primary mx-1" href="/signup" type="signup">Apply</a>
      </form>
    </div>
  </div>
</nav>
    </div>
  );
}
