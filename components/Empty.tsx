import { PackageX, LucideIcon } from "lucide-react";

interface IEmptyData {
  title: string;
  description: string;
  action: () => void;
  btnContent: string;
  icon?: LucideIcon;
}

const EmptyData = ({
  title,
  description,
  action,
  icon: Icon,
  btnContent,
}: IEmptyData) => {
  return (
    <div className="min-h-screen flex translate-y-[10%] justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100">
          <PackageX className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-500 mb-6">{description}</p>
        <button
          className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium cursor-pointer"
          onClick={action}
        >
          {Icon && <Icon size={20} />}
          {btnContent}
        </button>
      </div>
    </div>
  );
};

export default EmptyData;
