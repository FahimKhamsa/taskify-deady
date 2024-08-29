import { ACTION, AuditLog } from "@prisma/client";

export const generateLogMessage = (log: AuditLog) => {
  const { action, entityTitle, entityType } = log;

  return `${action.toLowerCase()}d ${entityType.toLowerCase()} "${entityTitle}"`;
};
