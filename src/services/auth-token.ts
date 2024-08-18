'use server'

import { cookies } from 'next/headers'

export async function getAccessToken() {
  'use server'
  return await cookies().get("token")?.value;
}

export async function setAccessToken(token:string) {
  'use server'
  cookies().set("token", token, { httpOnly: true });
}

export async function removeAccessToken() {
  'use server'
  cookies().delete("token");
}

export async function getUserId() {
  'use server'
  return await cookies().get("userId")?.value;
}

export async function setUserId(userId:string) {
  'use server'
  cookies().set("userId", userId, { httpOnly: true });
}

export async function removeUserId() {
  'use server'
  cookies().delete("userId");
}

export async function getUserRole() {
  'use server'
  return cookies().get("role")?.value;
}

export async function setUserRole(userRole:string) {
  'use server'
  cookies().set("role", userRole, { httpOnly: true });
}

export async function removeUserRole() {
  'use server'
  cookies().delete("role");
}