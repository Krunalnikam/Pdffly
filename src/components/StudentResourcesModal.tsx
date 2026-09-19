import React, { useState, useEffect } from "react";
import {
  Globe,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getActivePromotionsServerFn, recordPromotionClickServerFn } from "@/lib/promotions-server";
import type { PromotionItem } from "@/types";

interface StudentResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROMOTIONS_CACHE_KEY = "pdfly_active_promotions_cache";

export function StudentResourcesModal({ isOpen, onClose }: StudentResourcesModalProps) {
  const [promotions, setPromotions] = useState<PromotionItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [selectedSubject, setSelectedSubject] = useState<string>("all");

  useEffect(() => {
    if (!isOpen) return;

    // Load from cache first for instantaneous rendering
    try {
      const cached = localStorage.getItem(PROMOTIONS_CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPromotions(parsed);
        }
      }
    } catch {
      // safe fallback
    }

    let isMounted = true;
    async function fetchPromotions() {
      setIsLoading(true);

      // 1. Try REST endpoint first
      try {
        const resp = await fetch("/api/promotions/active");
        if (resp.ok) {
          const res = await resp.json();
          if (isMounted && res && res.success && Array.isArray(res.items)) {
            setPromotions(res.items);
            try {
              localStorage.setItem(PROMOTIONS_CACHE_KEY, JSON.stringify(res.items));
            } catch {
              // ignore
            }
            setIsLoading(false);
            return;
          }
        }
      } catch {
        // Fall back to serverFn
      }

      // 2. Server function fallback
      try {
        const res = await getActivePromotionsServerFn();
        if (isMounted && res && res.success && Array.isArray(res.items)) {
          setPromotions(res.items);
          try {
            localStorage.setItem(PROMOTIONS_CACHE_KEY, JSON.stringify(res.items));
          } catch {
            // ignore
          }
        }
      } catch (err) {
        console.warn("Could not fetch promotions:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchPromotions();
    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  const handleVisit = (item: PromotionItem) => {
    // Record click silently in background
    try {
      fetch("/api/promotions/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id }),
      }).catch(() => {
        recordPromotionClickServerFn({ data: { id: item.id } }).catch(() => {});
      });
    } catch {
      try {
        recordPromotionClickServerFn({ data: { id: item.id } }).catch(() => {});
      } catch {
        // ignore
      }
    }

    // Safely open in new browser tab
    window.open(item.url, "_blank", "noopener,noreferrer");
  };

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        id="modal-student-resources"
        className="sm:max-w-2xl p-0 overflow-hidden bg-card border-border shadow-2xl rounded-2xl flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <DialogHeader className="p-5 sm:p-6 border-b border-border/80 bg-gradient-to-r from-primary/10 via-background to-background shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0 shadow-xs">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg sm:text-xl font-bold text-foreground">
                Student Resources
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Curated study tools, question papers, and educational resources to assist your
                exams.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Modal Body: Scrollable list of active websites */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {(() => {
            const availableSubjects = Array.from(
              new Set(
                promotions
                  .map((p) => p.subject?.trim())
                  .filter((s): s is string => Boolean(s && s.length > 0)),
              ),
            );

            const displayedItems =
              selectedSubject === "all"
                ? promotions
                : promotions.filter(
                    (p) =>
                      (p.subject?.trim() || "").toLowerCase() === selectedSubject.toLowerCase(),
                  );

            return (
              <>
                {/* Subject Filter Pills if multiple subjects are configured */}
                {availableSubjects.length > 1 && (
                  <div className="flex items-center gap-1.5 flex-wrap pb-1">
                    <span className="text-xs font-semibold text-muted-foreground mr-1 flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5 text-primary" />
                      <span>Filter:</span>
                    </span>
                    <button
                      type="button"
                      id="student-filter-all"
                      onClick={() => setSelectedSubject("all")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                        selectedSubject === "all"
                          ? "bg-primary text-primary-foreground border-primary shadow-xs"
                          : "bg-secondary/70 text-muted-foreground hover:text-foreground border-border/70"
                      }`}
                    >
                      All ({promotions.length})
                    </button>
                    {availableSubjects.map((subj) => {
                      const count = promotions.filter(
                        (p) => (p.subject?.trim() || "").toLowerCase() === subj.toLowerCase(),
                      ).length;
                      return (
                        <button
                          key={subj}
                          type="button"
                          id={`student-filter-${subj}`}
                          onClick={() => setSelectedSubject(subj)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer border flex items-center gap-1 ${
                            selectedSubject.toLowerCase() === subj.toLowerCase()
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-secondary/70 text-muted-foreground hover:text-foreground border-border/70"
                          }`}
                        >
                          <span>{subj}</span>
                          <span className="text-[10px] opacity-75">({count})</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {isLoading && promotions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <Loader2 className="h-7 w-7 animate-spin text-primary mb-3" />
                    <p className="text-xs font-medium">Loading student resources...</p>
                  </div>
                ) : promotions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center rounded-xl border border-dashed border-border p-6 bg-secondary/20">
                    <BookOpen className="h-10 w-10 text-muted-foreground/50 mb-3" />
                    <h3 className="text-sm font-semibold text-foreground">
                      No Resources Currently Listed
                    </h3>
                    <p className="text-xs text-muted-foreground max-w-sm mt-1">
                      Check back soon! New university question papers, study materials, and learning
                      portals will be added here.
                    </p>
                  </div>
                ) : displayedItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center rounded-xl border border-dashed border-border p-6 bg-secondary/20">
                    <p className="text-xs text-muted-foreground">
                      No resources found for subject <strong>"{selectedSubject}"</strong>.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedSubject("all")}
                      className="mt-2 text-xs h-7"
                    >
                      Show All Resources
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {displayedItems.map((item) => {
                      const hasImageError = imageErrors[item.id];
                      const hasImage = Boolean(item.imageUrl) && !hasImageError;
                      const isExpanded = expandedId === item.id;
                      const shortDesc = item.shortDescription?.trim() || "";
                      const fullDesc = item.fullDetails?.trim() || "";
                      const mainDesc = shortDesc || fullDesc;
                      const hasExtraDetails =
                        Boolean(fullDesc) && Boolean(shortDesc) && fullDesc !== shortDesc;

                      const buttonLabel = item.customButtonName?.trim() || "Visit Website →";

                      return (
                        <div
                          key={item.id}
                          id={`promo-resource-card-${item.id}`}
                          className="rounded-xl border border-border/80 bg-card hover:bg-secondary/20 hover:border-primary/30 transition-all p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between group"
                        >
                          {/* Left: Image / Logo + Content */}
                          <div className="flex items-start gap-3.5 flex-1 min-w-0">
                            {hasImage ? (
                              <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-xl overflow-hidden border border-border bg-background shadow-xs p-1 flex items-center justify-center">
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className="h-full w-full object-contain rounded-lg"
                                  referrerPolicy="no-referrer"
                                  onError={() => handleImageError(item.id)}
                                />
                              </div>
                            ) : (
                              <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shadow-xs">
                                <Globe className="h-6 w-6" />
                              </div>
                            )}

                            <div className="space-y-1 flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-sm sm:text-base font-bold text-foreground leading-snug">
                                  {item.name}
                                </h4>

                                {/* Subject Badge */}
                                {item.subject && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary border border-primary/25 shrink-0">
                                    <BookOpen className="h-2.5 w-2.5" />
                                    <span>{item.subject}</span>
                                  </span>
                                )}

                                <span className="text-[10px] text-muted-foreground/80 font-mono">
                                  {(() => {
                                    try {
                                      return new URL(item.url).hostname.replace(/^www\./, "");
                                    } catch {
                                      return "";
                                    }
                                  })()}
                                </span>
                              </div>

                              {mainDesc && (
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  {mainDesc}
                                </p>
                              )}

                              {/* Expandable full details if available */}
                              {hasExtraDetails && (
                                <div className="pt-1">
                                  {isExpanded && (
                                    <div className="mt-2 p-3 rounded-lg bg-secondary/40 border border-border/60 text-xs text-foreground leading-relaxed whitespace-pre-line">
                                      {fullDesc}
                                    </div>
                                  )}

                                  <button
                                    type="button"
                                    onClick={() => toggleExpand(item.id)}
                                    className="text-[11px] font-medium text-primary hover:underline flex items-center gap-1 mt-1 transition-colors cursor-pointer"
                                  >
                                    <span>
                                      {isExpanded ? "Show less details" : "Read more details"}
                                    </span>
                                    {isExpanded ? (
                                      <ChevronUp className="h-3 w-3" />
                                    ) : (
                                      <ChevronDown className="h-3 w-3" />
                                    )}
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Right: Visit Website Button */}
                          <div className="shrink-0 w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-border/60">
                            <Button
                              id={`btn-visit-resource-${item.id}`}
                              type="button"
                              onClick={() => handleVisit(item)}
                              className="w-full sm:w-auto h-9 px-4 text-xs font-semibold gap-1.5 shadow-xs cursor-pointer group-hover:shadow-sm transition-all"
                            >
                              <span>{buttonLabel}</span>
                              <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            );
          })()}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-border/80 bg-secondary/15 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>PDFly remains 100% free with no interruptions to your documents.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              id="btn-close-student-resources"
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs h-8 px-4 font-medium"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
