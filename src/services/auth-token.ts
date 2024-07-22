'use server'

import { cookies } from 'next/headers'

export async function getAccessToken() {
  'use server'
  return await cookies().get("token")?.value;
}

export async function setAccessToken(token:string) {
  'use server'
  console.log({ token });
  cookies().set("token", token);
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
  cookies().set("userId", userId);
}

export async function removeUserId() {
  'use server'
  cookies().delete("userId");
}