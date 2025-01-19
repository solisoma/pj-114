export function get_admin_action(
  isVerified: boolean,
  permission: string
): { label: string; value: string }[] {
  const hashTable = [{ label: "Modify balance", value: "balance" }];

  if (isVerified) {
    hashTable.push({ label: "Remove KYC", value: "r-kyc" });
  } else {
    hashTable.push({ label: "Verify KYC", value: "a-kyc" });
  }

  if (permission === "admin") {
    hashTable.push({ label: "Make user", value: "user" });
  } else {
    hashTable.push({ label: "Make admin", value: "admin" });
  }

  return hashTable;
}
