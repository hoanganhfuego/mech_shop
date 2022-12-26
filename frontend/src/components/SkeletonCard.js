import { Skeleton } from "@mui/material";

export default function SkeletonCard() {
  return (
    <div className="!w-1/5 flex flex-col p-3">
      <div className="!w-full aspect-image">
        <Skeleton
          animation="wave"
          variant="rounded"
          className="!w-full !h-full !rounded-xl"
        />
      </div>
      <div className="flex justify-between pt-3 pb-1">
        <Skeleton animation="wave" variant="text" className="!w-14" />
        <Skeleton animation="wave" variant="text" className="!w-20" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton animation="wave" variant="circular" className="!w-6 !h-6" />
        <div>
          <Skeleton animation="wave" variant="text" className="!w-28" />
        </div>
      </div>
    </div>
  );
}
