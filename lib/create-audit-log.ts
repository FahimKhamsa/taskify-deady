import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { auth, currentUser } from "@clerk/nextjs/server";

import { db } from "./db";

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

export const createAuditLog = async (props: Props) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!user || !orgId) {
      throw new Error("User not found!");
    }

    const { entityId, entityType, entityTitle, action } = props;

    await db.auditLog.create({
      data: {
        orgId,
        entityId,
        entityTitle,
        entityType,
        action,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: `${user.firstName ? user.firstName : ""} ${
          user.lastName ? user.lastName : ""
        }`,
      },
    });
  } catch (error) {
    console.log("[AUDIT_LOG_ERROR", error);
  }
};
