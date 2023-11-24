import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { api } from "../../../api";
import UploadIcon from "../../../assets/images/svg/upload-icon";
import useAuth from "../../../hook/auth/useAuth";
import useAxios from "../../../hook/useAxios";

import PdfPreviewer from "../../pdf-preivewer";
import { ProfileResponse, ProfileType, TeamInfoType, UploadType } from "./type";
import { AxiosResponse } from "axios";

interface Props {}

const Profile: React.FC<Props> = () => {
  const { currentUser } = useAuth();
  const [profileData, setProfileData] = useState<ProfileType>({
    username: "",
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
    teamMember: ["", "", "", "", ""],
    teamSchoolCertificate: [],

    isApplyTeam: false,
  });

  const { sendRequest: uploadRequest } = useAxios();
  const { sendRequest: getProfileRequest } = useAxios();
  const fileRef = useRef<HTMLInputElement>(null);
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
          username: data.username,
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
          teamSchoolCertificate: data.teamSchoolCertificate,

          isApplyTeam: data.isApplyTeam,
        });
      }
    );
  };
  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    console.log(uploadData);
  }, [uploadData]);

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
                    username: values.username,
                    password: values.password,
                  },
                },
                (response) => {
                  console.log(response);
                }
              );
              // console.log(values);
            }}
            validate={(values) => {
              const errors: Partial<{
                username: string;
                email: string;
                phone: string;
                password: string;
                confirmPassword: string;
              }> = {};

              if (values.username === "") errors.username = "Username required";
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
                <div className="profile-content-upload-form-link">
                  <input
                    type="text"
                    value={values.username}
                    onChange={(e) => {
                      setFieldValue("username", e.target.value);
                    }}
                  />
                  <span>Username</span>
                  {/* <p className="login-content-body-input-error">
                      {errors.email}
                    </p> */}
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
                  <span>password</span>
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
          <h1>隊伍資訊</h1>
          <Formik
            enableReinitialize={true}
            initialValues={teamInfoData}
            onSubmit={(values) => {
              console.log(values);

              // uploadRequest(
              //   {
              //     url: api.updateUser.url(),
              //     method: api.updateUser.method,
              //     data: {
              //       email: values.email,
              //       phone: values.phone,
              //       username: values.username,
              //       password: values.password,
              //     },
              //   },
              //   (response) => {
              //     setCurrentUser({
              //       email: response.data.data.email,
              //       phone: response.data.data.phone,
              //       username: response.data.data.username,
              //       isUpload: response.data.data.isUpload,
              //     });
              //   }
              // );
              // console.log(values);
            }}
            validate={(values) => {
              const errors: Partial<{
                username: string;
                email: string;
                phone: string;
                password: string;
                confirmPassword: string;
              }> = {};
              console.log(values);

              return errors;
            }}
          >
            {({ setFieldValue, submitForm, values, errors }) => (
              <form action="" className="profile-content-upload-form">
                {/* <h1 className="profile-content-upload-form-header">已報名</h1> */}
                <div className="profile-content-upload-form-link">
                  <input
                    type="text"
                    value={values.teamName}
                    onChange={() => {}}
                  />
                  <span>TeamName</span>
                </div>
                <div className="profile-content-upload-form-link">
                  <input
                    type="text"
                    value={values.teamMember[0]}
                    onChange={(e) => {
                      const buffer = [...values.teamMember];
                      buffer[0] = e.target.value;
                      setFieldValue("teamMember", buffer);
                    }}
                  />
                  <span>TeamMember1</span>
                  {/* <p className="login-content-body-input-error">
                      {errors.email}
                    </p> */}
                </div>
                <div className="profile-content-upload-form-link">
                  <input
                    type="text"
                    value={values.teamMember[1]}
                    onChange={(e) => {
                      const buffer = [...values.teamMember];
                      buffer[1] = e.target.value;
                      setFieldValue("teamMember", buffer);
                    }}
                  />
                  <span>TeamMember2</span>
                  {/* <p className="login-content-body-input-error">
                      {errors.email}
                    </p> */}
                </div>
                <div className="profile-content-upload-form-link">
                  <input
                    type="text"
                    value={values.teamMember[2]}
                    onChange={(e) => {
                      const buffer = [...values.teamMember];
                      buffer[2] = e.target.value;
                      setFieldValue("teamMember", buffer);
                    }}
                  />
                  <span>TeamMember3</span>
                  {/* <p className="login-content-body-input-error">
                      {errors.email}
                    </p> */}
                </div>
                <div className="profile-content-upload-form-link">
                  <input
                    type="text"
                    value={values.teamMember[3]}
                    onChange={(e) => {
                      const buffer = [...values.teamMember];
                      buffer[3] = e.target.value;
                      setFieldValue("teamMember", buffer);
                    }}
                  />
                  <span>TeamMember4</span>
                  {/* <p className="login-content-body-input-error">
                      {errors.email}
                    </p> */}
                </div>
                <div className="profile-content-upload-form-link">
                  <input
                    type="text"
                    value={values.teamMember[4]}
                    onChange={(e) => {
                      const buffer = [...values.teamMember];
                      buffer[4] = e.target.value;
                      setFieldValue("teamMember", buffer);
                    }}
                  />
                  <span>TeamMember5</span>
                  {/* <p className="login-content-body-input-error">
                      {errors.email}
                    </p> */}
                </div>
                <div className="profile-content-upload-form-link">
                  <div
                    className={`profile-content-upload-form-fileimg ${
                      fileDragState ? "upload-drag" : ""
                    }`}
                    onClick={() => {
                      fileRef.current?.click();
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
                      ref={fileRef}
                      name="pdfFile"
                      hidden
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
                              <img src={localUrl} alt="" />
                            </div>
                          );
                        }
                      )}
                  </div>

                  {/* <p className="error">{errors.pdfFile}</p> */}

                  {/* <p className="login-content-body-input-error">
                      {errors.email}
                    </p> */}
                </div>
                <p className="login-content-body-input-error">
                  {"報名後不可更改"}
                </p>
                {/* <div className="profile-content-upload-form-link">
                  <input type="text" value={values.email} />
                  <span>Email</span>
                  <p className="login-content-body-input-error">
                      {errors.email}
                    </p> 
                </div> */}

                <button
                  className="profile-content-upload-form-button"
                  onClick={(e) => {
                    e.preventDefault();
                    submitForm();
                  }}
                >
                  確認報名
                </button>
              </form>
            )}
          </Formik>
        </div>
        <div className="profile-content-upload">
          <h1>檔案上傳</h1>
          <Formik
            enableReinitialize={true}
            initialValues={uploadData}
            onSubmit={(values) => {
              const formData = new FormData();
              formData.append("videoLink", values.workVideoLink);
              formData.append("pdf", values.workPdf as File);

              // uploadRequest(
              //   {
              //     url: api.uploadFile.url(),
              //     method: api.uploadFile.method,
              //     data: formData,
              //   },
              //   (response) => {
              //     setCurrentUser({
              //       email: response.data.data.email,
              //       phone: response.data.data.phone,
              //       username: response.data.data.username,
              //       isUpload: response.data.data.isUpload,
              //     });
              //   },
              //   (error) => {
              //     console.log(error);
              //   }
              // );
              console.log(values);
            }}
            validate={(values) => {
              const errors: Partial<{
                workPdf: string;
                workVideoLink: string;
              }> = {};
              if (values.workPdf === null) {
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
                      fileRef.current?.click();
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
                      ref={fileRef}
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
                    確認上傳
                  </button>
                  {true && (
                    <div className="profile-content-upload-form-pdf-preview">
                      <h1>文件預覽</h1>
                      <PdfPreviewer
                        prfUrl={values.workPdf || values.workPdfUrl}
                      />
                    </div>
                  )}
                </>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default Profile;
