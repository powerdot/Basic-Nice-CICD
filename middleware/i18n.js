export default function({ isHMR, app, store, route, params, error, redirect }) {
    const defaultLocale = app.i18n.fallbackLocale;
    const localeCookie = app.$cookies.get("locale");
    if (isHMR) return;
    const locale = localeCookie || defaultLocale;

    // console.log("MIDDLEWARE APP", locale, app)

    if(!app.i18n.messages[locale]){
        app.i18n.locale = 'en';
        return error({ message: "This page could not be found.", statusCode: 404 });
    }
  
    app.i18n.locale = locale;
    app.$cookies.set("locale", locale, {
      path: "/"
    });
  }  