import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import route from "@/route";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faApple } from "@fortawesome/free-brands-svg-icons/faApple";
import { faWindows } from "@fortawesome/free-brands-svg-icons/faWindows";
import { faLinux } from "@fortawesome/free-brands-svg-icons/faLinux";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";

/* add icons to the library */
library.add(faApple, faWindows, faLinux, faPlay, faSpinner);

createApp(App)
  .use(route)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
