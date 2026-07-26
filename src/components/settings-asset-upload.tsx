import type { ReactNode } from "react";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SettingsAssetUploadProps {
  asset: ReactNode;
  uploadLabel: string;
  removeLabel: string;
  removeAriaLabel?: string;
  helperText: string;
  onUpload?: () => void;
  onRemove?: () => void;
  className?: string;
  assetClassName?: string;
}

function SettingsAssetUpload({
  asset,
  uploadLabel,
  removeLabel,
  removeAriaLabel,
  helperText,
  onUpload,
  onRemove,
  className,
  assetClassName,
}: SettingsAssetUploadProps) {
  return (
    <div
      data-slot="settings-asset-upload"
      className={cn("flex flex-col gap-6 sm:flex-row sm:items-center", className)}
    >
      <div
        data-slot="settings-asset-upload-preview"
        className={cn(
          "flex h-20 w-40 shrink-0 items-center justify-center overflow-hidden rounded-xs",
          assetClassName
        )}
      >
        {asset}
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="control"
            onClick={onUpload}
            disabled={!onUpload}
          >
            <Upload aria-hidden />
            {uploadLabel}
          </Button>
          <Button
            type="button"
            variant="link"
            size="inline"
            className="text-text-tertiary hover:text-foreground"
            onClick={onRemove}
            disabled={!onRemove}
            aria-label={removeAriaLabel ?? removeLabel}
          >
            {removeLabel}
          </Button>
        </div>
        <p className="text-xs tracking-label text-muted-foreground">{helperText}</p>
      </div>
    </div>
  );
}

export { SettingsAssetUpload };
export type { SettingsAssetUploadProps };
