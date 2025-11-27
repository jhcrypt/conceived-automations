import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        style: {
          background: 'rgb(15 23 42)', // slate-900
          color: 'rgb(248 250 252)', // slate-50
          border: '1px solid rgb(239 68 68)', // red-500 for errors
          fontSize: '14px',
        },
        error: {
          style: {
            background: 'rgb(127 29 29)', // red-900
            color: 'rgb(254 242 242)', // red-50
            border: '1px solid rgb(239 68 68)', // red-500
          },
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
