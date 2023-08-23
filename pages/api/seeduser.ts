
import User from "@/models/User";


import dataUser from "@/utils/dataUser";
import db from "@/utils/db"

const handler = async (req:any, res:any) => {
  await db.connect();
  await User.insertMany(dataUser.users);

  await db.disconnect();
  res.send({message: 'seeded successfully'})

};
export default handler;