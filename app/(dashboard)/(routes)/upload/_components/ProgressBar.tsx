import React from "react";

function ProgressBar({ progress }: any) {
  const progressBarColor =
    progress === 100 ? "bg-indigo-600" : "bg-indigo-600 text-black";

  return (
    <div className="bg-gray-400 w-full h-4 mt-3 text-black text-[15px] rounded-full overflow-hidden">
      <div
        className={`${progressBarColor} h-4 rounded-full text-[10px]`}
        style={{ width: progress + "%" }}
      >
        <strong>{`${Number(progress).toFixed(0)}%`}</strong>
      </div>
    </div>
  );
}

export default ProgressBar;
