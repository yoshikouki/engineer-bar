import { AtSign, GitPullRequestArrow, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <footer className="my-40 w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-8">
          <Button asChild variant="ghost" size="icon">
            <a
              href="https://x.com/yoshikouki_"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AtSign />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <a
              href="https://github.com/yoshikouki/engineer-bar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitPullRequestArrow />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <a
              href="https://github.com/yoshikouki/engineer-bar/issues/new"
              target="_blank"
              rel="noopener noreferrer"
            >
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
          <a
            href="https://engineer-bar.connpass.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            © 2021 Engineer Bar
          </a>
        </Button>
      </div>
    </footer>
  );
};
