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
  teamMember: TeamMemberType[];
  teamTeacher: TeamTeacherType;
  teamSchoolCertificate: string[];
  workVideoLink: string;
  workPdf: string;

  isUpload: boolean;
  isApplyTeam: boolean;
}>;

export interface ProfileType {
  email: string;
  username: string;
  phone: string;
  password?: string;
  confirmPassword?: string;
}
export interface TeamInfoType {
  teamName: string;
  teamTeacherName: string;
  teamTeacherJobTitle: string;
  teamMember: string[];
  teamSchoolCertificate: string[];

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
