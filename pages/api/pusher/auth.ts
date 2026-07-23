import { currentProfilePages } from "@/lib/current-profile-pages";
import { pusherServer } from "@/lib/pusher";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const profile = await currentProfilePages(req);

    if (!profile) {
        return res.status(401).json({ error: "Un-authorized , Not signed in" });
    }

    const socketId = await req.body.socket_id;
    const channel = await req.body.channel_name;
    const data = {
        // user_id must match profile.id so presence member.id === profileId
        user_id: profile.id,
        user_info: {
            name: profile.name,
            imageUrl: profile.imageUrl,
        },
    };

    const authResponse = pusherServer.authorizeChannel(socketId, channel, data);

    return res.send(authResponse);
}
