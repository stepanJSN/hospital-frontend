'use server'

import { cookies } from 'next/headers'

export async function getAccessToken() {
  'use server'
  return await cookies().get("token")?.value;
}

export async function setAccessToken(token:string) {
  'use server'
  cookies().set("token", token);
}

export async function removeAccessToken() {
  'use server'
  cookies().delete("token");
}