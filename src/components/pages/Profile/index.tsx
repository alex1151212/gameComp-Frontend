import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { api } from "../../../api";
import UploadIcon from "../../../assets/images/svg/upload-icon";
import useAuth from "../../../hook/auth/useAuth";
import useAxios from "../../../hook/useAxios";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import PdfPreviewer from "../../pdf-preivewer";
import { ProfileResponse, ProfileType, TeamInfoType, UploadType } from "./type";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

interface Props {}

const Profile: React.FC<Props> = () => {
  const { currentUser } = useAuth();
  const [profileData, setProfileData] = useState<ProfileType>({
    email: "",
    phone: "",
    password: undefined,
    confirmPassword: undefined,
  });
  const [uploadData, setUploadData] = useState<UploadType>({
    workVideoLink: "",
    workPdf: undefined,
    workPdfUrl: "",

    isUpload: false,
  });
  const [teamInfoData, setTeamInfoData] = useState<TeamInfoType>({
    teamName: "",
    teamTeacher: [{ name: "", jobTitle: "" }],
    teamMember: [""],
    teamSchoolCertificate: [],

    isApplyTeam: false,
  });

  const { sendRequest: uploadRequest } = useAxios();
  const { sendRequest: getProfileRequest } = useAxios();
  const imgFileRef = useRef<HTMLInputElement>(null);
  const pdfFileRef = useRef<HTMLInputElement>(null);
  const [fileDragState, setFileDragState] = useState<boolean>(false);

  const getProfile = () => {
    getProfileRequest(
      {
        url: api.getProfile.url(),
        method: api.getProfile.method,
      },
      (response: AxiosResponse<ProfileResponse>) => {
        const { data } = response.data;
        setProfileData({
          email: data.email,
          phone: data.phone,
          password: "",
          confirmPassword: "",
        });
        setUploadData({
          workPdf: undefined,
          workPdfUrl: data.workPdf,
          workVideoLink: data.workVideoLink,

          isUpload: data.isUpload,
        });
        setTeamInfoData({
          teamName: data.teamName,
          teamMember: data.teamMember.map((member) => member.name),
          teamTeacher: data.teamTeacher,
          teamSchoolCertificate: data.teamSchoolCertificate,

          isApplyTeam: data.isApplyTeam,
        });
      }
    );
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="profile">
      <div className="profile-content">
        <div className="profile-content-info">
          <h1>帳戶資訊</h1>
          <Formik
            enableReinitialize={true}
            initialValues={profileData}
            onSubmit={(values) => {
              uploadRequest(
                {
                  url: api.updateUser.url(),
                  method: api.updateUser.method,
                  data: {
                    email: values.email,
                    phone: values.phone,
                    password: values.password,
                  },
                },
                () => {
                  toast.success("更新成功", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
                  getProfile();
                },
                (error) => {
                  toast.error("更新失敗", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
                  console.log(error);
                }
              );
            }}
            validate={(values) => {
              const errors: Partial<{
                email: string;
                phone: string;
                password: string;
                confirmPassword: string;
              }> = {};

              if (values.email === "") errors.email = "Email required";
              if (values.phone === "") errors.phone = "Phone required";
              if (values.phone) {
                const taiwanPhoneNumberRegex = /^(09|\+8869)\d{8}$/;
                if (!taiwanPhoneNumberRegex.test(values.phone))
                  errors.phone = "Phone number format error";
              }
              if (values.confirmPassword !== values.password)
                errors.confirmPassword = "confirm password not match";

              return errors;
            }}
          >
            {({ setFieldValue, submitForm, values, errors }) => (
              <form action="" className="profile-content-upload-form">
                {/* <h1 className="profile-content-upload-form-header">更新</h1> */}
                <div className="profile-content-upload-form-link">
                  <input type="text" value={values.email} onChange={() => {}} />
                  <span>Email</span>
                  <p className="login-content-body-input-error">{"不可更改"}</p>
                </div>
                {/* <div className="profile-content-upload-form-link">
                  <input type="text" value={values.email} />
                  <span>Email</span>
                  <p className="login-content-body-input-error">
                      {errors.email}
                    </p> 
                </div> */}
                <div className="profile-content-upload-form-link">
                  <input
                    type="text"
                    value={values.phone}
                    onChange={(e) => {
                      setFieldValue("phone", e.target.value);
                    }}
                  />
                  <span>Phone</span>
                  <p className="login-content-body-input-error">
                    {errors.phone}
                  </p>
                </div>
                <div className="profile-content-upload-form-link">
                  <input
                    type="password"
                    value={values.password}
                    onChange={(e) => {
                      setFieldValue("password", e.target.value);
                    }}
                  />
                  <span>Password</span>
                  {/* <p className="login-content-body-input-error">
                      {errors.email}
                    </p> */}
                </div>
                <div className="profile-content-upload-form-link">
                  <input
                    type="password"
                    value={values.confirmPassword}
                    onChange={(e) => {
                      setFieldValue("confirmPassword", e.target.value);
                    }}
                  />
                  <span>confirm password</span>
                  <p className="login-content-body-input-error">
                    {errors.confirmPassword}
                  </p>
                </div>
                <button
                  className="profile-content-upload-form-button"
                  onClick={(e) => {
                    e.preventDefault();
                    submitForm();
                  }}
                >
                  確認更新
                </button>
              </form>
            )}
          </Formik>
        </div>
        <div className="profile-content-teaminfo">
          <h1>隊伍報名資訊</h1>
          <Formik
            enableReinitialize={true}
            initialValues={teamInfoData}
            onSubmit={(values) => {
              const formData = new FormData();
              formData.append("teamName", values.teamName);

              formData.append(
                "teamMember",
                JSON.stringify(
                  values.teamMember
                    .filter((member) => member != "")
                    .map((member) => ({ name: member }))
                )
              );
              formData.append(
                "teamTeacher",
                JSON.stringify(values.teamTeacher)
              );

              for (let i = 0; i < values.teamSchoolCertificate.length; i++) {
                formData.append(
                  "teamSchoolCertificate[]",
                  values.teamSchoolCertificate[i]
                );
              }
              uploadRequest(
                {
                  url: api.teamApply.url(),
                  method: api.teamApply.method,
                  data: formData,
                },
                () => {
                  toast.success(values.isApplyTeam ? "修改成功" : "報名成功", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
                  getProfile();
                },
                () => {
                  toast.error("報名失敗", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
                }
              );
            }}
            validate={(values) => {
              const errors: Partial<{
                teamName: string;
                teamMember: string;
                teamTeacher: string;
                teamSchoolCertificate: string;
              }> = {};

              if (values.teamName === "") errors.teamName = "TeamName required";
              if (values.teamMember.length < 1)
                errors.teamMember = "TeamMember required";
              if (values.teamSchoolCertificate.length < 1)
                errors.teamSchoolCertificate = "TeamSchoolCertificate required";

              return errors;
            }}
          >
            {({ setFieldValue, submitForm, values, errors }) => (
              <form action="" className="profile-content-upload-form">
                <h1 className="profile-content-upload-form-header">
                  {values.isApplyTeam ? "已報名" : "尚未報名"}
                </h1>
                <div className="profile-content-upload-form-link">
                  <input
                    type="text"
                    value={values.teamName}
                    onMouseDown={(e) => {
                      if (values.isApplyTeam) e.preventDefault();
                    }}
                    onFocus={(e) => {
                      if (values.isApplyTeam) e.target.blur();
                    }}
                    onChange={(e) => {
                      setFieldValue("teamName", e.target.value);
                    }}
                  />
                  <span>隊伍名稱</span>
                </div>
                {values.teamTeacher.map((_, index) => (
                  <div className="profile-content-upload-form-add-input">
                    <div className="profile-content-upload-form-row">
                      <div className="profile-content-upload-form-link">
                        <input
                          type="text"
                          value={values.teamTeacher[index].name}
                          onMouseDown={(e) => {
                            if (values.isApplyTeam) e.preventDefault();
                          }}
                          onFocus={(e) => {
                            if (values.isApplyTeam) e.target.blur();
                          }}
                          onChange={(e) => {
                            const buffer = [...values.teamTeacher];
                            buffer[`${index}`].name = e.target.value;
                            setFieldValue("teamTeacher", buffer);
                          }}
                        />
                        <span>指導老師{index + 1}</span>
                        <p className="login-content-body-input-error">
                          {errors.teamMember}
                        </p>
                      </div>
                      <div className="profile-content-upload-form-link">
                        <input
                          type="text"
                          value={values.teamTeacher[index].jobTitle}
                          onMouseDown={(e) => {
                            if (values.isApplyTeam) e.preventDefault();
                          }}
                          onFocus={(e) => {
                            if (values.isApplyTeam) e.target.blur();
                          }}
                          onChange={(e) => {
                            const buffer = [...values.teamTeacher];
                            buffer[`${index}`].jobTitle = e.target.value;
                            setFieldValue("teamTeacher", buffer);
                          }}
                        />
                        <span>老師職稱</span>
                        <p className="login-content-body-input-error">
                          {errors.teamMember}
                        </p>
                      </div>
                    </div>
                    {!values.isApplyTeam && (
                      <>
                        {values.teamTeacher.length === index + 1 && (
                          <p
                            className="profile-content-upload-form-add-input-icon"
                            data-action={"add"}
                            onClick={() => {
                              const buffer = [...values.teamTeacher];
                              buffer.push({ name: "", jobTitle: "" });
                              setFieldValue("teamTeacher", buffer);
                            }}
                          >
                            <IoMdAdd />
                          </p>
                        )}
                        {values.teamTeacher.length > 1 &&
                          values.teamTeacher.length !== index + 1 && (
                            <p
                              className="profile-content-upload-form-add-input-icon"
                              data-action={"delete"}
                              onClick={() => {
                                const buffer = [...values.teamTeacher];
                                buffer.splice(index, 1);
                                setFieldValue("teamTeacher", buffer);
                              }}
                            >
                              <MdDeleteOutline />
                            </p>
                          )}
                      </>
                    )}
                  </div>
                ))}
                {values.teamMember.map((_, index) => {
                  return (
                    <div className="profile-content-upload-form-add-input">
                      <div className="profile-content-upload-form-link">
                        <input
                          type="text"
                          value={values.teamMember[`${index}`]}
                          onMouseDown={(e) => {
                            if (values.isApplyTeam) e.preventDefault();
                          }}
                          onFocus={(e) => {
                            if (values.isApplyTeam) e.target.blur();
                          }}
                          onChange={(e) => {
                            const buffer = [...values.teamMember];
                            buffer[`${index}`] = e.target.value;
                            setFieldValue("teamMember", buffer);
                          }}
                        />
                        <span>{index === 0 ? "領隊" : `隊員${index}`}</span>
                        <p className="login-content-body-input-error">
                          {errors.teamMember}
                        </p>
                      </div>
                      {!values.isApplyTeam && (
                        <>
                          {" "}
                          {values.teamMember.length === index + 1 && (
                            <p
                              className="profile-content-upload-form-add-input-icon"
                              data-action={"add"}
                              onClick={() => {
                                const buffer = [...values.teamMember];
                                buffer.push("");
                                setFieldValue("teamMember", buffer);
                              }}
                            >
                              <IoMdAdd />
                            </p>
                          )}
                          {values.teamMember.length > 1 &&
                            values.teamMember.length !== index + 1 && (
                              <p
                                className="profile-content-upload-form-add-input-icon"
                                data-action={"delete"}
                                onClick={() => {
                                  const buffer = [...values.teamMember];
                                  buffer.splice(index, 1);
                                  setFieldValue("teamMember", buffer);
                                }}
                              >
                                <MdDeleteOutline />
                              </p>
                            )}
                        </>
                      )}
                    </div>
                  );
                })}

                <div className="profile-content-upload-form-link">
                  <div
                    className={`profile-content-upload-form-fileimg ${
                      fileDragState ? "upload-drag" : ""
                    }`}
                    onClick={() => {
                      imgFileRef.current?.click();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setFileDragState(false);

                      const dt = e.dataTransfer;
                      const files = dt.files;

                      setFieldValue("teamSchoolCertificate", files);
                    }}
                    onDragEnter={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDragOver={(e) => {
                      setFileDragState(true);
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDragLeave={() => {
                      setFileDragState(false);
                    }}
                  >
                    <input
                      type="file"
                      ref={imgFileRef}
                      name="pdfFile"
                      hidden
                      multiple={true}
                      onChange={(e) => {
                        setFieldValue(
                          "teamSchoolCertificate",
                          e.currentTarget.files
                        );
                      }}
                    />
                    <UploadIcon className="upload-icon" />
                    <p>上傳學生證正反面或在學證明</p>
                    {/* <p className="error">{errors.pdfFile}</p> */}
                  </div>
                  {/* <p className="login-content-body-input-error">
                      {errors.email}
                    </p> */}
                </div>
                <div className="profile-content-upload-form-link">
                  <div className="profile-content-upload-form-img-preview-wrapper">
                    {values.teamSchoolCertificate &&
                      Array.from(values.teamSchoolCertificate).map(
                        (file, index) => {
                          let localUrl;
                          if (typeof file === "string") {
                            localUrl = file;
                          } else {
                            localUrl = URL.createObjectURL(file);
                          }

                          return (
                            <div
                              className={`profile-content-upload-form-img-preview`}
                              onClick={() => {
                                // fileRef.current?.click();
                              }}
                              key={localUrl}
                            >
                              {!values.isApplyTeam && (
                                <p
                                  className="close"
                                  onClick={() => {
                                    if (values.teamSchoolCertificate) {
                                      const newFileList = Array.from(
                                        values.teamSchoolCertificate
                                      );
                                      newFileList.splice(index, 1);
                                      setFieldValue(
                                        "teamSchoolCertificate",
                                        newFileList
                                      );
                                    }
                                  }}
                                >
                                  ×
                                </p>
                              )}

                              <img src={localUrl} alt="" />
                            </div>
                          );
                        }
                      )}
                  </div>
                  <p className="login-content-body-input-error">
                    {errors.teamSchoolCertificate}
                  </p>
                </div>
                {!values.isApplyTeam && (
                  <p className="login-content-body-input-error">
                    {"報名後不可更改"}
                  </p>
                )}

                <button
                  className="profile-content-upload-form-button"
                  onClick={(e) => {
                    e.preventDefault();
                    submitForm();
                  }}
                >
                  {values.isApplyTeam ? "再次上傳" : "確認報名"}
                </button>
              </form>
            )}
          </Formik>
        </div>
        {teamInfoData.isApplyTeam && (
          <div className="profile-content-upload">
            <h1>檔案上傳</h1>
            <Formik
              enableReinitialize={true}
              initialValues={uploadData}
              onSubmit={(values) => {
                const formData = new FormData();
                formData.append("workVideoLink", values.workVideoLink);
                formData.append("workPdf", values.workPdf as File);

                uploadRequest(
                  {
                    url: api.uploadFile.url(),
                    method: api.uploadFile.method,
                    data: formData,
                  },
                  () => {
                    toast.success("檔案上傳成功", {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                    });
                    getProfile();
                  },
                  (error) => {
                    console.log(error);
                    toast.error("檔案上傳失敗", {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                    });
                  }
                );
                console.log(values);
              }}
              validate={(values) => {
                const errors: Partial<{
                  workPdf: string;
                  workVideoLink: string;
                }> = {};
                console.log(values.workPdf);

                if (values.workPdf === null || values.workPdf === undefined) {
                  errors.workPdf = "Please upload a pdf file";
                }
                if (values.workVideoLink === "") {
                  errors.workVideoLink = "Please enter a youtube link";
                }

                if (values.workVideoLink) {
                  const youtubeLinkRegex =
                    /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
                  if (!youtubeLinkRegex.test(values.workVideoLink))
                    errors.workVideoLink = "Youtube link format error";
                }
                if (values.workPdf && values.workPdf.type !== "application/pdf")
                  errors.workPdf = "Please upload a pdf file";

                return errors;
              }}
            >
              {({ setFieldValue, submitForm, values, errors }) => (
                <form action="" className="profile-content-upload-form">
                  <>
                    <h1>
                      {currentUser?.isUpload || values.isUpload ? "已上傳" : ""}
                    </h1>
                    <div className="profile-content-upload-form-link">
                      <input
                        type="text"
                        value={values.workVideoLink}
                        onChange={(e) => {
                          setFieldValue("workVideoLink", e.target.value);
                        }}
                      />
                      <span>Youtube 影片連結</span>
                      <p className="login-content-body-input-error">
                        {errors.workVideoLink}
                      </p>
                    </div>
                    <div
                      className={`profile-content-upload-form-file ${
                        fileDragState ? "upload-drag" : ""
                      }`}
                      onClick={() => {
                        pdfFileRef.current?.click();
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setFileDragState(false);

                        const dt = e.dataTransfer;
                        const files = dt.files;

                        setFieldValue("workPdf", files[0]);
                      }}
                      onDragEnter={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onDragOver={(e) => {
                        setFileDragState(true);
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onDragLeave={() => {
                        setFileDragState(false);
                      }}
                    >
                      <input
                        type="file"
                        ref={pdfFileRef}
                        name="workPdf"
                        hidden
                        onChange={(e) => {
                          setFieldValue("workPdf", e.currentTarget.files?.[0]);
                        }}
                      />
                      <UploadIcon className="upload-icon" />
                      <p>
                        {values.workPdf && !errors.workPdf
                          ? values.workPdf.name
                          : "Browse File to upload PDF"}
                      </p>
                      <p className="error">{errors.workPdf}</p>
                    </div>

                    <button
                      className="profile-content-upload-form-button"
                      onClick={(e) => {
                        e.preventDefault();
                        submitForm();
                      }}
                    >
                      {values.isUpload ? "再次上傳" : "確認上傳"}
                    </button>
                    {true && (
                      <div className="profile-content-upload-form-pdf-preview">
                        <h1>文件預覽</h1>
                        {values.workPdf || values.workPdfUrl ? (
                          <PdfPreviewer
                            prfUrl={values.workPdf || values.workPdfUrl}
                          />
                        ) : (
                          <>
                            <h3>尚未上傳PDF</h3>
                          </>
                        )}
                      </div>
                    )}
                  </>
                </form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};
export default Profile;
