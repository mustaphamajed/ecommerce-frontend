import { Select } from '@/components/ui'
import type { UserStatusFilter as Status } from '../types'

type UserStatusFilterProps = {
  value: Status
  onChange: (status: Status) => void
}

export function UserStatusFilter({ value, onChange }: UserStatusFilterProps) {
  return (
    <Select label="Filter by status" value={value} onChange={(event) => onChange(event.target.value as Status)}>
      <option value="">All statuses</option>
      <option value="active">Active</option>
      <option value="disabled">Disabled</option>
    </Select>
  )
}
