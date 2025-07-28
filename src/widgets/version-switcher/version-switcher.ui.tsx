import logo_ufabc from '@/assets/logo_ufabc.png';
import { GalleryVerticalEnd } from 'lucide-react';

import { TypographyH3 } from '@/shared/ui/typography/h3';

export function VersionSwitcher() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <img src={logo_ufabc} alt="Logo UFABC" className="h-10 w-10" />
        <TypographyH3>UFABC</TypographyH3>
      </div>
    </div>
  );
}
