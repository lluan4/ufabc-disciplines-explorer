import { GalleryVerticalEnd } from 'lucide-react';

export function VersionSwitcher() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
          <GalleryVerticalEnd className="size-4" />
        </div>
        <div className="flex flex-col gap-0.5 leading-none">
          {/* <span className="font-medium">Documentation</span>
          <span className="">v{selectedVersion}</span> */}
        </div>
      </div>
    </div>
  );
}
