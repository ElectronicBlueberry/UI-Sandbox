import "@fontsource/atkinson-hyperlegible/400.css";
import "@fontsource/atkinson-hyperlegible/700.css";
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./routes";

const app = createApp(App);
app.use(router);
app.mount("#app");
