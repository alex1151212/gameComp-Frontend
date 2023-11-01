import { Formik } from "formik";
import React, { useRef } from "react";
import UploadIcon from "../../assets/images/svg/upload-icon";

interface Props {}

const Upload: React.FC<Props> = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <div className="upload">
      <div className="upload-content">
        <h1>檔案上傳</h1>
        <Formik
          initialValues={{ pdfFile: null, ytlink: "" }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ setFieldValue, submitForm }) => (
            <form action="" className="upload-content-form">
              <h1 className="upload-content-form-header">Upload</h1>
              <div className="upload-content-form-link">
                <input
                  type="text"
                  required
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
                className="upload-content-form-file"
                onClick={() => {
                  fileRef.current?.click();
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
                <p>Borwse File to upload PDF</p>
              </div>

              <button
                className="upload-content-form-button"
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

      {/* <div className="progress-area">
        <li>
          <i></i>
          <div className="content">
            <div className="details">
              <span className="name">image_01.png ● Uploading </span>
              <span className="parent">50%</span>
            </div>
            <div className="progress-bar">
              <div className="progress"></div>
            </div>
          </div>
        </li>
      </div> */}
    </div>
  );
};
export default Upload;
