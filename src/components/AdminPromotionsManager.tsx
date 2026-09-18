import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Globe,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Eye,
  UploadCloud,
  Check,
  X,
  AlertCircle,
  Loader2,
  MousePointerClick,
  Sparkles,
  RefreshCw,
  Image as ImageIcon,
  ChevronUp,
  ChevronDown,
  BookOpen,
  ArrowUpDown,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  getAdminPromotionsListServerFn,
  savePromotionServerFn,
  deletePromotionServerFn,
  togglePromotionActiveServerFn,
  reorderPromotionsServerFn,
  type PromotionStats,
} from "@/lib/promotions-server";
import { PromotionDetailsModal } from "@/components/PromotionDetailsModal";
import type { PromotionItem } from "@/types";

interface AdminPromotionsManagerProps {
  adminKey: string;
}

interface FormState {
  id?: string;
  name: string;
  url: string;
  imageUrl: string;
  subject: string;
  shortDescription: string;
  fullDetails: string;
  customButtonName: string;
  isActive: boolean;
}

const DEFAULT_FORM: FormState = {
  name: "",
  url: "",
  imageUrl: "",
  subject: "",
  shortDescription: "",
  fullDetails: "",
  customButtonName: "Visit Website →",
  isActive: true,
};

const SUBJECT_PRESETS = ["DS", "Java", "Python", "FSD", "DBMS", "General"];

export function AdminPromotionsManager({ adminKey }: AdminPromotionsManagerProps) {
  const [promotions, setPromotions] = useState<PromotionItem[]>([]);
  const [stats, setStats] = useState<PromotionStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form Modal State (Add or Edit)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<FormState>(DEFAULT_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Reorder state & feedback
  const [isReordering, setIsReordering] = useState(false);
  const [reorderFeedback, setReorderFeedback] = useState<string | null>(null);

  // Subject filter
  const [subjectFilter, setSubjectFilter] = useState<string>("all");

  // Preview Modal
  const [previewItem, setPreviewItem] = useState<PromotionItem | null>(null);

  // Deleting item ID
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Image Upload reference
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);

  // Load promotions list from server
  const loadPromotions = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    // 1. Try REST endpoint first
    try {
      const resp = await fetch("/api/promotions/admin-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminKey }),
      });
      if (resp.ok) {
        const res = await resp.json();
        if (res && res.success) {
          setPromotions(res.items);
          setStats(res.stats);
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // Fall back to serverFn
    }

    // 2. Server function fallback
    try {
      const res = await getAdminPromotionsListServerFn({
        data: { adminKey },
      });
      if (res && res.success) {
        setPromotions(res.items);
        setStats(res.stats);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load promotions";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  }, [adminKey]);

  useEffect(() => {
    loadPromotions();
  }, [loadPromotions]);

  // Open modal for Adding new promotion
  const handleOpenAdd = () => {
    setFormData({
      ...DEFAULT_FORM,
      subject: subjectFilter !== "all" ? subjectFilter : "",
    });
    setFormError(null);
    setIsFormOpen(true);
  };

  // Open modal for Editing promotion
  const handleOpenEdit = (item: PromotionItem) => {
    setFormData({
      id: item.id,
      name: item.name,
      url: item.url,
      imageUrl: item.imageUrl || "",
      subject: item.subject || "",
      shortDescription: item.shortDescription,
      fullDetails: item.fullDetails,
      customButtonName: item.customButtonName || "Visit Website →",
      isActive: item.isActive,
    });
    setFormError(null);
    setIsFormOpen(true);
  };

  // Reorder promotions: Move Up (higher priority)
  const handleMoveUp = async (index: number) => {
    if (index <= 0 || isReordering) return;
    const newItems = [...promotions];
    const temp = newItems[index - 1];
    newItems[index - 1] = newItems[index];
    newItems[index] = temp;

    setPromotions(newItems);
    setIsReordering(true);
    setReorderFeedback(`Moved "${newItems[index - 1].name}" to position #${index}`);
    setTimeout(() => setReorderFeedback(null), 3000);

    try {
      const orderedIds = newItems.map((p) => p.id);
      await reorderPromotionsServerFn({
        data: {
          adminKey,
          orderedIds,
        },
      });
    } catch (err) {
      console.error("Failed to reorder promotions:", err);
      loadPromotions();
    } finally {
      setIsReordering(false);
    }
  };

  // Reorder promotions: Move Down (lower priority)
  const handleMoveDown = async (index: number) => {
    if (index >= promotions.length - 1 || isReordering) return;
    const newItems = [...promotions];
    const temp = newItems[index + 1];
    newItems[index + 1] = newItems[index];
    newItems[index] = temp;

    setPromotions(newItems);
    setIsReordering(true);
    setReorderFeedback(`Moved "${newItems[index + 1].name}" to position #${index + 2}`);
    setTimeout(() => setReorderFeedback(null), 3000);

    try {
      const orderedIds = newItems.map((p) => p.id);
      await reorderPromotionsServerFn({
        data: {
          adminKey,
          orderedIds,
        },
      });
    } catch (err) {
      console.error("Failed to reorder promotions:", err);
      loadPromotions();
    } finally {
      setIsReordering(false);
    }
  };

  // Quick toggle active status directly in the list
  const handleToggleActive = async (id: string, nextActive: boolean) => {
    // Optimistic update
    setPromotions((prev) => prev.map((p) => (p.id === id ? { ...p, isActive: nextActive } : p)));
    try {
      const resp = await fetch("/api/promotions/toggle-active", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminKey, id, isActive: nextActive }),
      });
      if (!resp.ok) {
        await togglePromotionActiveServerFn({
          data: {
            adminKey,
            id,
            isActive: nextActive,
          },
        });
      }
      loadPromotions();
    } catch (err) {
      console.error("Failed to toggle promotion active state:", err);
      loadPromotions();
    }
  };

  // Delete promotion
  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    setDeletingId(id);
    try {
      const resp = await fetch("/api/promotions/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminKey, id }),
      });
      if (!resp.ok) {
        await deletePromotionServerFn({
          data: {
            adminKey,
            id,
          },
        });
      }
      await loadPromotions();
    } catch (err) {
      console.error("Failed to delete promotion:", err);
    } finally {
      setDeletingId(null);
    }
  };

  // Process uploaded image (resize/compress to keep storage ultra clean and fast)
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingImage(true);
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (!result) return;

        // Compress image via canvas to max 400x400 to keep it very small and lightweight
        const img = new Image();
        img.onload = () => {
          const maxDim = 400;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL("image/jpeg", 0.85);
            setFormData((prev) => ({ ...prev, imageUrl: compressed }));
          } else {
            setFormData((prev) => ({ ...prev, imageUrl: result }));
          }
          setIsProcessingImage(false);
        };
        img.onerror = () => {
          setFormData((prev) => ({ ...prev, imageUrl: result }));
          setIsProcessingImage(false);
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    } catch {
      setIsProcessingImage(false);
    }
  };

  // Form Submit (Save / Edit)
  const handleSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.name.trim()) {
      setFormError("Website name is required");
      return;
    }

    if (!formData.url.trim()) {
      setFormError("Website URL is required");
      return;
    }

    if (!formData.shortDescription.trim()) {
      setFormError("Short description is required");
      return;
    }

    if (!formData.fullDetails.trim()) {
      setFormError("Full details are required");
      return;
    }

    setIsSaving(true);
    const promotionPayload = {
      id: formData.id,
      name: formData.name.trim(),
      url: formData.url.trim(),
      imageUrl: formData.imageUrl.trim(),
      subject: formData.subject.trim(),
      shortDescription: formData.shortDescription.trim(),
      fullDetails: formData.fullDetails.trim(),
      customButtonName: formData.customButtonName.trim() || "Visit Website →",
      isActive: formData.isActive,
    };

    try {
      let saved = false;

      // 1. Try REST endpoint
      try {
        const resp = await fetch("/api/promotions/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            adminKey,
            promotion: promotionPayload,
          }),
        });
        if (resp.ok) {
          const json = await resp.json();
          if (json && json.success) {
            saved = true;
          }
        }
      } catch {
        // Fall back to serverFn
      }

      // 2. Server function fallback
      if (!saved) {
        const res = await savePromotionServerFn({
          data: {
            adminKey,
            promotion: promotionPayload,
          },
        });
        if (res && res.success) {
          saved = true;
        }
      }

      if (saved) {
        setIsFormOpen(false);
        await loadPromotions();
      } else {
        setFormError("Failed to save promotion");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save promotion";
      setFormError(msg);
    } finally {
      setIsSaving(false);
    }
  };

  // Collect all unique subjects present in existing promotions
  const availableSubjects = Array.from(
    new Set(
      promotions
        .map((p) => p.subject?.trim())
        .filter((s): s is string => Boolean(s && s.length > 0)),
    ),
  );

  // Filtered promotions according to selected subject tab
  const displayedPromotions =
    subjectFilter === "all"
      ? promotions
      : promotions.filter(
          (p) => (p.subject?.trim() || "").toLowerCase() === subjectFilter.toLowerCase(),
        );

  return (
    <div className="space-y-5">
      {/* Top Banner & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl border border-border/80 bg-secondary/20">
        <div>
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <span>Promoted Websites Manager</span>
            {stats && (
              <Badge variant="outline" className="text-xs border-primary/40 text-primary">
                {stats.activeCount} Active / {stats.total} Total
              </Badge>
            )}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure featured student tools, assign subjects (DS, Java, Python, FSD, DBMS), and
            manually reorder positions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            id="btn-admin-refresh-promotions"
            type="button"
            variant="outline"
            size="sm"
            onClick={loadPromotions}
            disabled={isLoading || isReordering}
            className="h-8 gap-1 text-xs"
            title="Refresh promotions"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </Button>

          <Button
            id="btn-admin-add-promotion"
            type="button"
            size="sm"
            onClick={handleOpenAdd}
            className="h-8 gap-1.5 text-xs font-semibold bg-primary text-primary-foreground shadow-xs cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Promotion</span>
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl border border-border/70 bg-card">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              Total Promotions
            </p>
            <p className="text-xl font-bold text-foreground mt-1">{stats.total}</p>
          </div>

          <div className="p-3 rounded-xl border border-border/70 bg-card">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              Active on Site
            </p>
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              {stats.activeCount}
            </p>
          </div>

          <div className="p-3 rounded-xl border border-border/70 bg-card">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              Inactive
            </p>
            <p className="text-xl font-bold text-muted-foreground mt-1">{stats.inactiveCount}</p>
          </div>

          <div className="p-3 rounded-xl border border-border/70 bg-card">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <MousePointerClick className="h-3 w-3 text-primary" />
              <span>Student Clicks</span>
            </p>
            <p className="text-xl font-bold text-primary mt-1">{stats.totalClicks}</p>
          </div>
        </div>
      )}

      {/* Reorder Feedback Notification */}
      {reorderFeedback && (
        <div className="p-2.5 px-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span className="font-medium">{reorderFeedback}</span>
        </div>
      )}

      {/* Subject Filter Bar & Position Hint */}
      {promotions.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1 pb-1">
          {/* Subject Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-semibold text-muted-foreground mr-1 flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
              <span>Subject:</span>
            </span>

            <button
              type="button"
              id="filter-promo-all"
              onClick={() => setSubjectFilter("all")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                subjectFilter === "all"
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "bg-secondary/70 text-muted-foreground hover:text-foreground border-border/70"
              }`}
            >
              All ({promotions.length})
            </button>

            {/* List distinct subjects present */}
            {availableSubjects.map((subj) => {
              const count = promotions.filter(
                (p) => (p.subject?.trim() || "").toLowerCase() === subj.toLowerCase(),
              ).length;
              return (
                <button
                  key={subj}
                  type="button"
                  id={`filter-promo-${subj}`}
                  onClick={() => setSubjectFilter(subj)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer border flex items-center gap-1 ${
                    subjectFilter.toLowerCase() === subj.toLowerCase()
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

          {/* Reordering helper hint */}
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium self-start sm:self-auto">
            <ArrowUpDown className="h-3.5 w-3.5 text-primary" />
            <span>Use ▲ / ▼ buttons to adjust position for students</span>
          </div>
        </div>
      )}

      {/* Error Notice */}
      {errorMessage && (
        <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading && promotions.length === 0 && (
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <p className="text-xs text-muted-foreground">Loading promotions...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && promotions.length === 0 && (
        <div className="py-12 px-4 rounded-xl border border-dashed border-border flex flex-col items-center justify-center text-center space-y-3">
          <div className="h-12 w-12 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground">
            <Globe className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">No promotions created yet</h4>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm">
              Promote helpful student resources, past exam archives, or educational websites. Click
              below to create your first promotion.
            </p>
          </div>
          <Button
            id="btn-admin-create-first-promo"
            type="button"
            size="sm"
            onClick={handleOpenAdd}
            className="h-8 gap-1.5 text-xs font-semibold"
          >
            <Plus className="h-4 w-4" />
            <span>Create First Promotion</span>
          </Button>
        </div>
      )}

      {/* Filtered Empty State */}
      {!isLoading && promotions.length > 0 && displayedPromotions.length === 0 && (
        <div className="py-8 px-4 rounded-xl border border-dashed border-border flex flex-col items-center justify-center text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            No promotions found under subject <strong>"{subjectFilter}"</strong>.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setSubjectFilter("all")}
            className="h-7 text-xs"
          >
            Show All Subjects
          </Button>
        </div>
      )}

      {/* Promotions List */}
      {displayedPromotions.length > 0 && (
        <div className="space-y-3">
          {displayedPromotions.map((item) => {
            // Find its index in the master promotions array for reordering
            const masterIndex = promotions.findIndex((p) => p.id === item.id);
            const isFirst = masterIndex === 0;
            const isLast = masterIndex === promotions.length - 1;

            return (
              <div
                key={item.id}
                id={`promo-row-${item.id}`}
                className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                  item.isActive
                    ? "bg-card border-border shadow-xs"
                    : "bg-muted/20 border-border/50 opacity-75"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  {/* Left: Position Reorder Controls + Logo + Info */}
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    {/* Reorder Buttons Column */}
                    <div className="flex flex-col items-center justify-center shrink-0 pr-1 select-none">
                      <Button
                        id={`btn-promo-move-up-${item.id}`}
                        type="button"
                        variant="ghost"
                        size="sm"
                        disabled={isFirst || isReordering}
                        onClick={() => handleMoveUp(masterIndex)}
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-25 cursor-pointer"
                        title={isFirst ? "Top position" : "Move up (higher priority)"}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                      <span
                        className="text-[11px] font-bold text-muted-foreground font-mono leading-tight py-0.5"
                        title={`Display Priority #${masterIndex + 1}`}
                      >
                        #{masterIndex + 1}
                      </span>
                      <Button
                        id={`btn-promo-move-down-${item.id}`}
                        type="button"
                        variant="ghost"
                        size="sm"
                        disabled={isLast || isReordering}
                        onClick={() => handleMoveDown(masterIndex)}
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-25 cursor-pointer"
                        title={isLast ? "Bottom position" : "Move down"}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Logo */}
                    {item.imageUrl ? (
                      <div className="h-12 w-12 shrink-0 rounded-xl overflow-hidden border border-border bg-background p-0.5 flex items-center justify-center">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-full w-full object-contain rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <div className="h-12 w-12 shrink-0 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
                        <Globe className="h-6 w-6" />
                      </div>
                    )}

                    {/* Information */}
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-foreground truncate">{item.name}</h4>

                        {/* Subject Badge */}
                        {item.subject && (
                          <Badge
                            variant="outline"
                            className="text-[10px] bg-primary/10 text-primary border-primary/30 font-semibold py-0 h-4 gap-1"
                          >
                            <BookOpen className="h-2.5 w-2.5" />
                            <span>{item.subject}</span>
                          </Badge>
                        )}

                        {item.isActive ? (
                          <Badge
                            variant="outline"
                            className="text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/30 py-0 h-4"
                          >
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-[10px] py-0 h-4">
                            Inactive
                          </Badge>
                        )}

                        <span className="text-[11px] text-muted-foreground font-mono flex items-center gap-1">
                          <MousePointerClick className="h-3 w-3" />
                          {item.clicksCount || 0} clicks
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {item.shortDescription}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground flex-wrap">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 hover:text-primary transition-colors text-primary/80 truncate max-w-xs"
                        >
                          <ExternalLink className="h-3 w-3 shrink-0" />
                          <span className="truncate">{item.url}</span>
                        </a>
                        <span>·</span>
                        <span>
                          Button: <strong>{item.customButtonName || "Visit Website →"}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Active Toggle & Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0 border-border/50">
                    {/* Status Toggle */}
                    <div className="flex items-center gap-1.5 mr-2">
                      <Switch
                        id={`switch-active-${item.id}`}
                        checked={item.isActive}
                        onCheckedChange={(checked) => handleToggleActive(item.id, checked)}
                        aria-label="Toggle active status"
                      />
                      <label
                        htmlFor={`switch-active-${item.id}`}
                        className="text-xs font-medium text-muted-foreground cursor-pointer select-none"
                      >
                        {item.isActive ? "Active" : "Inactive"}
                      </label>
                    </div>

                    {/* Preview Button */}
                    <Button
                      id={`btn-promo-preview-${item.id}`}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 gap-1 text-xs"
                      onClick={() => setPreviewItem(item)}
                      title="Preview as student"
                    >
                      <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="hidden sm:inline">Preview</span>
                    </Button>

                    {/* Edit Button */}
                    <Button
                      id={`btn-promo-edit-${item.id}`}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 gap-1 text-xs"
                      onClick={() => handleOpenEdit(item)}
                      title="Edit promotion"
                    >
                      <Edit2 className="h-3.5 w-3.5 text-primary" />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>

                    {/* Delete Button */}
                    <Button
                      id={`btn-promo-delete-${item.id}`}
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      disabled={deletingId === item.id}
                      onClick={() => handleDelete(item.id, item.name)}
                      title="Delete promotion"
                    >
                      {deletingId === item.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Promotion Modal */}
      <Dialog open={isFormOpen} onOpenChange={(open) => !open && setIsFormOpen(false)}>
        <DialogContent
          id="modal-admin-promo-form"
          className="sm:max-w-xl max-h-[92vh] flex flex-col p-0 overflow-hidden bg-card border-border shadow-2xl rounded-2xl"
        >
          <div className="p-6 border-b border-border/80 bg-secondary/30">
            <DialogHeader className="text-left space-y-1">
              <DialogTitle className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>{formData.id ? "Edit Promoted Website" : "Add Promoted Website"}</span>
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Set up website name, destination URL, logo banner, short card description, and full
                popup details.
              </DialogDescription>
            </DialogHeader>
          </div>

          <form onSubmit={handleSaveSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
            {formError && (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Row 1: Name & URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Website Name <span className="text-destructive">*</span>
                </label>
                <Input
                  id="promo-input-name"
                  type="text"
                  placeholder="e.g. GTU Study Notes"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="text-xs sm:text-sm bg-background"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Website URL <span className="text-destructive">*</span>
                </label>
                <Input
                  id="promo-input-url"
                  type="text"
                  placeholder="e.g. https://example.com"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="text-xs sm:text-sm bg-background font-mono"
                  required
                />
              </div>
            </div>

            {/* Row 2: Subject Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                  <span>Subject</span>
                </span>
                <span className="text-[11px] text-muted-foreground font-normal">
                  Example: DS, Java, Python, FSD, DBMS
                </span>
              </label>

              <Input
                id="promo-input-subject"
                type="text"
                placeholder="e.g. DS"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="text-xs sm:text-sm bg-background font-medium"
              />

              {/* Quick Pick Presets */}
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                <span className="text-[11px] text-muted-foreground">Quick pick:</span>
                {SUBJECT_PRESETS.map((subj) => (
                  <button
                    key={subj}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        subject: formData.subject === subj ? "" : subj,
                      })
                    }
                    className={`px-2 py-0.5 rounded-md text-[11px] font-medium border transition-colors cursor-pointer ${
                      formData.subject === subj
                        ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                        : "bg-secondary/70 text-muted-foreground hover:text-foreground hover:bg-secondary border-border"
                    }`}
                  >
                    {subj}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 3: Logo / Image Upload & Preview */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                <span>Website Logo / Banner Image</span>
                <span className="text-[11px] text-muted-foreground font-normal">
                  Upload file or paste image URL
                </span>
              </label>

              <div className="flex items-center gap-3">
                {/* Logo Preview */}
                {formData.imageUrl ? (
                  <div className="relative h-16 w-16 shrink-0 rounded-xl overflow-hidden border border-border bg-background p-1 flex items-center justify-center group">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="h-full w-full object-contain rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, imageUrl: "" })}
                      className="absolute inset-0 bg-background/80 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                      title="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="h-16 w-16 shrink-0 rounded-xl bg-secondary/50 border border-dashed border-border flex flex-col items-center justify-center text-muted-foreground">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                )}

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/svg+xml"
                      className="hidden"
                      onChange={handleImageFileChange}
                    />
                    <Button
                      id="btn-upload-promo-logo"
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isProcessingImage}
                      className="h-8 gap-1.5 text-xs font-medium cursor-pointer"
                    >
                      {isProcessingImage ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <UploadCloud className="h-3.5 w-3.5 text-primary" />
                      )}
                      <span>Choose Logo File</span>
                    </Button>

                    {formData.imageUrl && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setFormData({ ...formData, imageUrl: "" })}
                        className="h-8 text-xs text-muted-foreground hover:text-destructive"
                      >
                        Clear
                      </Button>
                    )}
                  </div>

                  <Input
                    id="promo-input-image-url"
                    type="url"
                    placeholder="Or enter image URL (https://...)"
                    value={formData.imageUrl.startsWith("data:") ? "" : formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="text-xs bg-background h-8 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Short Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                <span>
                  Short Card Description <span className="text-destructive">*</span>
                </span>
                <span className="text-[11px] text-muted-foreground font-normal">
                  Shown on homepage card (1-2 sentences)
                </span>
              </label>
              <Input
                id="promo-input-short-desc"
                type="text"
                placeholder="e.g. Free past university exam papers and solved notes for diploma & degree students."
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="text-xs sm:text-sm bg-background"
                required
              />
            </div>

            {/* Row 4: Full Details */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                <span>
                  Full Website Details <span className="text-destructive">*</span>
                </span>
                <span className="text-[11px] text-muted-foreground font-normal">
                  Displayed in student popup dialog
                </span>
              </label>
              <Textarea
                id="promo-input-full-details"
                rows={4}
                placeholder="Provide a detailed overview of what students will find on this website, how it benefits their studies, exam prep, or lab assignments..."
                value={formData.fullDetails}
                onChange={(e) => setFormData({ ...formData, fullDetails: e.target.value })}
                className="text-xs sm:text-sm bg-background resize-y"
                required
              />
            </div>

            {/* Row 5: Custom Button Name & Active Toggle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Custom Button Name</label>
                <Input
                  id="promo-input-btn-name"
                  type="text"
                  placeholder="e.g. Visit Website, Explore Notes, Open Portal"
                  value={formData.customButtonName}
                  onChange={(e) => setFormData({ ...formData, customButtonName: e.target.value })}
                  className="text-xs sm:text-sm bg-background"
                />
              </div>

              <div className="space-y-1.5 flex flex-col justify-end">
                <div className="flex items-center justify-between p-2.5 rounded-xl border border-border bg-secondary/30">
                  <div>
                    <p className="text-xs font-semibold text-foreground">Active Status</p>
                    <p className="text-[11px] text-muted-foreground">
                      Show to students immediately
                    </p>
                  </div>
                  <Switch
                    id="promo-input-is-active"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-border/80">
              <Button
                id="btn-promo-cancel"
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsFormOpen(false)}
                className="text-xs h-9 px-4 font-medium"
              >
                Cancel
              </Button>
              <Button
                id="btn-promo-save"
                type="submit"
                size="sm"
                disabled={isSaving}
                className="text-xs h-9 px-5 font-semibold bg-primary text-primary-foreground gap-1.5 shadow-xs"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    <span>{formData.id ? "Save Changes" : "Create Promotion"}</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Student Details Preview Modal */}
      {previewItem && (
        <PromotionDetailsModal
          promotion={previewItem}
          isOpen={Boolean(previewItem)}
          onClose={() => setPreviewItem(null)}
        />
      )}
    </div>
  );
}
