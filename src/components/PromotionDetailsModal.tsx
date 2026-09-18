import React from "react";
import { ExternalLink, Globe, Sparkles, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { recordPromotionClickServerFn } from "@/lib/promotions-server";
import type { PromotionItem } from "@/types";

interface PromotionDetailsModalProps {
  promotion: PromotionItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PromotionDetailsModal({ promotion, isOpen, onClose }: PromotionDetailsModalProps) {
  if (!promotion) return null;

  const handleVisit = () => {
    // Silently record click analytics
    try {
      fetch("/api/promotions/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: promotion.id }),
      }).catch(() => {
        recordPromotionClickServerFn({ data: { id: promotion.id } }).catch(() => {});
      });
    } catch {
      try {
        recordPromotionClickServerFn({ data: { id: promotion.id } }).catch(() => {});
      } catch {
        // ignore
      }
    }

    // Open target website safely in a new tab
    window.open(promotion.url, "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        id="modal-promotion-details"
        className="sm:max-w-lg p-0 overflow-hidden bg-card border-border shadow-2xl rounded-2xl"
      >
        {/* Header Banner */}
        <div className="relative p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-b border-border/80">
          <div className="flex items-start gap-4">
            {promotion.imageUrl ? (
              <div className="h-16 w-16 shrink-0 rounded-2xl overflow-hidden border border-border bg-background shadow-xs p-1 flex items-center justify-center">
                <img
                  src={promotion.imageUrl}
                  alt={promotion.name}
                  className="h-full w-full object-contain rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shadow-xs">
                <Globe className="h-8 w-8" />
              </div>
            )}

            <div className="space-y-1 pr-6 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant="outline"
                  className="text-[10px] uppercase tracking-wider font-semibold border-primary/30 text-primary bg-primary/5 px-2 py-0.5"
                >
                  <Sparkles className="h-2.5 w-2.5 mr-1 text-primary" />
                  Featured Resource
                </Badge>
                <Badge
                  variant="secondary"
                  className="text-[10px] text-muted-foreground px-1.5 py-0.5"
                >
                  Free Student Tool
                </Badge>
              </div>

              <DialogTitle className="text-lg sm:text-xl font-bold text-foreground leading-tight">
                {promotion.name}
              </DialogTitle>

              <DialogDescription className="text-xs text-muted-foreground line-clamp-2">
                {promotion.shortDescription}
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Full Details Content */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              About This Website
            </h4>
            <div className="p-4 rounded-xl bg-secondary/40 border border-border/60 text-sm text-foreground leading-relaxed whitespace-pre-line">
              {promotion.fullDetails}
            </div>
          </div>

          {/* Highlights Note */}
          <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg border border-border/40">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>
              Verified external resource for students. Opens securely in a new browser tab. PDFly
              remains 100% free with no interruptions to your documents.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5 pt-2 border-t border-border/60">
            <Button
              id="btn-promo-details-close"
              type="button"
              variant="outline"
              onClick={onClose}
              className="text-xs h-10 px-4 font-medium"
            >
              Close
            </Button>

            <Button
              id="btn-promo-details-visit"
              type="button"
              onClick={handleVisit}
              className="text-xs h-10 px-6 font-semibold gap-2 shadow-xs bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <span>{promotion.customButtonName || "Visit Website →"}</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
