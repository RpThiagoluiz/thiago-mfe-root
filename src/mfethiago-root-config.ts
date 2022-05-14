import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp: ({ name }) => System.import(name),
});
const layoutEngine = constructLayoutEngine({ routes, applications });

registerApplication({
  name: "@thiagoreact/thiagoreactone",
  app: () => System.import("@thiagoreact/thiagoreactone"),
  activeWhen: ["/"],
});

applications.forEach(registerApplication);
layoutEngine.activate();

start({
  urlRerouteOnly: true,
});

// System.import("@thiagoreact/thiagoreactone").then(() => {
//   // Activate the layout engine once the styleguide CSS is loaded
//   layoutEngine.activate();
//   start();
// });
