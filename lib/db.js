import firebase from '../lib/firebase'

const db = firebase.database()

export function updateUser(uid, data) {
  return db.ref('users').child(uid).update({
    data,
  })
}

export async function getUserData(uid) {
  const res = await db.ref('users').child(uid).get()
  return res.val()
}

export function createUser(uid, data) {
  return db.ref('users').set({
    [uid]: data,
  })
}
