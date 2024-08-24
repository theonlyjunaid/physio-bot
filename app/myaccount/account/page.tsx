import { Separator } from "@/components/ui/separator";
import { AccountForm } from "./account-form";
import { getLoggedInUser, getUserData } from "@/lib/server/appwrite";

export default async function SettingsAccountPage() {
  const user = await getUserData();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Separator />
      <AccountForm user={user} />
    </div>
  );
}
