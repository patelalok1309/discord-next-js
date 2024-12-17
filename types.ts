import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Member, Profile, Server } from "@prisma/client";

export type ServerWithMembersWithProfiles = Server & {
    members: (Member & { profile: Profile })[];
};