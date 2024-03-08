import { AtSign, GitPullRequestArrow, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <footer className="my-40 w-full text-muted-foreground">
      <div className="flex flex-col items-center p-4 gap-4 text-sm">
        <div className="flex gap-8">
          <Button asChild variant="ghost" size="icon">
            <a href="https://x.com/yoshikouki_">
              <AtSign />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <a href="https://github.com/yoshikouki/engineer-bar">
              <GitPullRequestArrow />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <a href="https://github.com/yoshikouki/engineer-bar/issues/new">
              <MessageCircle />
            </a>
          </Button>
        </div>
        <Button
          asChild
          variant="link"
          size="sm"
          className="text-muted-foreground"
        >
          <a href="https://engineer-bar.connpass.com/">© 2021 Engineer Bar</a>
        </Button>
      </div>
    </footer>
  );
};
