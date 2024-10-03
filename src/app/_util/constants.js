// const BASE_URL = "https://web.abhinavramakrishnan.tech/api";
//const BASE_URL = "http://localhost:5000/api";
const BASE_URL = "https://anokha.amrita.edu/api";
// const HACKATHON_URL = "https://web.abhinavramakrishnan.tech/api/intel";
const HACKATHON_URL = "https://anokha.amrita.edu/api/intel";

export const payU_Key =
  process.env.NEXT_PUBLIC_IS_PRODUCTION === "1"
    ? process.env.NEXT_PUBLIC_PAY_U_KEY_PROD
    : process.env.NEXT_PUBLIC_PAY_U_KEY_TEST;
export const payU_Action =
  process.env.NEXT_PUBLIC_IS_PRODUCTION === "1"
    ? "https://secure.payu.in/_payment"
    : "https://test.payu.in/_payment";
export const ALL_TRANSACTION_URL = BASE_URL + "/user/getAllTransactions";
export const EDIT_PROFILE_URL = BASE_URL + "/user/editStudentProfile";
export const STUDENT_PROFILE_URL = BASE_URL + "/user/getStudentProfile";
export const LOGIN_URL = BASE_URL + "/auth/loginStudent";
export const REGISTER_URL = BASE_URL + "/auth/registerStudent";
export const STUDENT_REGISTER_VERIFY_URL = BASE_URL + "/auth/verifyStudent";
export const STUDENT_FORGOT_PASSWORD_URL =
  BASE_URL + "/auth/forgotPasswordStudent";
export const STUDENT_RESET_PASSWORD_URL =
  BASE_URL + "/auth/resetPasswordStudent";
export const CREW_URL = BASE_URL + "/user/getCrew";

export const HACKATHON_TEAM_REGISTER_URL = HACKATHON_URL + "/registerTeam";
export const HACKATHON_DASHBOARD_URL = HACKATHON_URL + "/getDashBoard";
export const HACKATHON_FIRST_ROUND_SUBMISSION_URL =
  HACKATHON_URL + "/submitFirstRound";
export const HACKATHON_SECOND_ROUND_SUBMISSION_URL =
  HACKATHON_URL + "/submitSecondRound";
export const HACKATHON_EDIT_FIRST_ROUND_SUBMISSION_URL =
  HACKATHON_URL + "/editFirstRoundSubmission";
export const HACKATHON_EDIT_SECOND_ROUND_SUBMISSION_URL =
  HACKATHON_URL + "/editSecondRoundSubmission";

// These urls might be  wrong .. /auth/user (needs fix later)
export const ALL_EVENTS_URL = BASE_URL + "/user/getAllEvents";
export const STARRED_EVENTS_URL = BASE_URL + "/user/getStarredEvents";
export const REGISTERED_EVENT_URL = BASE_URL + "/user/registeredEventData";
export const EVENT_DATA_URL = BASE_URL + "/user/getEventData";
export const STAR_UNSTAR_EVENT_URL = BASE_URL + "/user/toggleStarredEvent";
export const GET_REGISTERED_EVENTS = BASE_URL + "/user/getRegisteredEvents";

export const BUY_PASSPORT_DUMMY_PAGE_URL = BASE_URL + "/user/buyPassport";
export const VERIFY_TRANSACTIONS_URL = BASE_URL + "/user/verifyTransaction";

export const EVENT_REGISTER_STEP_ONE =
  BASE_URL + "/user/registerForEventStepOne";
export const ALL_TAGS_URL = BASE_URL + "/admin/getActiveTags";
