import { UserEventLog } from '@/services/generated/managerstore.schemas'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const initialUserEventValue = {
  userEvent: <UserEventLog>{},
}

export const useVendorUserEventStore = create<typeof initialUserEventValue>()(
  persist(() => initialUserEventValue, {
    name: 'vendorUserEvent',
    storage: createJSONStorage(() => localStorage),
    skipHydration: true,
  }),
)

export const setUserEvent = (Item: UserEventLog) => useVendorUserEventStore.setState(() => ({ userEvent: Item }))
