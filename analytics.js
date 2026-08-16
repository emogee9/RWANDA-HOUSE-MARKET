/* =========================================================
   RWANDA PROPERTY VISATA
   WEBSITE ANALYTICS TRACKER
========================================================= */


const ANALYTICS_SUPABASE_URL =
  "https://hsmnybmcddtsyooltozw.supabase.co";

const ANALYTICS_SUPABASE_KEY =
  "sb_publishable_oHhsRZQcMwIcReU48WE9mw_FdzMO29u";


const analyticsSupabase =
  window.supabase.createClient(
    ANALYTICS_SUPABASE_URL,
    ANALYTICS_SUPABASE_KEY
  );


/* =========================================================
   VISITOR ID
========================================================= */

function getVisitorId(){

  let visitorId =
    localStorage.getItem(
      "rpv_visitor_id"
    );


  if(!visitorId){

    visitorId =
      crypto.randomUUID();

    localStorage.setItem(
      "rpv_visitor_id",
      visitorId
    );

  }


  return visitorId;

}


/* =========================================================
   SESSION ID
========================================================= */

function getSessionId(){

  let sessionId =
    sessionStorage.getItem(
      "rpv_session_id"
    );


  if(!sessionId){

    sessionId =
      crypto.randomUUID();

    sessionStorage.setItem(
      "rpv_session_id",
      sessionId
    );

  }


  return sessionId;

}


/* =========================================================
   DEVICE
========================================================= */

function getDevice(){

  const width =
    window.innerWidth;


  if(width <= 650){

    return "Mobile";

  }


  if(width <= 1024){

    return "Tablet";

  }


  return "Desktop";

}


/* =========================================================
   BROWSER
========================================================= */

function getBrowser(){

  const ua =
    navigator.userAgent;


  if(ua.includes("Edg/")){

    return "Microsoft Edge";

  }


  if(ua.includes("Chrome")){

    return "Google Chrome";

  }


  if(ua.includes("Firefox")){

    return "Mozilla Firefox";

  }


  if(
    ua.includes("Safari") &&
    !ua.includes("Chrome")
  ){

    return "Safari";

  }


  return "Other";

}


/* =========================================================
   OPERATING SYSTEM
========================================================= */

function getOperatingSystem(){

  const ua =
    navigator.userAgent;


  if(/Android/i.test(ua)){

    return "Android";

  }


  if(/iPhone|iPad|iPod/i.test(ua)){

    return "iOS";

  }


  if(/Windows/i.test(ua)){

    return "Windows";

  }


  if(/Mac/i.test(ua)){

    return "macOS";

  }


  if(/Linux/i.test(ua)){

    return "Linux";

  }


  return "Other";

}


/* =========================================================
   PAGE TYPE
========================================================= */

function detectPageType(){

  const page =
    window.location.pathname
      .toLowerCase();


  if(
    page.includes("car")
  ){

    return "car";

  }


  if(
    page.includes("house") ||
    page.includes("property")
  ){

    return "property";

  }


  if(
    page.includes("plot")
  ){

    return "plot";

  }


  if(
    page.includes("home")
  ){

    return "home";

  }


  return "page";

}


/* =========================================================
   PROPERTY / CAR ID
========================================================= */

function getItemId(){

  const params =
    new URLSearchParams(
      window.location.search
    );


  return (
    params.get("id") ||
    params.get("property_id") ||
    params.get("car_id") ||
    null
  );

}


/* =========================================================
   TRACK PAGE
========================================================= */

async function trackPageView(){

  try{

    const visitorId =
      getVisitorId();


    const sessionId =
      getSessionId();


    const page =
      window.location.pathname;


    const pageType =
      detectPageType();


    const itemId =
      getItemId();


    const referrer =
      document.referrer ||
      null;


    const device =
      getDevice();


    const browser =
      getBrowser();


    const operatingSystem =
      getOperatingSystem();


    const screenWidth =
      window.innerWidth;


    const screenHeight =
      window.innerHeight;


    const language =
      navigator.language ||
      null;


    const timezone =
      Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone ||
      null;


    await analyticsSupabase
      .rpc(
        "record_website_visit",
        {

          p_visitor_id:
            visitorId,

          p_session_id:
            sessionId,

          p_page:
            page,

          p_page_type:
            pageType,

          p_property_id:
            itemId,

          p_referrer:
            referrer,

          p_device:
            device,

          p_browser:
            browser,

          p_operating_system:
            operatingSystem,

          p_screen_width:
            screenWidth,

          p_screen_height:
            screenHeight,

          p_language:
            language,

          p_timezone:
            timezone

        }
      );


  }
  catch(error){

    console.error(
      "Analytics error:",
      error
    );

  }

}


/* =========================================================
   START
========================================================= */

if(
  document.readyState ===
  "loading"
){

  document.addEventListener(
    "DOMContentLoaded",
    trackPageView
  );

}
else{

  trackPageView();

}
