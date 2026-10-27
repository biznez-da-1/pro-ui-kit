export interface FileFilterResult<T extends { name: string; type: string; size: number }> {
  accepted: T[];
  rejectedTypeCount: number;
  rejectedSizeCount: number;
}

export function matchesAcceptedType(
  file: Pick<File, "name" | "type">,
  accept?: string,
): boolean {
  const rules = accept?.split(",").map((rule) => rule.trim().toLowerCase()).filter(Boolean) ?? [];
  if (rules.length === 0) return true;

  const fileName = file.name.toLowerCase();
  const mimeType = file.type.toLowerCase();
  return rules.some((rule) => {
    if (rule.startsWith(".")) return fileName.endsWith(rule);
    if (rule.endsWith("/*")) return mimeType.startsWith(rule.slice(0, -1));
    return mimeType === rule;
  });
}

export function filterAcceptedFiles<T extends { name: string; type: string; size: number }>(
  incoming: T[],
  accept?: string,
  maxSize?: number,
): FileFilterResult<T> {
  const typeAccepted = incoming.filter((file) => matchesAcceptedType(file, accept));
  const rejectedTypeCount = incoming.length - typeAccepted.length;
  const hasValidSizeLimit = typeof maxSize === "number" && Number.isFinite(maxSize) && maxSize >= 0;
  const accepted = hasValidSizeLimit
    ? typeAccepted.filter((file) => file.size <= maxSize)
    : typeAccepted;

  return {
    accepted,
    rejectedTypeCount,
    rejectedSizeCount: typeAccepted.length - accepted.length,
  };
}

export function mergeSelectedFiles<T extends { name: string; size: number; lastModified: number }>(
  current: T[],
  incoming: T[],
  multiple: boolean,
): T[] {
  const uniqueIncoming = incoming.filter((file, index, all) =>
    all.findIndex((candidate) =>
      candidate.name === file.name &&
      candidate.size === file.size &&
      candidate.lastModified === file.lastModified
    ) === index
  );

  if (!multiple) return uniqueIncoming.length > 0 ? uniqueIncoming.slice(0, 1) : current;

  return [
    ...current,
    ...uniqueIncoming.filter((file) => !current.some((existing) =>
      existing.name === file.name &&
      existing.size === file.size &&
      existing.lastModified === file.lastModified
    )),
  ];
}
