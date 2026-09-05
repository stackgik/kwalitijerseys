import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const getSessionUserId = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  return session.user.id;
};

export { getSessionUserId };
