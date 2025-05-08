import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Social } from "./socials";

interface CardWrapperProps {
  backButtonLabel: string;
  backButtonHref: string;
  headerLabel: string;
  headerDescription: string;
  children: React.ReactNode;
}

export const CardWrapper = ({
  children,
  backButtonLabel,
  backButtonHref,
  headerLabel,
  headerDescription,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-sm mr-20">
      <CardHeader>
        <CardTitle className="text-center">{headerLabel}</CardTitle>
        <CardDescription className="text-center">
          {headerDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Social />
      </CardFooter>
      <CardFooter>
        <a
          href={backButtonHref}
          className="text-sm underline w-full text-center"
        >
          {backButtonLabel}
        </a>
      </CardFooter>
    </Card>
  );
};
