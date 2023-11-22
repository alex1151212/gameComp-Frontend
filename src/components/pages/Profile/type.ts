import { Response } from "../../../utils/common-types";

export interface UploadRequest {
  ytLink: string;
  pdfFile: File;
}
export type UploadResponse = Response<{
  token: string;
}>;
