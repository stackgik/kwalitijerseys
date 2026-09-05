import React, { Dispatch, SetStateAction } from "react";
import SideSheet from "./SideSheet";

interface ISizeGuideSheet {
  showSizeGuide: boolean;
  setShowSizeGuide: Dispatch<SetStateAction<boolean>>;
}
const SizeGuideSheet = ({
  showSizeGuide,
  setShowSizeGuide,
}: ISizeGuideSheet) => {
  return (
    <SideSheet
      isOpen={showSizeGuide}
      onClose={() => setShowSizeGuide(false)}
      title="Size Measurements Guide"
    >
      <div className="space-y-4">
        <p className="text-xs text-gray-500 leading-relaxed">
          Please use this chest sizing matrix to ensure an accurate fit. If
          purchasing a <b>Player Version</b>, consider ordering one size up from
          your usual clothing size.
        </p>
        <div className="overflow-hidden border border-gray-100 rounded-xl bg-white shadow-xs">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-3">Size</th>
                <th className="p-3">Chest (inches)</th>
                <th className="p-3">Length (inches)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-medium text-gray-700">
              <tr>
                <td className="p-3 font-semibold text-gray-900">M</td>
                <td className="p-3">40 - 42</td>
                <td className="p-3">27 - 28</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-900">L</td>
                <td className="p-3">42 - 44</td>
                <td className="p-3">28 - 29</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-900">XL</td>
                <td className="p-3">44 - 46</td>
                <td className="p-3">29 - 30</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-900">XXL</td>
                <td className="p-3">46 - 48</td>
                <td className="p-3">30 - 31</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </SideSheet>
  );
};

export default SizeGuideSheet;
