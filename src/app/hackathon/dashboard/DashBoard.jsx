"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { HACKATHON_DASHBOARD_URL } from "@/app/_util/constants";
import secureLocalStorage from "react-secure-storage";
import { Toast } from "primereact/toast";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import ToastAlert from "@/app/_util/ToastAlerts";
import TeamDetails from "../_components/_DashBoard/TeamDetails";

import RoundOneComp from "../_components/_DashBoard/RoundOneComp";
import RoundTwoComp from "../_components/_DashBoard/RoundTwoComp";
import Round1NotFound from "../_components/_DashBoard/RoundOneNotFound";
import Navigationbar from "@/app/components/EventHeader";

export default function Page({ router }) {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerToken, setRegisterToken] = useState("");
  const [responseData, setResponseData] = useState("");
  const [detailsJson, setDetailsJson] = useState("");
  const [teamStatus, setTeamStatus] = useState("");
  useEffect(() => {
    setRegisterEmail(secureLocalStorage.getItem("registerEmail"));
    setRegisterToken(secureLocalStorage.getItem("registerToken"));
    setDetailsJson(secureLocalStorage.getItem("DashBoardData"));
  }, [router]);

  const [teamName, setTeamName] = useState("");
  const [noOfMembers, setNoOfMembers] = useState("");
  const [platform, setPlatform] = useState("");
  const [platformID, setPlatformID] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [RoundOneSub, setRoundOneSub] = useState("");
  const [RoundTwoSub, setRoundTwoSub] = useState("");
  const [roundDisplay, setRoundDisplay] = useState(1);

  useEffect(() => {
    console.log(detailsJson);
    if (detailsJson) {
      try {
        const details = JSON.parse(detailsJson);
        setTeamName(details.teamName);
        setNoOfMembers(details.totalMembers);
        let platformType;
        if (details.platformType == "1") platformType = "Anokha";
        else if (details.platformType == "2") platformType = "Devfolio";
        else if (details.platformType == "3") platformType = "Unstop";
        else if (details.platformType == "4") platformType = "Devpost";
        setPlatform(platformType);
        setPlatformID(details.platformId);
        setTeamMembers(details.teamMembers);
        setRoundOneSub(details.firstRoundSubmission);
        setRoundTwoSub(details.secondRoundSubmission);
        setTeamStatus(details.teamStatus);
        if (details.secondRoundSubmission.length == 0 ? setRoundDisplay(1) : setRoundDisplay(2));
        console.log(details.firstRoundSubmission, RoundOneSub);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else {
      console.error("DashBoardData not found in secureLocalStorage");
    }
  }, [detailsJson]);

  useEffect(() => {
    console.log(teamName, teamMembers);
  }, [teamName, teamMembers]);

  // useEffect(async () => {
  //   // try {
  //   //   const response = await fetch(HACKATHON_DASHBOARD_URL, {
  //   //     method: "GET",
  //   //     headers: {
  //   //       Authorization: "Bearer " + registerToken,
  //   //     },
  //   //   })
  //   // }
  //   //   const data = await response.json();
  //   //   if (response.status === 200) {
  //   //     // ToastAlert('success', "Success", "Registration successful", toastRef);
  //   //     alertSuccess("Registration Successful");
  //   //     console.log(data);
  //   //     setResponseData(data);
  //   //   } else if (response.status === 500) {
  //   //     // ToastAlert('error', "Oops!", "Something went wrong! Please try again later!", toastRef);
  //   //     alertError("Oops!", "Something went wrong! Please try again later!");
  //   //   } else if (data.message !== undefined || data.message !== null) {
  //   //     // ToastAlert('error', "Oops!", "Something went wrong! Please try again later!", toastRef);
  //   //     alertError("Registration Failed", data.message);
  //   //   } else {
  //   //     // ToastAlert('error', "Oops!", 'Something went wrong! Please try again later', toastRef);
  //   //     alertError("Oops!", "Something went wrong! Please try again later!");
  //   //   }
  //   // } catch (e) {
  //   //   console.log(e);
  //   // }
  //   }
  // , [router]);

  const alertError = (summary, detail) => {
    toast.current.show({
      severity: "error",
      summary: summary,
      detail: detail,
    });
  };

  const alertSuccess = (summary, detail) => {
    toast.current.show({
      severity: "success",
      summary: summary,
      detail: detail,
    });
  };

  return (
    <div className=" min-h-screen relative bg-[rgb(10,17,58)] sm:overflow-x-auto lg:overflow-hidden">
      <div className="w-full h-[20px]"></div>
      <Navigationbar />
      <main className="absolute w-full h-full flex sm:flex-col lg:flex-row gap-4 top-[85px]">
        <div className="sm:w-[100%] lg:w-[50%] mx-auto my-12 lg:my-15">
          <TeamDetails
            teamName={teamName}
            noOfMembers={noOfMembers}
            platform={platform}
            platformID={platformID}
            teamMembers={teamMembers}
            teamStatus={teamStatus}
          />
        </div>
        <div className="justify-end sm:w-[100%] lg:w-[50%] bg-[#172786] px-3 flex-1">
          <div className="flex flex-row justify-evenly">
            <button
              className={
                roundDisplay == 1
                  ? "bg-[#0a113a] flex-1 p-1 text-white text-lg mt-2 rounded-t-lg"
                  : "bg-[#172786] flex-1 p-1 text-white text-lg mt-2 rounded-t-lg"
              }
              onClick={() => setRoundDisplay(1)}
            >
              Round 1
            </button>
            <button
              className={
                teamStatus >= 2
                  ? roundDisplay == 2
                    ? "bg-[#0a113a] flex-1 p-1 text-white text-lg mt-2 rounded-t-lg"
                    : "bg-[#172786] flex-1 p-1 text-white text-lg mt-2 rounded-t-lg"
                  : "bg-[#172786] flex-1 p-1 text-white text-lg mt-2 rounded-t-lg cursor-not-allowed"
              }
              onClick={teamStatus >= 2 ? () => setRoundDisplay(2) : ""}
            >
              Round 2
            </button>
            <button className="bg-[#172786] flex-1 p-1 text-white text-lg mt-2 rounded-t-lg cursor-not-allowed">
              Round 3
            </button>
          </div>

          {roundDisplay == 1 ? (
            RoundOneSub == "" || RoundOneSub == null || RoundOneSub == [] ? (
              <Round1NotFound router={router} round={1} />
            ) : (
              <RoundOneComp router={router} roundOneSubmission={RoundOneSub} />
            )
          ) : roundDisplay == 2 && (RoundTwoSub == "" || RoundTwoSub == null || RoundTwoSub == []) ? (
            <Round1NotFound round={roundDisplay} router={router} />
          ) : (
            <RoundTwoComp router={router} roundOneSubmission={RoundOneSub} roundTwoSubmission={RoundTwoSub} />
          )}
        </div>
      </main>
    </div>
  );
}

// {
//     "MESSAGE": "Data Fetched Successfully",
//     "teamId": 1,
//     "teamName": "bottle",
//     "platformType": "1",
//     "platformId": "cb.en.u4cse21001@cb.students.amrita.edu",
//     "totalMembers": 3,
//     "teamStatus": "1",
//     "teamMembers": [
//         {
//             "studentEmail": "cb.en.u4cse21001@cb.students.amrita.edu",
//             "studentFullName": "Abhinav R",
//             "idcId": "idcId1",
//             "isLeader": "1"
//         },
//         {
//             "studentEmail": "cb.en.u4cse21008@cb.students.amrita.edu",
//             "studentFullName": "Ashwin S",
//             "idcId": "idcId2",
//             "isLeader": "0"
//         },
//         {
//             "studentEmail": "dharmapravardhana7@gmail.com",
//             "studentFullName": "Dharma Pravardhana V",
//             "idcId": "idcId3",
//             "isLeader": "0"
//         }
//     ],
//     "firstRoundSubmission": [
//         {
//             "theme": "2",
//             "problemStatement": "Problem Statement",
//             "githubLink": null,
//             "youtubeVideoLink": null,
//             "devmeshLink": null,
//             "pptFileLink": "https://amritavishwavidyapeetham-my.sharepoint.com/:b:/g/personal/cb_en_u4cse21257_cb_students_amrita_edu/EVyogD-Exw1BrpxKmRdizYQBIxzbmI-NA_xsxX7gnDM93Q?e=GTob89"
//         }
//     ],
//     "secondRoundSubmission": []
// }
