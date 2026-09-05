import { Dispatch, SetStateAction } from "react";
import SideSheet from "./SideSheet";

interface IVersionGuideSheet {
  showVersionGuide: boolean;
  setShowVersionGuide: Dispatch<SetStateAction<boolean>>;
}

const VersionGuideSheet = ({
  showVersionGuide,
  setShowVersionGuide,
}: IVersionGuideSheet) => {
  return (
    <SideSheet
      isOpen={showVersionGuide}
      onClose={() => setShowVersionGuide(false)}
      title="Kit Style Guide"
    >
      <div className="space-y-5 text-sm leading-relaxed">
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
          <h4 className="font-semibold text-gray-900 text-base">Fan Version</h4>
          <p className="text-gray-500 mt-1.5 text-xs">
            Engineered for comfort and casual lifestyle everyday wear. Features
            standard regular-fit tailoring with beautifully embroidered crests
            and logos for high durability.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
          <h4 className="font-semibold text-gray-900 text-base">
            Player Version
          </h4>
          <p className="text-gray-500 mt-1.5 text-xs">
            The exact match-fit high performance kits worn on the pitch by the
            athletes. Designed with specialized athletic slim-cut silhouettes,
            laser-cut ventilation mapping, heat-applied lightweight logos to
            maximize speed. We recommend sizing up if you prefer a relaxed feel.
          </p>
        </div>
      </div>
    </SideSheet>
  );
};

export default VersionGuideSheet;
