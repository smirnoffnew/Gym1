export const CHANGE_STEP = "CHANGE_STEP";
export const INPUT_DATA = "INPUT_DATA";
export const INPUT_EXTRA = "INPUT_EXTRA";
export const REMOVE_AN_EXTRA = "REMOVE_AN_EXTRA";
export const GET_SUBSCRIPTION_OPTIONS = "GET_SUBSCRIPTION_OPTIONS";
export const INPUT_FORM_DATA = "INPUT_FORM_DATA";
export const HANDLE_ERROR = "HANDLE_ERROR";
export const RESET_DATA = "RESET_DATA";
export const RESET_STEPPER = "RESET_STEPPER";
export const INPUT_STEP2_OPTION = "INPUT_STEP2_OPTION";

export const BASE_URL = "https://api-staging.fitforfree.nl";
export const API_KEY = "77b90a0e839fc891378dba2f7b15df0b";
export const GENERAL_SALT = "cd72d42e04d6c5eaf30ea61d8ee06eb9";
export const COUNTRY_CODE = "nl";
export const POSTCODE_URL =
  "https://europe-west1-fit-for-free-sc.cloudfunctions.net/postcodeProxy";

export const NAME_REGEX = /^.{1,64}$/;
export const DUTCH_POSTCODE_REGEX = /^\d{4}[a-zA-z]{2}$/;
export const HOUSENUMBER_REGEX = /^\d+$/;
export const ADDITION_REGEX = /^[a-zA-Z0-9]{0,4}$/;
export const DUTCH_MOB_PHONE_REGEX = /^[0][6]\d{8}$/;
export const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const step2OptionsArray = [
  {
    // initial
    options: {
      fitness: false,
      group: false,
      pause: false,
      friend: false,
      share: false
    },
    plan: null
  },
  {
    //1
    options: {
      fitness: true,
      group: false,
      pause: false,
      friend: false,
      share: false
    },
    plan: "fit_self"
  },
  {
    //2
    options: {
      fitness: true,
      group: true,
      pause: false,
      friend: false,
      share: false
    },
    plan: "fit_free"
  },
  {
    //3
    options: {
      fitness: true,
      group: true,
      pause: true,
      friend: false,
      share: false
    },
    plan: "fit_free"
  },
  {
    //4
    options: {
      fitness: true,
      group: true,
      pause: true,
      friend: true,
      share: false
    },
    plan: "fit_free"
  },
  {
    //5
    options: {
      fitness: true,
      group: true,
      pause: false,
      friend: true,
      share: false
    },
    plan: "fit_free"
  },
  {
    //6
    options: {
      fitness: true,
      group: false,
      pause: true,
      friend: false,
      share: false
    },
    plan: "fit_free"
  },
  {
    //7
    options: {
      fitness: true,
      group: false,
      pause: true,
      friend: true,
      share: false
    },
    plan: "fit_free"
  },
  {
    //8
    options: {
      fitness: true,
      group: false,
      pause: false,
      friend: true,
      share: false
    },
    plan: "fit_free"
  },
  {
    //9
    options: {
      fitness: false,
      group: true,
      pause: false,
      friend: false,
      share: false
    },
    plan: "fit_free"
  },
  {
    //10
    options: {
      fitness: false,
      group: true,
      pause: true,
      friend: false,
      share: false
    },
    plan: "fit_free"
  },
  {
    //11
    options: {
      fitness: false,
      group: true,
      pause: true,
      friend: true,
      share: false
    },
    plan: "fit_free"
  },
  {
    //12
    options: {
      fitness: false,
      group: true,
      pause: false,
      friend: true,
      share: false
    },
    plan: "fit_free"
  },
  {
    //13
    options: {
      fitness: false,
      group: false,
      pause: true,
      friend: false,
      share: false
    },
    plan: "fit_free"
  },
  {
    //14
    options: {
      fitness: false,
      group: false,
      pause: true,
      friend: true,
      share: false
    },
    plan: "fit_free"
  },
  {
    //15
    options: {
      fitness: false,
      group: false,
      pause: false,
      friend: true,
      share: false
    },
    plan: "fit_free"
  },
  {
    //16
    options: {
      fitness: true,
      group: true,
      pause: true,
      friend: true,
      share: true
    },
    plan: "fit_complete"
  },
  {
    //17
    options: {
      fitness: true,
      group: true,
      pause: false,
      friend: false,
      share: true
    },
    plan: "fit_complete"
  },
  {
    //18
    options: {
      fitness: true,
      group: false,
      pause: true,
      friend: false,
      share: true
    },
    plan: "fit_complete"
  },
  {
    //19
    options: {
      fitness: true,
      group: false,
      pause: false,
      friend: true,
      share: true
    },
    plan: "fit_complete"
  },
  {
    //20
    options: {
      fitness: true,
      group: false,
      pause: false,
      friend: false,
      share: true
    },
    plan: "fit_complete"
  },
  {
    //21
    options: {
      fitness: false,
      group: true,
      pause: true,
      friend: true,
      share: true
    },
    plan: "fit_complete"
  },
  {
    //22
    options: {
      fitness: false,
      group: true,
      pause: false,
      friend: false,
      share: true
    },
    plan: "fit_complete"
  },
  {
    //23
    options: {
      fitness: false,
      group: false,
      pause: true,
      friend: false,
      share: true
    },
    plan: "fit_complete"
  },
  {
    //24
    options: {
      fitness: false,
      group: false,
      pause: false,
      friend: true,
      share: true
    },
    plan: "fit_complete"
  },
  {
    //25
    options: {
      fitness: false,
      group: false,
      pause: false,
      friend: false,
      share: true
    },
    plan: "fit_complete"
  },
  {
    //26
    options: {
      fitness: true,
      group: true,
      pause: true,
      friend: false,
      share: true
    },
    plan: "fit_complete"
  },
  {
    //27
    options: {
      fitness: true,
      group: true,
      pause: false,
      friend: true,
      share: true
    },
    plan: "fit_complete"
  },
  {
    //28
    options: {
      fitness: true,
      group: false,
      pause: true,
      friend: true,
      share: true
    },
    plan: "fit_complete"
  }
];
