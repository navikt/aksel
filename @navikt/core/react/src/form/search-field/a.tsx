import React from "react";
const T = (
  <form role="search">
    <label htmlFor="searchfield-id-123">Mollit eiusmod</label>
    <div>
      <div>
        <input id="searchfield-id-123" type="search" role="searchbox" />
        <button type="button">
          <span className="navds-sr-only">
            {/* <Close aria-hidden> */}
            <span className="navds-sr-only">Slett tekst i felt</span>
          </span>
        </button>
      </div>
      <button type="button">
        <span aria-live="polite" className="navds-sr-only">
          {/* <Search aria-hidden> */}
          <span className="navds-sr-only">Søk</span>
        </span>
      </button>
    </div>
  </form>
);
