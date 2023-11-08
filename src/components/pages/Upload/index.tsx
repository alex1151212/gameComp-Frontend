import { Formik } from "formik";
import React, { useRef, useState } from "react";
import { api } from "../../../api";
import UploadIcon from "../../../assets/images/svg/upload-icon";
import useAxios from "../../../hook/useAxios";

interface Props {}

const Upload: React.FC<Props> = () => {
  const { sendRequest: uploadRequest } = useAxios();
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileDragState, setFileDragState] = useState<boolean>(false);
  return (
    <div className="upload">
      <div className="upload-content">
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

            if (values.pdfFile && values.pdfFile.type !== "application/pdf")
              errors.pdfFile = "Please upload a pdf file";

            return errors;
          }}
        >
          {({ setFieldValue, submitForm, values, errors }) => (
            <form action="" className="upload-content-form">
              <h1 className="upload-content-form-header">Upload</h1>
              <div className="upload-content-form-link">
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
                className={`upload-content-form-file ${
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
                    : "Borwse File to upload PDF"}
                </p>
                <p className="error">{errors.pdfFile}</p>
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
    </div>
  );
};
export default Upload;
