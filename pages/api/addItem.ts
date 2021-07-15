// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import firebase from 'firebase'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function addItem(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const ref  = firebase.database().ref('list').child('id')
  const {snapshot} = await ref.transaction(count => {
    
  })
  res.status(200).json({ name: 'John Doe' })
}
