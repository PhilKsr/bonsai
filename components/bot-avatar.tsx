import { Avatar, AvatarImage } from "./ui/avatar";

export function BotAvatar() {
  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src="/bonsai.png" className="p-1" />
    </Avatar>
  );
}
