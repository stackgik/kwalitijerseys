import { auth } from "@/lib/auth";
import { AppError, handleActionError, Result } from "@/lib/error";
import { headers } from "next/headers";

const getSessionUserId = async (): Promise<Result<string>> => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user?.id) {
      throw new AppError("UNAUTHENTICATED", "Please sign in to continue");
    }

    return { success: true, data: session.user.id };
  } catch (error) {
    return handleActionError(error, "getSessionUserId");
  }
};

export { getSessionUserId };
