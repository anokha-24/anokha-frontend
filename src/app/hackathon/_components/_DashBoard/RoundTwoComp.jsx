import React, { useEffect, useRef, useState } from "react";
import { Button } from "@material-tailwind/react";
import { Dropdown } from "primereact/dropdown";
import { FaGithub } from "react-icons/fa";
import { SiIntel } from "react-icons/si";
import { FaYoutube } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdEditOff } from "react-icons/md";
import {
  HACKATHON_DASHBOARD_URL,
  HACKATHON_SECOND_ROUND_SUBMISSION_URL,
  HACKATHON_EDIT_SECOND_ROUND_SUBMISSION_URL,
} from "../../../_util/constants";
import secureLocalStorage from "react-secure-storage";
import ToastAlert from "@/app/_util/ToastAlerts";
import { Toast } from "primereact/toast";

const RoundOneComp = ({ router, roundOneSubmission, roundTwoSubmission }) => {
  const [editable, setEditable] = useState(
    roundTwoSubmission.length == 0 ? 1 : 0
  );
  console.log("$$$$$$$$$", roundTwoSubmission, roundOneSubmission);
  const availThemes = [
    { code: "0", val: "GenAI" },
    { code: "1", val: "Energy" },
    { code: "2", val: "IOT" },
    { code: "3", val: "Healthcare" },
    { code: "4", val: "OpenEnded" },
  ];

  const ThemeCode = {
    0: "GenAI",
    1: "Energy",
    2: "IOT",
    3: "Healthcare",
    4: "OpenEnded",
  };
  const [gitLink, setGitLink] = useState(
    roundTwoSubmission.length ? roundTwoSubmission[0]["githubLink"] : ""
  );
  const [ytLink, setYTLink] = useState(
    roundTwoSubmission.length != 0
      ? roundTwoSubmission[0]["youtubeVideoLink"]
      : ""
  );
  const [devMeshLink, setDevMeshLink] = useState(
    roundTwoSubmission.length ? roundTwoSubmission[0]["devmeshLink"] : ""
  );
  const [pptLink, setPptLink] = useState(
    roundTwoSubmission.length ? roundTwoSubmission[0]["pptFileLink"] : ""
  );
  const [canSubmit, setCanSubmit] = useState(0);
  //Use this for sending to backend
  const [themeCode, setThemeCode] = useState("0");

  const [theme, setTheme] = useState(ThemeCode[roundOneSubmission[0]["theme"]]);
  const [probStatement, setProbStat] = useState(
    roundOneSubmission[0]["problemStatement"]
  );

  const toastRef = useRef();

  useEffect(() => {
    setThemeCode(roundOneSubmission[0]["theme"]);
    setCanSubmit(0);
  }, [router]);

  useEffect(() => {
    if (roundTwoSubmission.length != 0) {
      if (
        gitLink == roundTwoSubmission[0]["githubLink"] &&
        ytLink == roundTwoSubmission[0]["youtubeVideoLink"] &&
        devMeshLink == roundTwoSubmission[0]["devmeshLink"] &&
        pptLink == roundTwoSubmission[0]["pptFileLink"]
      ) {
        setCanSubmit(0);
      } else {
        setCanSubmit(1);
      }
    } else {
      if (
        pptLink.length != 0 &&
        gitLink.length != 0 &&
        ytLink.length != 0 &&
        devMeshLink.length != 0
      ) {
        setCanSubmit(1);
      } else {
        setCanSubmit(0);
      }
    }
  }, [gitLink, ytLink, devMeshLink, pptLink]);

  const handleSubmit = async () => {
    if (roundTwoSubmission.length != 0) {
      const response = await fetch(HACKATHON_EDIT_SECOND_ROUND_SUBMISSION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secureLocalStorage.getItem(
            "registerToken"
          )}`,
        },
        body: JSON.stringify({
          pptFileLink: pptLink,
          githubLink: gitLink,
          youtubeVideoLink: ytLink,
          devmeshLink: devMeshLink,
        }),
      });
      const data = await response.json();
      if (response.status == 200) {
        ToastAlert("success", "Updation Successful", data.MESSAGE, toastRef);
        try {
          const response = await fetch(HACKATHON_DASHBOARD_URL, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${secureLocalStorage.getItem(
                "registerToken"
              )}`,
            },
          });
          const data = await response.json();
          console.log(data);
          if (response.status === 200) {
            secureLocalStorage.setItem("DashBoardData", JSON.stringify(data));
            window.location.reload();
          } else {
            ToastAlert("error", "Error", data.MESSAGE, toastRef);
          }
        } catch (err) {
          console.error(err);
          ToastAlert(
            "error",
            "Error",
            "Error retriving information from server",
            toastRef
          );
        }
      } else if (response.status == 400) {
        ToastAlert("error", "Error", data.MESSAGE, toastRef);
      }
    } else {
      const response = await fetch(HACKATHON_SECOND_ROUND_SUBMISSION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secureLocalStorage.getItem(
            "registerToken"
          )}`,
        },
        body: JSON.stringify({
          pptFileLink: pptLink,
          githubLink: gitLink,
          youtubeVideoLink: ytLink,
          devmeshLink: devMeshLink,
        }),
      });
      const data = await response.json();
      if (response.status == 200) {
        ToastAlert("success", "Updation Successful", data.MESSAGE, toastRef);
        try {
          const response = await fetch(HACKATHON_DASHBOARD_URL, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${secureLocalStorage.getItem(
                "registerToken"
              )}`,
            },
          });
          const data = await response.json();
          console.log(data);
          if (response.status === 200) {
            secureLocalStorage.setItem("DashBoardData", JSON.stringify(data));
            window.location.reload();
          } else {
            ToastAlert("error", "Error", data.MESSAGE, toastRef);
          }
        } catch (err) {
          console.error(err);
          ToastAlert(
            "error",
            "Error",
            "Error retriving information from server",
            toastRef
          );
        }
      } else if (response.status == 400) {
        ToastAlert("error", "Error", data.MESSAGE, toastRef);
      }
    }
  };

  const SubmissionComponent = (icon, link, setLink) => {
    return (
      <div className="flex bg-white  text-black items-center rounded px-4 py-2 gap-3 mt-3">
        {icon == "github" ? (
          <FaGithub size={30} />
        ) : icon == "YT" ? (
          <FaYoutube size={30} />
        ) : icon == "devmesh" ? (
          <SiIntel size={30} />
        ) : icon == "pdf" ? (
          <p className="w-[90px] font-bold">PPT Link</p>
        ) : (
          ""
        )}
        <div className="w-[90%] focus:outline-0 pl-2">
          <a
            href={link}
            target="blank"
            className={editable == 1 ? "hidden" : "text-blue-400 text-wrap"}
          >
            {link}
          </a>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className={editable == 1 ? "focus:outline-0 w-full" : "hidden"}
            placeholder={
              icon == "github"
                ? "Project github url"
                : icon == "YT"
                ? "Project youtube url"
                : icon == "devmesh"
                ? "Project devmesh url"
                : icon == "pdf"
                ? "Project ppt url"
                : ""
            }
          />
        </div>
      </div>
    );
  };

  return (
    <div className=" bg-[#0a113a] text-white w-full p-5 pt-0 h-[80%] rounded-b-xl ">
      <div className="p-2">
        <Toast ref={toastRef} position="bottom-center" className="p-5" />
      </div>
      <div className="bg-[#0a113a] text-white rounded-xl p-6 w-full h-full mx-auto pt-1">
        <div className="flex flex-row mx-auto justify-between">
          <p className="text-center mb-8 text-xl lg:ml-[30%] mt-3">
            Submit your Project/Prototype Links
          </p>
          {editable ? (
            <MdEditOff
              onClick={(e) => setEditable(!editable)}
              className="mt-2"
            />
          ) : (
            <MdEdit onClick={(e) => setEditable(!editable)} className="mt-2" />
          )}
        </div>
        <div className="flex sm:flex-col sm:justify-center sm:items-center lg:flex-row gap-4">
          <Dropdown
            disabled={true}
            value={theme}
            options={availThemes}
            optionLabel="val"
            optionValue="val"
            placeholder="Theme"
            className="w-[100px] h-fit flex-1"
          ></Dropdown>
          <div className="flex-2 bg-white text-black items-center p-2 rounded-md lg:h-[170px] md:h-[150px] sm:h-[120px]">
            <div className=" focus:outline-0 pl-2 h-[100%]">
              <textarea
                style={{ resize: "none", height: "100%" }}
                disabled={true}
                placeholder="Enter problem statement"
                value={probStatement}
                onChange={(e) => setProbStat(e.target.value)}
                className="focus:outline-0 w-full"
                maxLength={500}
                cols={400}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          {SubmissionComponent("github", gitLink, setGitLink)}
          {SubmissionComponent("YT", ytLink, setYTLink)}
          {SubmissionComponent("devmesh", devMeshLink, setDevMeshLink)}
          {SubmissionComponent("pdf", pptLink, setPptLink)}
        </div>

        {/* <div className="text-center justify-center text-xl mt-5">
          Results are published
        </div> */}

        <Button
          className="mx-auto text-md flex justify-center items-center before:ease relative h-12 w-40 overflow-hidden border rounded border-blue-800 bg-blue-800 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-blue-800 hover:before:-translate-x-40 mt-6"
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          <span relative="relative z-10">Submit</span>
        </Button>
      </div>
    </div>
  );
};

export default RoundOneComp;
