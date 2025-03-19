export type AuthorRoleType = "teacher" | "student" | "normal";

export interface AuthorDataType {
  username: string;
  full_name: string | null;
  avatar: string | null;
  role?: AuthorRoleType;
  specialty?: string;
  bio?: string;
  id?: number;
  followed?: boolean;
}
