import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        style: {
          background: 'rgb(30 41 59)', // slate-800
          color: 'rgb(226 232 240)', // slate-200
          border: '1px solid rgb(71 85 105)', // slate-600
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
