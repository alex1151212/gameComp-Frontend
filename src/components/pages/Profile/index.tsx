import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { api } from "../../../api";
import UploadIcon from "../../../assets/images/svg/upload-icon";
import useAuth from "../../../hook/auth/useAuth";
import useAxios from "../../../hook/useAxios";

interface Props {}

const Profile: React.FC<Props> = () => {
  const { currentUser } = useAuth();
  const { sendRequest: uploadRequest } = useAxios();
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileDragState, setFileDragState] = useState<boolean>(false);
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);
  return (
    <div className="profile">
      <div className="profile-content">
        <div className="profile-content-info">
          <h1>個人資訊</h1>
          <Formik
            initialValues={
              {
                username: currentUser?.username || "",
                email: currentUser?.email || "",
                phone: currentUser?.phone || "",
                password: "",
                confirmPassword: "",
              } as {
                username: string;
                email: string;
                phone: string;
                password: string;
                confirmPassword: string;
              }
            }
            onSubmit={(values) => {
              // const formData = new FormData();
              // formData.append("videoLink", values.ytlink);
              // formData.append("pdf", values.pdfFile as File);
              // uploadRequest(
              //   {
              //     url: api.uploadFile.url(),
              //     method: api.uploadFile.method,
              //     data: formData,
              //   },
              //   (response) => {
              //     console.log(response);
              //   },
              //   (error) => {
              //     console.log(error);
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

              if (values.confirmPassword === values.password)
                errors.confirmPassword = "confirm password not match";

              return errors;
            }}
          >
            {({ setFieldValue, submitForm, values, errors }) => (
              <form action="" className="profile-content-upload-form">
                {/* <h1 className="profile-content-upload-form-header">更新</h1> */}
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
                <div className="profile-content-upload-form-link">
                  <input
                    type="text"
                    value={values.email}
                    onChange={(e) => {
                      setFieldValue("email", e.target.value);
                    }}
                  />
                  <span>Email</span>
                  {/* <p className="login-content-body-input-error">
                      {errors.email}
                    </p> */}
                </div>
                <div className="profile-content-upload-form-link">
                  <input
                    type="text"
                    value={values.phone}
                    onChange={(e) => {
                      setFieldValue("phone", e.target.value);
                    }}
                  />
                  <span>Phone</span>
                  {/* <p className="login-content-body-input-error">
                      {errors.email}
                    </p> */}
                </div>
                <div className="profile-content-upload-form-link">
                  <input
                    type="text"
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
                    type="text"
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
        <div className="profile-content-upload">
          <h1>檔案上傳</h1>
          <Formik
            initialValues={
              { pdfFile: null, ytlink: "" } as {
                pdfFile: File | null;
                ytlink: string;
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
                  console.log(response);
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
              if (values.pdfFile && values.pdfFile.type !== "application/pdf")
                errors.pdfFile = "Please upload a pdf file";

              return errors;
            }}
          >
            {({ setFieldValue, submitForm, values, errors }) => (
              <form action="" className="profile-content-upload-form">
                {/* <h1 className="profile-content-upload-form-header">上傳</h1> */}
                <div className="profile-content-upload-form-link">
                  <input
                    type="text"
                    value={values.ytlink}
                    onChange={(e) => {
                      setFieldValue("ytlink", e.target.value);
                    }}
                  />
                  <span>Youtube 影片連結</span>
                  {/* <p className="login-content-body-input-error">
                      {errors.email}
                    </p> */}
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
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default Profile;
