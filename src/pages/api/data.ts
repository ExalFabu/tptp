import { validate } from "@tma.js/init-data-node";
import { parseInitData } from "@tma.js/sdk-react";
import { Collection, MongoClient, ServerApiVersion } from 'mongodb';
import { NextApiRequest, NextApiResponse } from "next";
import { IAppState } from "../../app/store";
const uri = process.env.MONGODB_URL
const token = process.env.BOT_TOKEN

const DB_NAME: string = "TPTP"
const COLLECTION_NAME: string = "TPTP"

interface IDocument {
    user_id: string,
    state: IAppState
}

export type SaveDataRequestBody = {
    state: IAppState
}



const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.method || !uri) {
        return res.status(500).send(JSON.stringify({ msg: "db uri not found" }))
    }
    if (!token) {
        return res.status(500).send(JSON.stringify({ msg: "bot token not found" }))
    }
    if (! await checkAuth(req, res)) {
        return res.status(403).send(JSON.stringify({ msg: "Not authorized" }))
    }

    const data = parseInitData(req.headers.authorization?.replace("tma ", ""))
    const user_id = data.user?.id;
    if (!user_id) {
        return res.status(500).send(JSON.stringify({ msg: "User id not found" }))
    }
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await client.connect();
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME)
        if (req.method === "GET") {
            const result = await getFromDB("" + user_id, collection)
            return res.status(200).send(JSON.stringify(result))
        }
        if (req.method === "PUT") {
            const body = JSON.parse(req.body || "{}")
            if (Object.keys(body).includes("state")) {
                const result = await saveOntoDB("" + user_id, body.state as IAppState, collection)
                return res.status(200).send({})
            }
            else {
                return res.status(401).send(JSON.stringify({ msg: "missing state to save" }))
            }
        }
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
    res.status(200).send({})
}

const checkAuth = async (req: NextApiRequest, _res: NextApiResponse): Promise<boolean> => {
    const auth = req.headers.authorization
    if (!auth || auth.trim().split(" ").length !== 2 || !auth.startsWith("tma")) return false;

    const data = auth.trim().split(" ")[1]
    try {
        validate(data, token!, { expiresIn: 60 * 60 * 3 });
        return true
    } catch (err) {
        return false;
    }
}

const getFromDB = async (user_id: string, collection: Collection): Promise<IAppState | null> => {
    try {
        const res = await collection.findOne({ user_id }) as unknown as IDocument
        console.log(res)
        return res.state
    }
    catch (e) {
        console.error("Error on fetch", e)
        return null
    }
}

const saveOntoDB = async (user_id: string, state: IAppState, collection: Collection): Promise<boolean> => {
    try {
        const query = { user_id: user_id };
        const update = { $set: { state: state } };
        const options = { upsert: true };
        await collection.updateOne(query, update, options)
        return true
    }
    catch (e) {
        console.error("Error on fetch", e)
        return false
    }
}

export default handler