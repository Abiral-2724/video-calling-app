import { Github, Heart, Instagram, Linkedin ,FolderGit2 } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/Abiral-2724",
      icon: <Github className="h-6 w-6" />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/abiral-jain-3b7004256",
      icon: <Linkedin className="h-6 w-6" />,
    },
    {
      name: "Instagram",
      url: "https://instagram.com/abiraljain",
      icon: <Instagram className="h-6 w-6" />,
    },{
        name: "FolderGit2",
      url: "https://github.com/Abiral-2724/video-calling-app.git",
      icon: <FolderGit2 className="h-6 w-6" />,
    }
  ];

  return (
    <div className="flex h-28 w-full flex-col items-center justify-center border-t border-gray-200 px-3 dark:border-neutral-800">
    <span className="text-sm text-white">TalkScape</span>
      <div className="flex flex-row items-center text-center">
        <span className="text-sm text-white">Made with</span>
        <Heart className="mx-1 h-4 w-4 text-red-500 fill-red-500" />
        <span className="text-sm text-white">by Abiral Jain</span>
      </div>
      <div className="mt-4 flex space-x-6">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-colors hover:text-gray-300 dark:text-white dark:hover:text-gray-400"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
