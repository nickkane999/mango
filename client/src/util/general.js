import { getCookie } from "./cookies";

const user = getCookie("loginInfo") ? JSON.parse(getCookie("loginInfo")).userData : null;

const formattedDate = (date) => {
  date = new Date(date);
  var formattedDate = date.toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "EST",
  });
  return formattedDate + " EST";
};

const setSettings = (settings) => {
  let currentSettings = JSON.parse(sessionStorage.getItem("settings"));
  if (settings) {
    const formData = settings.hasOwnProperty("formData") ? settings.formData : currentSettings.hasOwnProperty("formData") ? currentSettings.formData : null;
    const chartJSON = settings.hasOwnProperty("chartJSON") ? settings.chartJSON : currentSettings.hasOwnProperty("chartJSON") ? currentSettings.chartJSON : null;
    const chartContainer = settings.hasOwnProperty("chartContainer") ? settings.chartContainer : currentSettings.hasOwnProperty("chartContainer") ? currentSettings.chartContainer : null;
    const template = settings.hasOwnProperty("template") ? settings.template : currentSettings.hasOwnProperty("template") ? currentSettings.template : null;
    const fields = settings.hasOwnProperty("fields") ? settings.fields : currentSettings.hasOwnProperty("fields") ? currentSettings.fields : null;
    let obj = { formData, chartJSON, chartContainer, template, fields };
    console.log("setting it");
    console.log(obj);
    sessionStorage.setItem("settings", JSON.stringify(obj));
  }
};

const hasSettings = () => {
  let currentSettings = JSON.parse(sessionStorage.getItem("settings"));
  //return currentSettings !== null;
  return false;
};

export { user, formattedDate, setSettings, hasSettings };
