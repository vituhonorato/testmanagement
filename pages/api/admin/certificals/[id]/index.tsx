import { getSession } from "next-auth/react"
import User from "@/models/User";
import db from "@/utils/db";



const handler = async (req:any, res:any) => {
    const session:any = await getSession({ req});
    if (!session || (session && !session.user.isAdmin)){
        return res.status(401).send('signin required');
    }

    // eslint-disable-next-line no-unused-vars
    const { user } = session;
    if(req.method === 'GET'){
        return getHandler(req, res);
    }else if (req.method === 'PUT'){
        return putHandler(req,res);
    }else if (req.method === 'DELETE') {
        return deleteHandler(req, res);
    }else{
        return res.status(400).send({message:'Method not allowed'})
    }
};
const getHandler= async (req:any, res:any) =>{
  await db.connect();
  const user1:any = await User.findById(req.query.id);
  await db.disconnect();
  res.send(user1);
};

const putHandler= async (req:any,res:any) => {
    await db.connect();
    const user1 = await User.findById(req.query.id);
    if (user1){
        user1.certificals.namecertifical = req.body.namecertifical || user1.certificals.namecertifical;
        user1.certificals.slug = req.body.slug || user1.certificals.slug;
        user1.certificals.category = req.body.category || user1.certificals.category;
        user1.certificals.image = req.body.image || user1.certificals.image;
        user1.certificals.date = req.body.data || user1.certificals.date;
        user1.certificals.description = req.body.description || user1.certificals.description;
        user1.certificals.contact = req.body.contact || user1.certificals.contact;
        await user1.save(); 
        await db.disconnect();
        res.send({message: 'user1 updated successfully'})
    }else{
        await db.disconnect();
        res.status(404).send({message:'user1 not found'})
    }
   
};
const deleteHandler = async (req:any, res:any) => {
    await db.connect();
    const user1 = await User.findById(req.query.id);
    if (user1) {
        await user1.deleteOne();
        await db.disconnect();
        res.send({message: 'user deleted successfully'})
    }else{
        await db.disconnect();
        res.status(404).send({ message: 'user not found'})
    }
}
export default handler