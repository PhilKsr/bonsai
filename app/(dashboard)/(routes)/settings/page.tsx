import Heading from "@/components/heading";
import SubscriptionButton from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";

export default async function SettingsPage() {
  const hasProPlan = await checkSubscription();

  return (
    <div>
      <Heading
        title="Settings"
        description="Manage account settings."
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />

      <div className="px-4 space-y-4 lg:px-8">
        <div className="text-sm text-muted-foreground">
          {hasProPlan
            ? "You are currently on a pro plan."
            : "You are currently on a free plan."}
        </div>

        <SubscriptionButton isPro={hasProPlan} />
      </div>
    </div>
  );
}
