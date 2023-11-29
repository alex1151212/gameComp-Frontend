import { Response } from "../../../utils/common-types";

export interface UploadRequest {
  ytLink: string;
  pdfFile: File;
}
export type UploadResponse = Response<{
  token: string;
}>;

export type ProfileResponse = Response<{
  email: string;
  username: string;
  phone: string;
  teamName: string;
  teamMember: TeamMemberType[] | null;
  teamTeacher: TeamTeacherType[] | null;
  teamSchoolCertificate: string[];
  workVideoLink: string;
  workPdf: string;

  isUpload: boolean;
  isApplyTeam: boolean;
}>;

export interface ProfileType {
  email: string;
  phone: string;
  password?: string;
  confirmPassword?: string;
}
export interface TeamInfoType {
  teamName: string;
  teamTeacher: TeamTeacherType[];
  teamMember: string[];
  teamSchoolCertificate: (string | File)[];

  isApplyTeam: boolean;
}
export interface UploadType {
  workVideoLink: string;
  workPdf: File | undefined;

  workPdfUrl: string;

  isUpload: boolean;
}

export interface TeamMemberType {
  name: string;
}
export interface TeamTeacherType {
  name: string;
  jobTitle: string;
}
