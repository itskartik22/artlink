import { FaExclamationTriangle } from "react-icons/fa";


interface FormErrorProps {
  message?: string;
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex item-center gap-x-2 text-sm text-destructive">
      <FaExclamationTriangle />
      <p>{message}</p>
    </div>
  );
}
