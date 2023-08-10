import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import route from "@/route";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faApple,
  faWindows,
  faLinux,
} from "@fortawesome/free-brands-svg-icons";
import { faPlay, faSpinner } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faApple, faWindows, faLinux, faPlay, faSpinner);

createApp(App)
  .use(route)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
