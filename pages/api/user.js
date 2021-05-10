import { auth } from '../../lib/firebase-admin'

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token)
    res.status(200).json({ uid })
  } catch (err) {
    res.status(401).json({ err })
  }
}
