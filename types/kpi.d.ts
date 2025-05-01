export interface KpiItem {
    id: string;
    name: string;
    department: string;
    category: string;
    totalBonusAmount: number;
    activities: Activity[];
    requestedBy: string;
    checkedBy: string;
    verifiedBy: string;
    approvedBy: string;
    reference?: string;
    status: string;
    date_created: string;
    date_updated: string;
  }