import { CalendarDays, LayoutGrid, MonitorSmartphone, Plane, Sparkles, Users, Zap, type LucideIcon } from "lucide-react";

const map: Record<string, LucideIcon> = {
  Zap,
  CalendarDays,
  LayoutGrid,
  MonitorSmartphone,
  Users,
  Plane,
};

export const getServiceIcon = (name: string): LucideIcon => map[name] ?? Sparkles;
