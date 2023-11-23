import { Formik } from "formik";
import React, { useRef, useState } from "react";
import { api } from "../../../api";
import UploadIcon from "../../../assets/images/svg/upload-icon";
import useAuth from "../../../hook/auth/useAuth";
import useAxios from "../../../hook/useAxios";
import { set } from "lodash";
interface Props {}

const Profile: React.FC<Props> = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const { sendRequest: uploadRequest } = useAxios();
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileDragState, setFileDragState] = useState<boolean>(false);
  return (
    <div className="profile">
      <div className="profile-content">
        <div className="profile-content-info">
          <h1>帳戶資訊</h1>
          <Formik
            enableReinitialize={true}
            initialValues={
              {
                username: currentUser?.username || "",
                email: currentUser?.email || "",
                phone: currentUser?.phone || "",
                password: undefined,
                confirmPassword: undefined,
              } as {
                username: string;
                email: string;
                phone: string;
                password?: string;
                confirmPassword?: string;
              }
            }
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
                  setCurrentUser({
                    email: response.data.data.email,
                    phone: response.data.data.phone,
                    username: response.data.data.username,
                    isUpload: response.data.data.isUpload,
                  });
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
            initialValues={
              {
                teamName: "",
                teamMember1: "",
                teamMember2: "",
                teamMember3: "",
                teamMember4: "",
                teamMember5: "",
                schoolCertificate: null,
              } as {
                teamName: string;
                teamMember1: string;
                teamMember2: string;
                teamMember3: string;
                teamMember4: string;
                teamMember5: string;
                schoolCertificate: FileList | null;
              }
            }
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
                    value={values.teamMember1}
                    onChange={(e) => {
                      setFieldValue("teamMember1", e.target.value);
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
                    value={values.teamMember2}
                    onChange={(e) => {
                      setFieldValue("teamMember2", e.target.value);
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
                    value={values.teamMember3}
                    onChange={(e) => {
                      setFieldValue("teamMember3", e.target.value);
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
                    value={values.teamMember4}
                    onChange={(e) => {
                      setFieldValue("teamMember4", e.target.value);
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
                    value={values.teamMember5}
                    onChange={(e) => {
                      setFieldValue("teamMember5", e.target.value);
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

                      setFieldValue("schoolCertificate", files);
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
                          "schoolCertificate",
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
                    {values.schoolCertificate &&
                      Array.from(values.schoolCertificate).map(
                        (file, index) => {
                          const localUrl = URL.createObjectURL(file);
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
                                  if (values.schoolCertificate) {
                                    const newFileList = Array.from(
                                      values.schoolCertificate
                                    );
                                    newFileList.splice(index, 1);
                                    setFieldValue(
                                      "schoolCertificate",
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
            initialValues={
              {
                pdfFile: null,
                ytlink: "",
                isUpload: currentUser?.isUpload,
              } as {
                pdfFile: File | null;
                ytlink: string;
                isUpload: boolean;
              }
            }
            onSubmit={(values) => {
              const formData = new FormData();
              formData.append("videoLink", values.ytlink);
              formData.append("pdf", values.pdfFile as File);

              uploadRequest(
                {
                  url: api.uploadFile.url(),
                  method: api.uploadFile.method,
                  data: formData,
                },
                (response) => {
                  setCurrentUser({
                    email: response.data.data.email,
                    phone: response.data.data.phone,
                    username: response.data.data.username,
                    isUpload: response.data.data.isUpload,
                  });
                },
                (error) => {
                  console.log(error);
                }
              );
              console.log(values);
            }}
            validate={(values) => {
              const errors: Partial<{
                pdfFile: string;
                ytlink: string;
              }> = {};
              if (values.pdfFile === null) {
                errors.pdfFile = "Please upload a pdf file";
              }
              if (values.ytlink === "") {
                errors.ytlink = "Please enter a youtube link";
              }

              if (values.ytlink) {
                const youtubeLinkRegex =
                  /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
                if (!youtubeLinkRegex.test(values.ytlink))
                  errors.ytlink = "Youtube link format error";
              }
              if (values.pdfFile && values.pdfFile.type !== "application/pdf")
                errors.pdfFile = "Please upload a pdf file";

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
                      value={values.ytlink}
                      onChange={(e) => {
                        setFieldValue("ytlink", e.target.value);
                      }}
                    />
                    <span>Youtube 影片連結</span>
                    <p className="login-content-body-input-error">
                      {errors.ytlink}
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

                      setFieldValue("pdfFile", files[0]);
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
                        setFieldValue("pdfFile", e.currentTarget.files?.[0]);
                      }}
                    />
                    <UploadIcon className="upload-icon" />
                    <p>
                      {values.pdfFile && !errors.pdfFile
                        ? values.pdfFile.name
                        : "Browse File to upload PDF"}
                    </p>
                    <p className="error">{errors.pdfFile}</p>
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
