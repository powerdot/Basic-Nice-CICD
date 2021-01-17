import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

export default ({ app, store }) => {
//   console.log("PLUGIN APP", app)

  const defaultLocale = "en";
  const localeCookie = app.$cookies.get("locale");
  const locale = localeCookie || defaultLocale;

  app.i18n = new VueI18n({
    locale,
    fallbackLocale: "en",
    messages: {
      en: require("../lang/en-US"),
      ru: require("../lang/ru-RU")
    }
  });

  app.i18n.path = link => {
    return `/${link}`;
  };
};
