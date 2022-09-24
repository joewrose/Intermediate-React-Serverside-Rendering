import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Everything that is in this file will be rendered in the client browser instead of in Node.js
// Browser router must be rendered in the browser.
// We want to tell React not to both with the static HTML part of the website,
// because we have already created that and sent that to the client by the
// time the full app in going to be rendered. So as a result we call 'hyrdrate'
// which tells react only to both with the interactive parts of the app and to
// fill in the missing parts of the static HTML.

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
