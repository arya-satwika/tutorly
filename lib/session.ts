'server-only'
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { getUserById } from './db/queries';
import { get } from 'http';
import { create } from 'domain';

export interface SessionPayload {
    userId: number;
    name: string;
}

const sessionSecret = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(sessionSecret)
 
export async function encrypt(payload:SessionPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}

export async function createSession(userId: number, name: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt({ userId, name })
    const cookieStore = await cookies()
    console.log(session);
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export async function getUserId(){
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    return { userId: session?.userId, name: session?.name }
}

// export async function verifySession(userId:number, name:string){
//     const cookie = (await cookies()).get('session')?.value
//     if(!cookie){
//       createSession( userId, name )
//       console.log("created new session for: " + name)
//     } 
//     const session = await decrypt(cookie)
//     if (session){
//       updateSession(session)
//     }


//     return true
// }

export async function deleteSession(){
    const cookieStore = await cookies()
    cookieStore.delete('session');
}

export async function updateSession( session: string ) {
  // const session = (await cookies()).get('session')?.value
  const payload = await decrypt(session)
 
  if (!session || !payload) {
    return null
  }
 
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
 
  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}