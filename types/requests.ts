export enum RequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  DRAFT = 'draft'
}

export enum RequestType {
  LEAVE = 'leave',
  MEMO = 'memo',
  NDFL = 'ndfl',
  SYSTEM_ACCESS = 'system_access'
}

export interface BaseRequest {
  id: string
  type: RequestType
  status: RequestStatus
  createdAt: string
  updatedAt: string
  authorId: string
  executorId: string
  managerId: string
}

export interface LeaveRequest extends BaseRequest {
  type: RequestType.LEAVE
  startDate: string
  endDate: string
  location: string
  description?: string
}

export interface MemoRequest extends BaseRequest {
  type: RequestType.MEMO
  subject: string
  content: string
  recipients: string[]
}

export type Request = LeaveRequest | MemoRequest 